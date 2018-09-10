<template>
  <v-card>
    <v-card-title primary-title><h3 class="headline mb-0">IPFS</h3></v-card-title>
    <v-divider />
    <v-card-text>
      <p>Node status: {{ ipfsOnline }}</p>
      <p>Node ID: {{ ipfsID }}</p>
    </v-card-text>
  </v-card>
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
  },
  mounted: () => {
    console.log('===> IPFS', this.$ipfs)
  }
}
</script>

<style scoped>
</style>
