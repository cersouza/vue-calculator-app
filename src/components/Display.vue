<template>
  <div class="display-container">
    <input
      type="text"
      class="display"
      data-testid="input-display"
      v-model="currentInputLocal"
      @keydown.enter="calculateResultLocal"
      placeholder="Type a count then press &quot;Enter&quot;"
    />
  </div>
</template>

<style scoped>
  .display-container {
    margin: 1rem 0.5rem;
  }

  .display {
    width: 20rem;
    min-height: 2rem;
    padding: 0.5rem 1rem;

    text-align: right;
    border: 1px solid #2980b9;
    border-radius: 0.5rem;
    font-weight: 600;
  }

  .display .non-number-character {
    color: #2980b9;
    font-weight: 600;
    margin: 0 0.5rem;
  }
</style>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'Display',
  computed: {
    ...mapState(['currentInput']),
    currentInputLocal: {
      get() {
        return this.currentInput;
      },
      set(data) {
        this.updateCurrentInput({ data });
      },
    },
  },
  methods: {
    ...mapActions(['calculateAndStoreResult']),
    ...mapMutations(['updateCurrentInput']),
    async calculateResultLocal() {
      if (this.currentInputLocal) {
        const result = await this.calculateAndStoreResult();
        this.updateCurrentInput({ data: result });
      }
    },
  },
};
</script>
