import OrbitDB from 'orbit-db'

const OrbitDBService = {
  orbitdb: null,

  init: function (ipfs) {
    // return previously configured OrbitDB instance if available
    if (this.orbitdb !== null) {
      return this.orbitdb
    }

    let self = this
    return new Promise((resolve, reject) => {
      ipfs.on('error', e => reject(e))
      ipfs.on('ready', async () => {
        self.orbitdb = new OrbitDB(ipfs)
        resolve(self.orbitdb)
      })
    })
  },

  getOrbitDB: function () {
    return this.orbitdb
  }

}

export default OrbitDBService
