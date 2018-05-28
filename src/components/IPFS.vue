<template>
  <div class="ipfs">
    <p>Node status: {{ ipfsOnline }}</p>
    <p>Node ID: {{ ipfsID }}</p>
  </div>
</template>

<script>
// import IPFS from '../util/ipfs'

export default {
  name: 'IPFS',
  asyncComputed: {
    async ipfsOnline () {
      return this.$ipfs.isOnline()
        .then(online => online ? 'online' : 'offline')
    },
    async ipfsID () {
      return this.$ipfs.id()
    }
  }
  /*
  beforeCreate () {
    console.log('registerWeb3 Action dispatched from IPFS.vue')
    this.$store.dispatch('registerIPFS')
  },
  computed: {
    ipfs () {
      return this.$store.state.ipfs
    },
    ipfsOnline () {
      return this.ipfs.isOnline ? 'online' : 'offline'
    }
  }
  */
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
