<template>
  <div class="art">
    <div class="panel panel-default">
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
  </div>
</template>

<script>

  export default {
    name: 'art',
    props: ['article'],
  }
</script>

<style scoped>
</style>

