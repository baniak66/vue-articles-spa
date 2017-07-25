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
    <form v-on:submit="addArticle">
      <input type="text" v-model="newArticle.content"><br/>
      <input type="submit" value="Submit">
    </form>
  </div>
</template>

<script>
  import axios from 'axios'
  let token = document.getElementsByName('csrf-token')[0].getAttribute('content')
  axios.defaults.headers.common['X-CSRF-Token'] = token
  axios.defaults.headers.common['Accept'] = 'application/json'

  export default {
    name: 'articles',
    data () {
      return {
        articles: [],
        newArticle: {
          content: ""
        }
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
      },
      addArticle: function (e) {
        var vm = this;
        axios.post('/articles', {
          article: this.newArticle,
          })
        .then(function (response) {
          vm.articles.push({
            content: response.data.content,
            created_at: response.data.created_at,
            id: response.data.id
          })
          console.log(response.data)
          vm.newArticle = ""
        })
        .catch(function (error) {
          console.log(error.response)
          vm.newArticle = ""
        })
        e.preventDefault()
      },
      deleteArticle: function (article) {
        var vm = this;
        axios.delete('/articles/'+ article.id)
        .then(function (response) {
          console.log(response.data)
          vm.articles.splice(vm.articles.indexOf(article),1);
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

