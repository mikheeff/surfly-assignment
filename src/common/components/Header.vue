<template>
  <div class="header">
    I am header
    <router-link :to="{ name: 'TournamentsOverview' }">Tournaments Overview</router-link>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'Header',
  });
</script>

<style lang="scss" scoped>

</style>
