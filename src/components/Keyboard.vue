<template>
  <div>
    <div class="keyboard-container">
    <button class="keyboard-key" @click="addCharacterToCurrentInput({data: '1'})">1</button>
    <button class="keyboard-key" @click="addCharacterToCurrentInput({data: '2'})">2</button>
    <button class="keyboard-key" @click="addCharacterToCurrentInput({data: '3'})">3</button>

    <button
      class="keyboard-key operator-count-key"
      @click="addCharacterToCurrentInput({data: '+'})"
    >
      +
    </button>

    <button class="keyboard-key" @click="addCharacterToCurrentInput({data: '4'})">4</button>
    <button class="keyboard-key" @click="addCharacterToCurrentInput({data: '5'})">5</button>
    <button class="keyboard-key" @click="addCharacterToCurrentInput({data: '6'})">6</button>

    <button
      class="keyboard-key operator-count-key"
      @click="addCharacterToCurrentInput({data: '-'})"
    >
      -
    </button>

    <button class="keyboard-key" @click="addCharacterToCurrentInput({data: '7'})">7</button>
    <button class="keyboard-key" @click="addCharacterToCurrentInput({data: '8'})">8</button>
    <button class="keyboard-key" @click="addCharacterToCurrentInput({data: '9'})">9</button>

    <button
      class="keyboard-key operator-count-key"
      @click="addCharacterToCurrentInput({data: '/'})"
    >
      /
    </button>

    <button class="keyboard-key" @click="addCharacterToCurrentInput({data: '0'})">0</button>

    <button
      class="keyboard-key"
      @click="addCharacterToCurrentInput({data: '.'})"
    >
      .
    </button>

    <button
      class="keyboard-key"
      @click="clearInput"
    >
      C
    </button>

    <button
      class="keyboard-key operator-count-key"
      @click="addCharacterToCurrentInput({data: '*'})"
    >
      *
    </button>
  </div>
    <button
      class="keyboard-key equal-sign-key"
      @click="calculateResultLocal"
    >
      =
    </button>
    <button
      class="keyboard-key operator-count-key"
      @click="addCharacterToCurrentInput({data: '%'})"
    >
      %
    </button>
  </div>
</template>

<style scoped>
  .keyboard-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }

  .keyboard-key {
    height: 3rem;
    width: 3rem;
    margin: 0.5rem;
    padding: 0.5rem;

    border: none;
    border-radius: 50%;

    cursor: pointer;
    transition: 0.2s;
  }

  .keyboard-key:hover {
    filter: brightness(0.8);
  }

  .operator-count-key {
    color: #FFF;
    background-color: #2980b9;
  }

  .equal-sign-key {
    width: 12rem;
    border-radius: 2rem;

    color: #FFF;
    background-color: #d35400;
  }
</style>

<script>
import { mapMutations, mapState, mapActions } from 'vuex';

export default {
  name: 'Keyboard',
  computed: {
    ...mapState(['currentInput']),
  },
  methods: {
    ...mapMutations(['addCharacterToCurrentInput', 'updateCurrentInput']),
    ...mapActions(['calculateAndStoreResult']),
    clearInput() {
      this.updateCurrentInput({ data: '' });
    },
    async calculateResultLocal() {
      if (this.currentInput) {
        const result = await this.calculateAndStoreResult();
        this.updateCurrentInput({ data: result });
      }
    },
  },
};
</script>
