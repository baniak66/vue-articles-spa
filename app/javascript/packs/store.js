import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

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
    }
  },
  getters: {
    openArticles: state => {
      return state.articles
    }
  }
})
export default store
