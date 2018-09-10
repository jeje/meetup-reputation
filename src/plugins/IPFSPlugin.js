import IPFS from '../services/ipfs'
import Logger from 'logplease'

export default {
  install: async function (Vue) {
    const logger = Logger.create('IPFSPlugin')

    logger.info('Installing IPFS ...')

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

    logger.info('IPFS installed ...')
  }
}
