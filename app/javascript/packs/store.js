import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

let token = document.getElementsByName('csrf-token')[0].getAttribute('content')
axios.defaults.headers.common['X-CSRF-Token'] = token
axios.defaults.headers.common['Accept'] = 'application/json'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    articles: []
  },
  actions: {
    LOAD_ARTICLE_LIST: function ({ commit }) {
      axios.get('/articles').then((response) => {
        commit('SET_ARTICLE_LIST', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    ADD_NEW_ARTICLE: function ({ commit }, payload) {
      axios.post('/articles', payload).then((response) => {
        commit('ADD_ARTICLE', { article: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    DELETE_ARTICLE: function ({ commit }, payload) {
      axios.delete('/articles/' + payload).then((response) => {
        commit('REMOVE_ARTICLE', { article: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    ADD_NEW_COMMENT: function ({ commit }, payload) {
      axios.post('/articles/' + payload.id + '/comments', {name: payload.name}).then((response) => {
        commit('ADD_COMMENT', { comment: response.data })
      }, (err) => {
        console.log(err)
      })
    },
  },
  mutations: {
    SET_ARTICLE_LIST: (state, { list }) => {
      state.articles = list
    },
    ADD_ARTICLE: (state, { article }) => {
      state.articles.push(article)
    },
    REMOVE_ARTICLE: (state, { article }) => {
      state.articles.splice(state.articles.indexOf(article),1);
    },
    ADD_COMMENT: (state, { comment }) => {
      var comments = state.articles.filter(function(art) { return art.id == comment.article_id})
      comments[0].comments.push(comment)
    },

  },
  getters: {
    openArticles: state => {
      return state.articles
    }
  }
})
export default store
