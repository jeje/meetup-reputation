import IPFS from 'ipfs'

// TODO: change that to something which may work over the internet
// This is needed in order to keep data in IPFS after the windows is closed
// otherwise we would just loose the content
let peer = '/ip4/10.20.0.2/tcp/4004/ws/ipfs/QmbnxFMgyJUDTd5L4E84XWkm8XGGuSYvQvMXAdvYLuqc1E'

const ipfsOptions = {
  repo: 'ipfs-' + Math.random(),
  EXPERIMENTAL: {
    pubsub: true, // enable pubsub
    relay: {
      enabled: true, // enable relay dialer/listener (STOP)
      hop: {
        enabled: true // make this node a relay (HOP)
      }
    }
  },
  config: {
    Addresses: {
      Swarm: [
        '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star',
        peer
      ]
    }
  }
}

export default {
  install: async function (Vue) {
    const ipfs = new IPFS(ipfsOptions)
    console.log('Installing IPFS ...')

    function initIPFS () {
      return new Promise((resolve, reject) => {
        ipfs.on('error', e => reject(e))
        ipfs.on('ready', async () => {
          resolve(ipfs)
        })
      })
    }

    Vue.prototype.$ipfs = {
      async isOnline () {
        let ipfs = await initIPFS()
        return ipfs.isOnline()
      },
      async id () {
        let ipfs = await initIPFS()
        let info = await ipfs.id()
        return info.id
      }
    }

    console.log('IPFS installed ...')
  }
}
