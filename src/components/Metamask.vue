<template>
  <div class='metamask-info'>
    <p>Metamask: {{ web3.isInjected }}</p>
    <p>Network: {{ web3Network }}</p>
    <p>Account: {{ web3.coinbase }}</p>
    <p>Balance: {{ web3.balance }}</p>
  </div>
</template>

<script>
import networks from '../util/networks.js'

export default {
  name: 'Metamask',
  beforeCreate () {
    console.log('registerWeb3 Action dispatched from Metamask.vue')
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
