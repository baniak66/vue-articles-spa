<template>
  <div class="articles">
    <ul>
      <li v-for="article in articles">{{article.content}} [{{article.created_at}}]</li>
    </ul>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'articles',
    data () {
      return {
        articles: []
      }
    },
    created: function() {
      this.getArticles();
    },
    methods: {
      getArticles: function () {
        var vm = this;
        axios.get('/articles.json')
          .then(function (response) {
            console.log(response.data)
            vm.articles = response.data
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
</script>

<style scoped>
</style>

