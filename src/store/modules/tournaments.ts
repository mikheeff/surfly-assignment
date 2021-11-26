import { Action, Module } from 'vuex-class-modules';
import store from '@/store';
import ExtendedVuexModule from '@/store/ExtendedVuexModule';
import { Tournament } from '@/common/types/Tournament';

interface TournamentsState {
  tournaments: Tournament[]
}

// interface/class merging is needed here to avoid duplicate type annotations during class declaration
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TournamentsModule extends TournamentsState {}

@Module({ generateMutationSetters: true })
class TournamentsModule extends ExtendedVuexModule<TournamentsState> {
  @Action
  getTournaments() {
    this.tournaments = [{
      id: '123',
      games: null,
    }];
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
