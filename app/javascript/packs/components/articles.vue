<template>
  <div class="articles container">
    <div class="panel panel-default" v-for="article in articles">
      <div class="panel-heading">
        {{article.content}} [{{article.created_at}}]
        <button v-on:click="deleteArticle(article)" class="btn btn-primary">X</button>
      </div>
      <div class="panel-body">
        <ul>
          <li v-for="comment in article.comments">{{comment.name}}</li>
        </ul>
      </div>
    </div>
    <form v-on:submit="addArticle" >
      <input type="text" v-model="newArticle.content"><br/>
      <input type="submit" value="Submit">
    </form>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'articles',
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
      },
      deleteArticle: function (article) {
        this.$store.dispatch('DELETE_ARTICLE', article.id)

      }
    }
  }
</script>

<style scoped>
</style>

