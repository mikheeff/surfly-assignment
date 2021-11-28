<template>
  <AppModal
    class="add-game-modal"
    @exit="exit"
  >
    <template slot="modal-title">
      Add game to match {{ title }}
    </template>
    <p class="subtitle">
      Please enter game {{ gameNumber }} results
    </p>
    <fieldset class="add-game-fieldset">
      <div class="field">
        <label class="label">Score of {{ tournamentsModule.selectedMatch.players[0] }}</label>
        <div class="control">
          <input
            :value="tournamentsModule.score1.score"
            @input="updateScore1($event.target.value)"
            class="input" type="text" placeholder="Player name"
          >
        </div>
      </div>
      <div class="field">
        <label class="label">Score of {{ tournamentsModule.selectedMatch.players[1] }}</label>
        <div class="control">
          <input
            v-model="tournamentsModule.score2.score"
            @input="updateScore2($event.target.value)"
            class="input" type="text" placeholder="Player name"
          >
        </div>
      </div>
    </fieldset>
    <template #modal-footer>
      <button
        class="button is-success"
        @click="createGame"
      >
        Add Game
      </button>
      <button
        class="button"
        @click="exit"
      >
        Cancel
      </button>
    </template>
  </AppModal>
</template>

<script lang="ts">
  import Vue from 'vue';
  import AppModal from '@/common/components/AppModal.vue';
  import tournamentsModule from '@/store/modules/tournaments';

  export default Vue.extend({
    name: 'AddGameModal',
    components: { AppModal },
    data() {
      return {
        tournamentsModule,
      };
    },
    computed: {
      title(): string {
        if (!tournamentsModule.selectedMatch) {
          return '';
        }

        const [player1, player2] = tournamentsModule.selectedMatch.players;
        return `${player1} vs ${player2}`;
      },
      gameNumber(): number {
        if (!tournamentsModule.selectedMatch) {
          throw new Error('match is null');
        }

        return tournamentsModule.selectedMatch.games ? tournamentsModule.selectedMatch.games.length : 1;
      },
    },
    methods: {
      exit() {
        this.$emit('exit');
      },
      createGame() {
        // tournamentsModule.addGameToTournament(); TODO
      },
      updateScore1(score: string) {
        tournamentsModule.score1 = {
          ...tournamentsModule.score1,
          score: Number(score),
        };
      },
      updateScore2(score: string) {
        tournamentsModule.score2 = {
          ...tournamentsModule.score2,
          score: Number(score),
        };
      },
    },
  });
</script>

<style lang="scss" scoped>
  .create-tournament-fieldset {
    margin-bottom: 24px;
  }
</style>
