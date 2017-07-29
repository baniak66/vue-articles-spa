<template>
  <div class="art">
    <div class="panel panel-default">
      <div class="panel-heading">
        {{article.content}} [{{article.created_at}}] ({{article.id}})
        <button v-on:click="deleteArticle(article)" class="btn btn-primary">X</button>
      </div>
      <div class="panel-body">
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
      }
    }
  }
</script>

<style scoped>
</style>

