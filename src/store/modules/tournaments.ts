import { Action, Module } from 'vuex-class-modules';
import store from '@/store';
import ExtendedVuexModule from '@/store/ExtendedVuexModule';
import { Tournament } from '@/common/types/Tournament';
import TournamentsService from '@/services/TournamentsService';

interface TournamentsState {
  tournaments: Tournament[];
}

// interface/class merging is needed here to avoid duplicate type annotations during class declaration
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TournamentsModule extends TournamentsState {}

@Module({ generateMutationSetters: true })
class TournamentsModule extends ExtendedVuexModule<TournamentsState> {
  @Action
  async getTournaments(): Promise<void> {
    this.tournaments = await TournamentsService.getTournaments();
  }

  @Action
  // eslint-disable-next-line class-methods-use-this
  async createTournament(): Promise<void> {
    await TournamentsService.createTournament({
      id: '0',
      games: null,
      date: new Date().toISOString(),
    });
  }
}

const tournamentsModule = new TournamentsModule({
  state: {
    tournaments: [],
  },
  store,
  name: 'tournaments',
});

export default tournamentsModule;
