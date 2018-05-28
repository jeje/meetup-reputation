<template>
  <div>
    <h1>MetaMask</h1>
    <metamask/>

    <h1>IPFS</h1>
    <ipfs/>
  </div>
</template>

<script>
import Metamask from '@/components/Metamask'
import IPFS from '@/components/IPFS'
// import IPFS from '../util/ipfs'

export default {
  name: 'Home',
  components: {
    'metamask': Metamask,
    'ipfs': IPFS
  }
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
