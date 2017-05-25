<template>
  <div id="app">
    <v-Header :seller="seller"></v-Header>
    <Tab></Tab>
    <router-view :seller="seller"></router-view>

  </div>
</template>

<script>
import Header from './components/header/Header'
import Tab from './components/tab/Tab'
const ERR_OK = 0;
export default {
  name: 'app',
  data() {
    return {
      seller: {},
      list:['1','2','3']
    }
  },
  created() {
    this.$http.get('/api/seller').then((ret) => {
      if (ret.data.errno === ERR_OK) {
        this.seller = ret.data.data
      }
    })
  },
  methods: {
 
  },
  components: {
    'v-Header': Header,
    Tab
  }
}
</script>

<style lang="scss">

</style>
