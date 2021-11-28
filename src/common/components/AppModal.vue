<template>
  <div class="app-modal modal">
    <div
      @click="exit"
      class="modal-background"
    />
    <div class="modal-card">
      <header class="modal-card-head">
        <p
          class="modal-card-title"
        >
          <slot name="modal-title">Modal title</slot>
        </p>
        <button
          @click="exit"
          class="delete"
          aria-label="close"
        />
      </header>
      <section class="modal-card-body">
        <slot/>
      </section>
      <footer class="modal-card-foot">
        <slot
          :exit="exit"
          name="modal-footer"
        />
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'AppModal',
    methods: {
      exit() {
        this.$emit('exit');
      },
    },
  });
</script>

<style lang="scss" scoped>

</style>
