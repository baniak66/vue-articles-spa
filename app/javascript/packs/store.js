import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

let token = document.getElementsByName('csrf-token')[0].getAttribute('content')
axios.defaults.headers.common['X-CSRF-Token'] = token
axios.defaults.headers.common['Accept'] = 'application/json'

let search = (arry, art_id) => {
  for (var i=0; i < arry.length; i++) {
    if (arry[i].id === art_id) { return i }
  }
}

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    articles: [],
  },
  actions: {
    LOAD_ARTICLE_LIST: ({ commit }) => {
      axios.get('/articles').then((response) => {
        commit('SET_ARTICLE_LIST', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    ADD_NEW_ARTICLE: ({ commit }, payload) => {
      axios.post('/articles', {content: payload}).then((response) => {
        commit('ADD_ARTICLE', { article: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    DELETE_ARTICLE: ({ commit }, payload) => {
      axios.delete('/articles/' + payload).then((response) => {
        console.log("article no: " + response.data.id + " removed from db")
        commit('REMOVE_ARTICLE', { article: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    ADD_NEW_COMMENT: ({ commit }, payload) => {
      axios.post('/articles/' + payload.id + '/comments', {name: payload.name}).then((response) => {
        commit('ADD_COMMENT', { comment: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    DELETE_COMMENT: ({ commit }, payload) => {
      axios.delete('/articles/' + payload.article_id + '/comments/' + payload.comment_id).then((response) => {
        commit('REMOVE_COMMENT', { comment: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    MARK_ARTICLE: ({ commit }, payload) => {
      axios.put('/articles/' + payload.id, {readed: payload.readed} ).then((response) => {
        commit('ARTICLE_READED', { article: response.data })
      }, (err) => {
        console.log(err)
      })
    }
  },
  mutations: {
    SET_ARTICLE_LIST: (state, { list }) => {
      state.articles = list
    },
    ADD_ARTICLE: (state, { article }) => {
      state.articles.push(article)
    },
    REMOVE_ARTICLE: (state, { article }) => {
      state.articles.splice(search(state.articles, article.id),1);
    },
    ADD_COMMENT: (state, { comment }) => {
      let comments = state.articles.filter((art) => { return art.id == comment.article_id})
      comments[0].comments.push(comment)
    },
    REMOVE_COMMENT: (state, { comment }) => {
      let article_comments = state.articles.filter((art) => { return art.id == comment.article_id})[0]
      article_comments.comments.splice(search(article_comments.comments, comment.id),1);
    },
    ARTICLE_READED: (state, { article }) => {
      state.articles[search(state.articles, article.id)].readed = true
    }
  },
  getters: {
    openArticles: state => {
      return state.articles.filter(article => !article.readed)
    },
    readedArticles: state => {
      return state.articles.filter(article => article.readed)
    }
  }
})
export default store
