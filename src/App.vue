<template>
  <div
    class="klask-tournament-app"
    id="app"
  >
    <Header/>
    <router-view/>
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

</style>
