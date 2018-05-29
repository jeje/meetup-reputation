<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center">
        <organizations/>
        <!-- <router-link to="/purchase-orders">Purchase Orders</router-link> -->
      </v-flex>
      <v-flex xs6>
        <metamask/>
      </v-flex>
      <v-flex xs6>
        <ipfs/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Metamask from '@/components/Metamask'
import IPFS from '@/components/IPFS'
import Organizations from '@/components/Organizations'
// import IPFS from '../util/ipfs'

export default {
  name: 'Home',
  components: {
    'metamask': Metamask,
    'ipfs': IPFS,
    'organizations': Organizations
  }
}
</script>

<style scoped>
</style>
