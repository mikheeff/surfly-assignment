<template>
  <div
    class="klask-tournament-app"
    id="app"
  >
    <Header/>
    <main class="main">
      <router-view/>
    </main>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Header from '@/common/components/Header.vue';

  export default Vue.extend({
    name: 'App',
    components: {
      Header,
    },
  });
</script>

<style lang="scss">

  .klask-tournament-app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;

    .main {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      background-color: #fff;
    }
  }
</style>
