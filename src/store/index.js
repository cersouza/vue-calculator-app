import Vue from 'vue';
import Vuex from 'vuex';
import { evaluate } from 'mathjs';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentInput: '',
    calculationsHistory: [],
  },
  mutations: {
    updateCurrentInput(state, { data }) {
      state.currentInput = data;
    },
    addCharacterToCurrentInput(state, { data }) {
      state.currentInput += data;
    },
    addCountToHistory(state, { expression, result }) {
      state.calculationsHistory.push({ expression, result });
    },
  },
  actions: {
    calculateAndStoreResult({ state, commit }) {
      const result = String(evaluate(state.currentInput));

      commit('addCountToHistory', {
        result,
        expression: state.currentInput,
      });

      return result;
    },
  },
});

export default store;
