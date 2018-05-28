import Ipfs from 'ipfs'

let ipfs

const IPFS = {

  init: () => {
    // TODO: change that to something which may work over the internet
    // This is needed in order to keep data in IPFS after the windows is closed
    // otherwise we would just loose the content
    let peer = '/ip4/10.20.0.2/tcp/4004/ws/ipfs/QmbnxFMgyJUDTd5L4E84XWkm8XGGuSYvQvMXAdvYLuqc1E'

    ipfs = new Ipfs({
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
    })

    return new Promise(function (resolve, reject) {
      ipfs.once('ready', () => {
        let isOnline = ipfs.isOnline()
        console.log('Online status:', ipfs.isOnline() ? 'online' : 'offline')
        let result = {
          isOnline: isOnline
        }

        return ipfs.id()
          .then(info => {
            let nodeID = info.id
            console.log(`IPFS node ready with address ${nodeID}`)
            result = Object.assign({}, result, {nodeID})
            // result.ipfsInstance = ipfs
            resolve(result)
          })
          .catch(err => {
            console.error('Can\'t connect to IPFS', err)
            reject(err)
          })
      })
    })
  },

  test: (node) => {
    // store it as a DAG node and retreive it afterwards
    let cid = ipfs.dag.put(node, { format: 'dag-cbor', hashAlg: 'sha2-256' })
      .then(cid => {
        console.log('Added RSVP node:', cid.toBaseEncodedString(), 'with content', node)
        return cid
      })
      .catch(error => console.error("Can't put DAG node", error))
    cid
      .then(cid => ipfs.dag.get(cid))
      .then(result => console.log('Retrieved RSVP node is:', result.value))
      .catch(error => console.error(`Can't get RSVP node ${cid}`, error))
    cid
      .then(cid => ipfs.dag.get(cid, 'agent'))
      .then(result => console.log('Retrieved RSVP agent is:', result.value))
      .catch(error => console.error(`Can't get RSVP agent from ${cid}`, error))
    cid
      .then(cid => ipfs.dag.get(cid, 'test/1'))
      .then(result => console.log('Retrieved DAG graph is:', result.value))
      .catch(error => console.error(`Can't get DAG graph from ${cid}`, error))
  }

}

/*
ipfs.once('ready', () => {
  console.log('Online status: ', ipfs.isOnline() ? 'online' : 'offline')
  document.getElementById('status').innerHTML = ipfs.isOnline() ? 'online' : 'offline'

  ipfs.id()
    .then(info => console.log(`IPFS node ready with address ${info.id}`))
    .catch(err => console.error('Can\'t connect to IPFS', err))

  const dummyObject = {
    '@context': 'http://schema.org',
    '@type': 'RsvpAction',
    'agent': {
      '@type': 'Person',
      'name': 'John'
    },
    'event': {
      '@type': 'SportsEvent',
      'name': 'NBA finals'
    },
    'test': ['one', 'two', 'three']
  }

  // TODO: figure out why adding the peer in the config is not enough :(
  ipfs.swarm.connect(peer)
    .then(() => console.log(`Successfully added swarm peer ${peer}`))
    .catch(error => console.error('Failed to add swarm peer', error))

  // store it as a DAG node and retreive it afterwards
  let cid = ipfs.dag.put(dummyObject, { format: 'dag-cbor', hashAlg: 'sha2-256' })
    .then(cid => {
      console.log('Added RSVP node:', cid.toBaseEncodedString(), 'with content', dummyObject)
      return cid
    })
    .catch(error => console.error("Can't put DAG node", error))
  cid
    .then(cid => ipfs.dag.get(cid))
    .then(result => console.log('Retrieved RSVP node is:', result.value))
    .catch(error => console.error(`Can't get RSVP node ${cid}`, error))
  cid
    .then(cid => ipfs.dag.get(cid, 'agent'))
    .then(result => console.log('Retrieved RSVP agent is:', result.value))
    .catch(error => console.error(`Can't get RSVP agent from ${cid}`, error))
  cid
    .then(cid => ipfs.dag.get(cid, 'test/1'))
    .then(result => console.log('Retrieved DAG graph is:', result.value))
    .catch(error => console.error(`Can't get DAG graph from ${cid}`, error))
})
*/

export default IPFS
