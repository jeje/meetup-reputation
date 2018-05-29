
import Ipfs from 'ipfs'

const IPFS = {

  ipfs: null,

  init: function () {
    // return previously configured ipfs instance if available
    if (this.ipfs !== null) {
      return this.ipfs
    }

    // TODO: change that to something which may work over the internet
    // This is needed in order to keep data in IPFS after the windows is closed
    // otherwise we would just loose the content
    const peer = '/ip4/10.20.0.2/tcp/4004/ws/ipfs/QmbnxFMgyJUDTd5L4E84XWkm8XGGuSYvQvMXAdvYLuqc1E'

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

    this.ipfs = new Ipfs(ipfsOptions)
    return new Promise((resolve, reject) => {
      this.ipfs.on('error', e => reject(e))
      this.ipfs.on('ready', async () => {
        // TODO: figure out why adding the peer in the config is not enough :(
        let peer = ipfsOptions.config.Addresses.Swarm[1]
        console.log('About to connect to swarm peer', peer)
        this.ipfs.swarm.connect(peer)
          .then(() => console.log(`Successfully added swarm peer ${peer}`))
          .catch(error => console.error('Failed to add swarm peer', error))
        // return ipfs instance
        resolve(this.ipfs)
      })
    })
  }

}

export default IPFS
