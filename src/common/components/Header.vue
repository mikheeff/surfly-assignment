<template>
  <nav class="app-navbar navbar">
    <div class="navbar-brand">
      <router-link
        class="navbar-item logo"
        :to="{ name: 'Home' }"
      >
      </router-link>
    </div>
    <div class="navbar-menu">
      <router-link
        class="navbar-item"
        :to="{ name: 'TournamentsOverview' }"
      >
        Tournaments Overview
      </router-link>
    </div>
    <transition name="opacity">
      <div
        v-if="notificationsModule.notification"
        class="header-notification notification is-success"
      >
        <button
          @click="notificationsModule.notification = null"
          class="delete"
        />
        {{ notificationsModule.notification }}
      </div>
    </transition>
  </nav>
</template>

<script lang="ts">
  import Vue from 'vue';
  import notificationsModule from '@/store/modules/notificationsModule';

  export default Vue.extend({
    name: 'Header',
    data() {
      return {
        notificationsModule,
      };
    },
  });
</script>

<style lang="scss" scoped>
  @import '~bulma/sass/utilities/_all.sass';

  .app-navbar {
    padding: 24px 48px;
    border-bottom: 2px solid #f2f2f2;

    .navbar-item {
      font-size: 20px;

      &:hover {
        color: $primary;
      }
    }

    .navbar-brand {
      .logo {
        height: 75px;
        width: 75px;
        background-image: url('../../../public/logo.jpeg');
        background-repeat: no-repeat;
        background-position: center center;
        background-size: contain;
      }
    }

    .header-notification {
      position: fixed;
      right: 24px;
    }
  }
</style>
