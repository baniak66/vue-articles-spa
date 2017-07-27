<template>
  <div class="articles container">
    <art v-for="article in articles" :article="article"></art>
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
        this.$store.dispatch('ADD_NEW_ARTICLE', this.newArticle)
        e.preventDefault()
        this.newArticle = ""
      },
      deleteArticle: function (article) {
        this.$store.dispatch('DELETE_ARTICLE', article.id)
      }
    }
  }
</script>

<style scoped>
</style>

