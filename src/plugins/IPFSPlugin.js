import IPFS from '../services/ipfs'

export default {
  install: async function (Vue) {
    console.log('Installing IPFS ...')

    let ipfsInstance = IPFS.init()

    Vue.prototype.$ipfs = {
      async isOnline () {
        let ipfs = await ipfsInstance
        return ipfs.isOnline()
      },
      async id () {
        let ipfs = await ipfsInstance
        let info = await ipfs.id()
        return info.id
      }
    }

    console.log('IPFS installed ...')
  }
}
