<template>
  <div id="app">
    <v-Header :seller="seller"></v-Header>
    <Tab></Tab>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Header from './components/header/Header'
import Tab from './components/tab/Tab'

import AV from './lib/leancloud.js'
import { urlParse } from './common/js/until.js'

var appDate = require('../data.json')
var sellerData = appDate.seller
var goodsData = appDate.goods
var ratingsData = appDate.ratings


const ERR_OK = 0;
export default {
  name: 'app',
  data() {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse();
          return  queryParam.id ;
        })()
      },
    }
  },
  created() {
    this.fetchSeller();

  },
  computed: {
    
  },
  methods: {
    fetchSeller() {
      var query = new AV.Query('ElemeData');
      query.find()
        .then((res) => {
          // this.seller = res[0].attributes.seller
          this.seller = Object.assign({}, this.seller, res[0].attributes.seller)
        }, function (error) {
          console.error(error)
        })
    },
    saveAppdata() {
      var ElemeData = AV.Object.extend('ElemeData')
      var eleme = new ElemeData()
      eleme.set('seller', sellerData)
      eleme.set('goods', goodsData)
      eleme.set('ratings', ratingsData)
      eleme.save().then(function (res) {
        console.log(res);
      })
    }
  },
  components: {
    'v-Header': Header,
    Tab
  }
}
</script>

<style lang="scss">

</style>
