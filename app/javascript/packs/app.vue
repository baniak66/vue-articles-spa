<template>
  <div id="app">
    <hdr></hdr>
    <articles></articles>
  </div>
</template>

<script>
import store from './store'

import Articles from './components/articles'
import Hdr from './components/hdr.vue.erb'

export default {
  data: function () {
    return {
      message: "Hello Vue!"
    }
  },
  components: {
    Articles, Hdr
  },
  store
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
