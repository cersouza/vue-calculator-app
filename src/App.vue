<template>
  <div id="app">
    <main>
      <Calculator />
    </main>
    <footer>
      <p>Developed with ❤️ by <a href="https://github.com/cersouza"><strong>cersouza.</strong></a></p>
    </footer>
  </div>
</template>

<script>
import Calculator from './components/Calculator.vue';
import store from './store';

document.title = 'Calculator with Vue';

export default {
  name: 'App',
  store,
  components: {
    Calculator,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
