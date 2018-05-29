<template>
  <v-card>
    <v-card-title primary-title>
      <div>
        <h3 class="headline">Metamask</h3>
        <div>
          <p>Metamask connected? {{ web3.isInjected }}</p>
          <p>Network: {{ web3Network }}</p>
          <p>Account: {{ web3.coinbase }}</p>
          <p>Balance: {{ web3.balance }}</p>
        </div>
      </div>
    </v-card-title>
  </v-card>
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
