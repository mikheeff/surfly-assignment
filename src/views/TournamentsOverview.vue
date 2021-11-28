<template>
  <div class="tournaments-overview">
    <div class="container content">
      <div class="title-container">
        <h1 class="title">Tournaments</h1>
        <button
          @click="tournamentsModule.isCreateTournamentModalOpen = true"
          class="button is-primary"
        >
          Add tournament
        </button>
      </div>
      <table
        v-if="tournamentsModule.tournaments.length"
        class="table"
      >
        <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Status</th>
          <th>Participants</th>
        </tr>
        </thead>
        <tbody>
        <tr
          class="table-row"
          v-for="tournament in tournamentsModule.tournaments"
          :key="tournament.id"
          @click="$router.push({ name: 'TournamentDetails', params: { id: tournament.id } })"
        >
          <td>{{ tournament.id }}</td>
          <td>{{ new Date(tournament.date).toLocaleDateString() }}</td>
          <td>{{ tournament.status }}</td>
          <td>{{ tournament.players.join(', ') }}</td>
        </tr>
        </tbody>
      </table>
      <div v-else>
        No tournaments
      </div>
    </div>
    <CreateTournamentModal v-model="tournamentsModule.isCreateTournamentModalOpen" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import tournamentsModule from '@/store/modules/tournaments';
  import CreateTournamentModal from '@/modules/tournaments/CreateTournamentModal.vue';

  export default Vue.extend({
    name: 'TournamentsOverview',
    components: { CreateTournamentModal },
    data() {
      return {
        tournamentsModule,
        selectedTournament: null,
      };
    },
    created() {
      tournamentsModule.getTournaments();
    },
  });
</script>

<style lang="scss" scoped>

  .table-row:hover {
    cursor: pointer;
    background-color: #00d1b2;
    color: #fff;
    transition: all .2s;
  }

  .app-modal {
    display: flex;
  }
</style>
