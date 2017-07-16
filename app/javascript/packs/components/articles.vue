<template>
  <div class="articles">
    <h3>{{title}}</h3>
    <input type="text" v-model="title">
  </div>
</template>

<script>
  export default {
    name: 'articles',
    data () {
      return {
        title: "Siema vue z articles component"
      }
    }
  }
</script>

<style scoped>
</style>
