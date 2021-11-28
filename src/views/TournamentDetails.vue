<template>
  <div class="tournament-details">
    <div
      v-if="tournamentsModule.tournamentDetails"
      class="container content"
    >
      <div class="title-container">
        <h1 class="title">Tournament Details</h1>
      </div>
      <h2 class="subtitle">
        Details
      </h2>
      <div class="tournament-details-content content">
        <blockquote>
          <ul>
            <li><strong>ID</strong> - {{ tournamentsModule.tournamentDetails.id }}</li>
            <li><strong>Rounds</strong> - {{ tournamentsModule.tournamentDetails.rounds.length }}</li>
            <li><strong>Players</strong> - {{ tournamentsModule.tournamentDetails.players.join(', ') }}</li>
            <li><strong>Status</strong> - {{ tournamentsModule.tournamentDetails.status }}</li>
            <li>
              <strong>Date</strong> - {{ new Date(tournamentsModule.tournamentDetails.date).toLocaleDateString() }}
            </li>
          </ul>
        </blockquote>
      </div>
      <h2 class="subtitle">
        Tournament Bracket
      </h2>
      <div class="table-container">
        <table class="is-bordered is-striped table">
          <tbody>
          <tr
            v-for="(round, index) in tournamentsModule.tournamentDetails.rounds"
            :key="round.id"
          >
            <td><strong>Round {{ index + 1 }}</strong></td>
            <td
              v-for="match in round"
              :key="match.id"
            >
              {{ match.players[0] }} - {{ match.players[1] }}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <h2 class="subtitle">
        Rounds
      </h2>
      <div
        v-for="(round, index) in tournamentsModule.tournamentDetails.rounds"
        :key="round.id"
        class="round-info"
      >
        <h4
        >
          Round {{ index + 1 }}
        </h4>
        <div class="matches">
          <div
            v-for="match in round"
            :key="match.id"
            class="match-info"
          >
            <h5>{{ match.players[0] }} vs {{ match.players[1] }}</h5>
            <button class="button is-info">Add game</button>
          </div>
        </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import tournamentsModule from '@/store/modules/tournaments';

  export default Vue.extend({
    name: 'TournamentDetails',
    props: {
      id: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        tournamentsModule,
      };
    },
    created() {
      tournamentsModule.getTournamentDetails(this.id);
    },
  });
</script>

<style lang="scss" scoped>

  .subtitle {
    margin-bottom: 24px;
  }

  .round-info {
    margin-bottom: 48px;
  }

  .matches {
    display: flex;
    flex-wrap: wrap;
  }

  .match-info {
    margin-bottom: 48px;
    width: 50%;
  }
</style>
