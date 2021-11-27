import { Action, Module } from 'vuex-class-modules';
import { v4 as uuidv4 } from 'uuid';
import store from '@/store';
import ExtendedVuexModule from '@/store/ExtendedVuexModule';
import { Tournament } from '@/common/types/Tournament';
import TournamentsService from '@/services/TournamentsService';
import TournamentStatus from '@/common/types/TournamentStatus';
import notificationsModule from '@/store/modules/notificationsModule';

interface TournamentsState {
  tournaments: Tournament[];
  players: string[];
  isCreateTournamentModalOpen: boolean;
}

// interface/class merging is needed here to avoid duplicate type annotations during class declaration
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TournamentsModule extends TournamentsState {}

@Module({ generateMutationSetters: true })
class TournamentsModule extends ExtendedVuexModule<TournamentsState> {
  get filledPlayers(): string[] {
    return this.players.filter((player) => player);
  }

  @Action
  async getTournaments(): Promise<void> {
    this.tournaments = await TournamentsService.getTournaments();
  }

  @Action
  async createTournament(): Promise<void> {
    try {
      const rounds = TournamentsService.generateRounds(this.filledPlayers);

      await TournamentsService.createTournament({
        id: uuidv4(),
        rounds,
        players: this.filledPlayers,
        date: new Date().toISOString(),
        status: TournamentStatus.NOT_STARTED,
      });

      this.resetPlayers();
      await this.getTournaments();

      notificationsModule.addNotification('Tournament has been created');
      this.isCreateTournamentModalOpen = false;
    } catch (error) {
      console.log(error);
    }
  }

  @Action
  resetPlayers(): void {
    this.players = [''];
  }
}

const tournamentsModule = new TournamentsModule({
  state: {
    tournaments: [],
    players: [''],
    isCreateTournamentModalOpen: false,
  },
  store,
  name: 'tournaments',
});

export default tournamentsModule;
