<template>
  <AppModal
    class="create-tournament-modal"
    @save="createTournament"
    @input="handleInput"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template slot="modal-title">Create Tournament</template>
    <p class="subtitle">Please enter participants</p>
    <fieldset class="create-tournament-fieldset">
      <div
        v-for="(player, index) in tournamentsModule.players"
        :key="index"
        class="field"
      >
        <label class="label">Player {{ index + 1 }}</label>
        <div class="control">
          <input
            :value="player"
            @input="updatePlayer($event.target.value, index)"
            class="input" type="text" placeholder="Player name"
          >
        </div>
      </div>
    </fieldset>
    <button
      @click="addPlayer"
      class="button is-info"
    >
      Add player
    </button>
    <template
      v-slot:modal-footer="{ exit }"
    >
      <button
        class="button is-success"
        :disabled="isCreateButtonDisabled"
        @click="createTournament"
      >
        Create Tournament
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
    name: 'CreateTournamentModal',
    components: { AppModal },
    data() {
      return {
        tournamentsModule,
      };
    },
    computed: {
      isCreateButtonDisabled(): boolean {
        return tournamentsModule.filledPlayers.length <= 1;
      },
    },
    methods: {
      addPlayer() {
        tournamentsModule.players = [...tournamentsModule.players, ''];
      },
      updatePlayer(player: string, index: number) {
        const players = [...tournamentsModule.players];
        players[index] = player;
        tournamentsModule.players = [...players];
      },
      createTournament() {
        tournamentsModule.createTournament();
      },
      handleInput(value: boolean) {
        if (!value) {
          tournamentsModule.resetPlayers();
        }
      },
    },
  });
</script>

<style lang="scss" scoped>

  ::v-deep .modal-card-body {
    min-height: 600px;
  }

  .create-tournament-fieldset {
    margin-bottom: 24px;
  }
</style>
