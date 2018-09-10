import IPFS from '../services/ipfs'
import OrbitDB from '../services/orbit-db'
import Logger from 'logplease'

const Organizations = {
  databases: null,
  logger: Logger.create('organizations'),

  init: function () {
    let ipfs = IPFS.init()
    this.logger.info('Initializing organizations databases...')

    // Configuration for the database
    const dbConfig = {
      // If database doesn't exist, create it
      create: true,
      // Don't wait to load from the network
      sync: true,
      // Load only the local version of the database
      localOnly: false,
      // Allow anyone to write to the database,
      // otherwise only the creator of the database can write
      admin: ['*'],
      write: ['*'],

      indexBy: 'name'
    }

    let databaseOpeningLog = (name, orbitdb, address) => {
      this.logger.info('Opening organizations', name, 'at', address)
      return orbitdb
    }
    let databaseLoadLog = (id, hash) => { this.logger.info('Load', 'ID', id) }
    let databaseLoadProgressLog = (name, id, hash, entry, progress, total) => {
      this.logger.info('Loading in progress', name, 'at', progress, '/', total)
    }
    let databaseReplicateLog = (address) => this.logger.info('Replicating to', address)
    let databaseReplicatingLog = (address, hash, entry, progress, have) => {
      this.logger.warn('Replicating', address, hash, entry, progress, have)
    }
    let databaseReplicatedLog = (address) => this.logger.info('Replicated done to', address)
    let databaseWriteLog = (dbname, hash, entry) => this.logger.debug('Write', dbname, hash, entry)
    let databaseReadyLog = (id) => this.logger.warn('Database ready at', id)

    let orbitdb = OrbitDB.init(ipfs)

    let docDBaddress = 'organizations.docs'
    // let docDBaddress = 'process.env.ORGANIZATIONS_DB'
    let docDB = orbitdb
      .then(orbitdb => databaseOpeningLog('database', orbitdb, docDBaddress))
      .then(orbitdb => orbitdb.docs(docDBaddress, dbConfig))
      .then(db => {
        db.events.on('load', databaseLoadLog)
        db.events.on('load.progress', (id, hash, entry, progress, total) => databaseLoadProgressLog('database', id, hash, entry, progress, total))
        db.events.on('replicate', databaseReplicateLog)
        db.events.on('replicate.progress', databaseReplicatingLog)
        db.events.on('replicated', databaseReplicatedLog)
        db.events.on('write', databaseWriteLog)
        db.events.on('ready', databaseReadyLog)
        db.load()
        this.logger.info('Organizations database is available at', db.address.toString())
        return db
      })
      .catch(error => this.logger.error(error))

    let feedDBaddress = 'organizations.feed'
    // let feedDBaddress = 'process.env.ORGANIZATIONS_FEED_DB'
    let feedDB = orbitdb
      .then(orbitdb => databaseOpeningLog('feed', orbitdb, feedDBaddress))
      .then(orbitdb => orbitdb.feed(feedDBaddress, dbConfig))
      .then(db => {
        db.events.on('load', databaseLoadLog)
        db.events.on('load.progress', (id, hash, entry, progress, total) => databaseLoadProgressLog('feed', id, hash, entry, progress, total))
        db.events.on('replicate', databaseReplicateLog)
        db.events.on('replicate.progress', databaseReplicatingLog)
        db.events.on('replicated', databaseReplicatedLog)
        db.events.on('write', databaseWriteLog)
        db.events.on('ready', databaseReadyLog)
        db.load()
        this.logger.info('Organizations feed is available at', db.address.toString())
        return db
      })
      .catch(error => this.logger.error(error))

    let counterDBaddress = 'organizations.counter'
    // let counterDBaddress = 'process.env.ORGANIZATIONS_COUNTER'
    let counterDB = orbitdb
      .then(orbitdb => databaseOpeningLog('counter', orbitdb, counterDBaddress))
      .then(orbitdb => orbitdb.counter(counterDBaddress, dbConfig))
      .then(db => {
        db.events.on('load', (id, hash) => {
          databaseLoadLog(id, hash)
          this.logger.error('Count', this.count())
        })
        db.events.on('load.progress', (id, hash, entry, progress, total) => databaseLoadProgressLog('counter', id, hash, entry, progress, total))
        db.events.on('replicate', databaseReplicateLog)
        db.events.on('replicate.progress', (address, hash, entry, progress, have) => {
          databaseReplicatingLog(address, hash, entry, progress, have)
          // this.logger.warn('Replicated entry', entry.payload.value)
          // this.logger.warn('Replicated counter: ', entry.payload.value.counters)
          this.databases.counter
            .then(count => count.value)
            // .then((e) => e.payload.value)
            .then(value => this.logger.info('Replication:', 'Organizations count is', value))
        })
        db.events.on('replicated', databaseReplicatedLog)
        db.events.on('write', databaseWriteLog)
        db.events.on('ready', databaseReadyLog)
        db.load()
        this.logger.info('Organizations counter is available at', db.address.toString())
        return db
      })
      .catch(error => this.logger.error(error))

    this.databases = {
      docs: docDB,
      feed: feedDB,
      counter: counterDB
    }
  },

  getOrganisations: async function () {
    /*
    let db = await this.databases.docs
    const organizations = db.query((doc) => true)
    */

    let feed = await this.databases.feed
    const organizations = feed.iterator({ limit: -1 })
      .collect()
      .map((e) => e.payload.value)

    organizations
      .forEach(d => this.logger.warn('Document', d))

    this.logger.info('Found', organizations.length, 'organizations')
    return organizations
  },

  count: async function () {
    let counter = await this.databases.counter
    let count = counter.value
    this.logger.info('Organizations count is', count)
    return count
  },

  createOrganization: async function (name, description) {
    let db = await this.databases.docs
    let feed = await this.databases.feed
    let counter = await this.databases.counter
    let random = Math.random() * 10000000000000000
    let id = String(random)
    this.logger.warn('Generated random ID', id)
    // let orgHash = await db.put({ id: id, name: name, description: description })
    let orgHash = await db.put({ name: name, description: description })
    this.logger.info('Stored organization', name, 'at', orgHash)
    let orgFeedHash = await feed.add({ id: id, name: name, description: description })
    this.logger.info('Stored organization in feed', name, 'at', orgFeedHash)
    await counter.inc(1)
    return orgHash
  },

  truncate: async function () {
    let db = await this.databases.docs
    let feed = await this.databases.feed
    let counter = await this.databases.counter

    /*
    db.destroy()
    feed.iterator({ limit: -1 })
      .collect()
      .forEach(f => feed.remove(f))
    */
    this.logger.warn('Removing', counter.value, 'from count')
    counter.dec(counter.value)
  }

}

export default Organizations
