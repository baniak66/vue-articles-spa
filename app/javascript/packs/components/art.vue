<template>
  <div class="art">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3>
          {{article.title}} [{{article.created_at}}] ({{article.id}})
        </h3>
        <button v-on:click="deleteArticle(article)" class="btn btn-primary btn-sm">X</button>
        <button v-on:click="markArticle(article)" v-if="article.readed==false" class="btn btn-info btn-sm">Readed</button>
      </div>
      <div class="panel-body">
        <h4>{{article.content}}</h4>
        <ul>
          <li v-for="comment in article.comments">{{comment.name}} comment no: {{comment.id}}
            <button v-on:click="deleteComment(comment)" class="btn btn-danger btn-sm">X</button>
          </li>
        </ul>
        <form v-on:submit="addComment" >
          <input type="text" v-model="newComment.name"><br/>
          <input type="submit" value="Submit">
        </form>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'art',
    props: ['article'],
    data () {
      return {
        newComment: {
          name: "",
          id: this.article.id
        }
      }
    },
    methods: {
      deleteArticle: function (article) {
        this.$store.dispatch('DELETE_ARTICLE', article.id)
      },
      addComment: function (e) {
        this.$store.dispatch('ADD_NEW_COMMENT', this.newComment)
        e.preventDefault()
        this.newComment.name = ""
      },
      deleteComment: function (comment) {
        this.$store.dispatch('DELETE_COMMENT', {
          article_id: comment.article_id,
          comment_id: comment.id
        })
      },
      markArticle: function (article) {
        this.$store.dispatch('MARK_ARTICLE', {
          id: article.id,
          readed: true
        })
      }
    }
  }
</script>

<style scoped>
</style>
