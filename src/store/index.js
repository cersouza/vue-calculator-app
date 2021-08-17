import Vue from 'vue';
import Vuex from 'vuex';
import EvaluateCountUseCase from '../user-cases/EvaluateCountUseCase';

Vue.use(Vuex);

function sanitizeInputData(data) {
  const sanitizedInput = replacePercentagemWithoutNumber(data);
  return sanitizedInput;
}

function replacePercentagemWithoutNumber(data) {
  const percentageOperatorAlone = /^%$/;
  const percentageOperatorAfterANonNumber = /(?<=\D)%/g;
  return data
    .replace(percentageOperatorAlone, '0%')
    .replace(percentageOperatorAfterANonNumber, '0%');
}

const store = new Vuex.Store({
  state: {
    currentInput: '',
    calculationsHistory: [],
  },
  mutations: {
    updateCurrentInput(state, { data }) {
      state.currentInput = sanitizeInputData(data);
    },
    addCharacterToCurrentInput(state, { data }) {
      const updatedInput = state.currentInput + data;
      state.currentInput = sanitizeInputData(updatedInput);
    },
    addCountToHistory(state, { expression, result }) {
      state.calculationsHistory.push({ expression, result });
    },
  },
  actions: {
    calculateAndStoreResult({ state, commit }) {
      const result = String(EvaluateCountUseCase.execute({ data: state.currentInput }));

      commit('addCountToHistory', {
        result,
        expression: state.currentInput,
      });

      return result;
    },
  },
});

export default store;
