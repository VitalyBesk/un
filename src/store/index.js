import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({

  state: {
    number: '',
    errorResult: null,
    successResult: null,
    tokens: {
      'A': {
        pattern: /[a-zA-Zа-яА-ЯёЁіІїЇ]/,
        transform: v => v.toLocaleUpperCase()
      },
      'D': {
        pattern: /\d/
      }
    }
  },

  mutations: {
    updateNumber: (state, payload) => {
      state.number = payload;
      if (state.number === '' && state.errorResult !== null)  state.errorResult = null;
    },
    updateResult: (state, res) => {
      state.successResult = res.data.result;
      state.errorResult = null;
    },
    updateError: (state, err) => {
      state.errorResult = err.response.data.error;
      state.successResult = null;
    },
  },

  actions: {
    getNumber: ({commit,state}) => {
      Axios.get(`http://localhost:8080/api/v1/car-info/${state.number}`)
      .then((res) => commit('updateResult', res))
      .catch((err) => commit('updateError', err));
    }
  }
});
