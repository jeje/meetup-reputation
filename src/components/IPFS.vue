<template>
  <v-card>
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">IPFS</h3>
        <div>
          <p>Node status: {{ ipfsOnline }}</p>
          <p>Node ID: {{ ipfsID }}</p>
        </div>
      </div>
    </v-card-title>
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
  }
}
</script>

<style scoped>
</style>
