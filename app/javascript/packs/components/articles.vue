<template>
  <div class="articles container">
    <div class="row">
      <div class="col-md-12">
        <h3>Add new article</h3>
        <form v-on:submit="addArticle" >
          <input type="text" v-model="newArticle.content"><br/>
          <input type="submit" value="Submit">
        </form>
        <hr>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <art v-for="article in articles" :article="article" :key="article.id"></art>
      </div>
      <div class="col-md-6">
        <art v-for="article in readedArticles" :article="article" :key="article.id"></art>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
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
    computed: mapGetters({
      articles: 'openArticles',
      readedArticles: 'readedArticles',
    }),
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

