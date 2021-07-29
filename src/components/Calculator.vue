<template>
  <div class="calculator-container">
    <div class="calculator">
      <Display />
      <Keyboard />
      <CalculationsHistory />
    </div>
  </div>
</template>

<style scoped>
 .calculator-container {
   height: 100%;
   width: 98vw;

   display: flex;
   justify-content: center;
   align-items: center;
 }

 .calculator {
   width: 23rem;
   padding: 3rem 2rem;

   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
 }
</style>

<script>
import Display from './Display.vue';
import Keyboard from './Keyboard.vue';
import CalculationsHistory from './CalculationsHistory.vue';

export default {
  name: 'Calculator',
  components: {
    Display,
    Keyboard,
    CalculationsHistory,
  },
};
</script>
