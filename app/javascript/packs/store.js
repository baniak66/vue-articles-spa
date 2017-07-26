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
      axios.get('/articles.json').then((response) => {
        commit('SET_ARTICLE_LIST', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    }
  },
  mutations: {
    SET_ARTICLE_LIST: (state, { list }) => {
      state.articles = list
    }
  },
  getters: {
    openArticles: state => {
      return state.articles
    }
  }
})
export default store
