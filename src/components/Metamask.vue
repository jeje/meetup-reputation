<template>
  <v-card>
    <v-card-title primary-title><h3 class="headline">Metamask</h3></v-card-title>
    <v-divider />
    <v-card-text>
      <p>Metamask connected? {{ web3.isInjected }}</p>
      <p>Network: {{ web3Network }}</p>
      <p>Account: {{ web3.coinbase }}</p>
      <p>Balance: {{ web3.balance }}</p>
    </v-card-text>
  </v-card>
</template>

<script>
import networks from '../util/networks.js'

export default {
  name: 'Metamask',
  beforeCreate () {
    this.$store.dispatch('registerWeb3')
  },
  computed: {
    web3 () {
      return this.$store.state.web3
    },
    web3Network () {
      return networks[this.web3.networkId]
    }
  }
}
</script>

<style scoped>
</style>
