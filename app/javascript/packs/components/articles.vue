<template>
  <div class="articles container">
    <art v-for="article in articles" :article="article" :key="article.id"></art>
    <form v-on:submit="addArticle" >
      <input type="text" v-model="newArticle.content"><br/>
      <input type="submit" value="Submit">
    </form>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Art from './art'

  export default {
    name: 'articles',
    components: {
      Art
    },
    data () {
      return {
        newArticle: {
          content: ""
        }
      }
    },
    computed: mapState([
      'articles'
    ]),
    mounted: function () {
      this.$store.dispatch('LOAD_ARTICLE_LIST')
    },
    methods: {
      addArticle: function (e) {
        e.preventDefault()
        this.$store.dispatch('ADD_NEW_ARTICLE', this.newArticle.content)
        this.newArticle.content = ""
      }
    }
  }
</script>

<style scoped>
</style>

