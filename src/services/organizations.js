import IPFS from '../services/ipfs'
import OrbitDB from '../services/orbit-db'
import Logger from 'logplease'

const Organizations = {
  db: null,
  logger: Logger.create('organizations'),

  init: function () {
    this.db = new Promise((resolve, reject) => {
      let ipfs = IPFS.init()
      this.logger.info('Initializing organizations database...')
      let p = OrbitDB.init(ipfs)
        .then(orbitdb => orbitdb.docstore('organizations', { indexBy: 'name' }))
        .then(db => {
          this.logger.info('Organizations database is available at', db.address)
          return db
        })
        .catch(error => reject(error))
      resolve(p)
    })
  },

  getOrganisations: async function () {
    let db = await this.db
    const organizations = db.query((doc) => true)
    this.logger.info('All organizations are', organizations)
    return organizations
  },

  createOrganization: async function (name, description) {
    let db = await this.db
    db.put({ name: name, description: description })
      .then((hash) => this.logger.info('Stored organization', name, 'at', hash))
  }

}

export default Organizations
