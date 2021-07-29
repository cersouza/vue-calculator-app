<template>
  <div v-if="calculationsHistoryInverse.length > 0"  class="calculation-history-container">
    <button
      v-if="!showHstory"
      @click="toggleShowHistory"
    >
      Exibir histórico
    </button>
    <button
      v-else
      @click="toggleShowHistory"
    >
      Ocultar histórico
    </button>
    <ul v-if="showHstory" class="history-list">
      <li v-for="(calc, i) in calculationsHistoryInverse" :key="`${calc}-${i}`">
        <button
          title="Adicionar valor"
          @click="updateCurrentInputLocal(calc.expression)"
        >
          {{calc.expression}}
        </button>
        =
        <button
          title="Adicionar valor"
          @click="updateCurrentInputLocal(calc.result)"
        >
          {{calc.result}}
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
  .history-list {
    list-style-type: none;

    margin: 0;
    padding: 0;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .history-list button {
    padding: 0.3rem 0.5rem;
    margin: 0.5rem;

    background-color: #FFF;
    border: 1px solid #2980b9;
    border-radius: 0.5rem;
    transition: 0.2s;

    cursor: pointer;
  }

  .history-list button:hover {
    color: #FFF;
    background-color: #2980b9;
  }

  .calculation-history-container > button {
    cursor: pointer;
    padding: 0.5rem 1rem;
    background-color: #95a5a6;
    color: #FFF;

    border: none;
    border-radius: 0.5rem;
  }

  .calculation-history-container > button:hover {
    filter: brightness(0.9);
  }
</style>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'CalculationsHistory',
  data: () => ({
    showHstory: false,
  }),
  computed: {
    ...mapState(['calculationsHistory']),
    calculationsHistoryInverse() {
      return [...this.calculationsHistory].reverse();
    },
  },
  methods: {
    ...mapMutations(['updateCurrentInput']),
    updateCurrentInputLocal(data) {
      this.updateCurrentInput({ data });
    },
    toggleShowHistory() {
      this.showHstory = !this.showHstory;
    },
  },
};
</script>
