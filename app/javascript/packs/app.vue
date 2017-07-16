<template>
  <div id="app">
    <p>{{ message }}</p>
    <articles></articles>
  </div>
</template>

<script>
import Articles from './components/articles'

export default {
  data: function () {
    return {
      message: "Hello Vue!"
    }
  },
  components: {
    Articles
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
