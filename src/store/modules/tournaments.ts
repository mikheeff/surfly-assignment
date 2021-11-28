import { Action, Module } from 'vuex-class-modules';
import { v4 as uuidv4 } from 'uuid';
import store from '@/store';
import ExtendedVuexModule from '@/store/ExtendedVuexModule';
import { Tournament } from '@/common/types/Tournament';
import TournamentsService from '@/services/TournamentsService';
import TournamentStatus from '@/common/types/TournamentStatus';
import notificationsModule from '@/store/modules/notificationsModule';
import RoundStatus from '@/common/types/RoundStatus';
import { Score } from '@/common/types/Game';
import { Match } from '@/common/types/Match';

interface TournamentsState {
  tournaments: Tournament[];
  players: string[];
  isCreateTournamentModalOpen: boolean;
  isAddGameModalOpen: boolean;
  tournamentDetails: Tournament | null;
  selectedMatch: Match | null;
  score1: Score;
  score2: Score;
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

      await this.getTournaments();

      notificationsModule.addNotification('Tournament has been created');
      this.isCreateTournamentModalOpen = false;
    } catch (error) {
      console.log(error);
    }
  }

  @Action
  async getTournamentDetails(id: string): Promise<void> {
    this.tournamentDetails = await TournamentsService.getTournamentById(id);
  }

  @Action
  async startTournament(id: string): Promise<void> {
    if (!this.tournamentDetails) {
      throw new Error('no tournament');
    }

    const newRounds = [...this.tournamentDetails.rounds];
    const firstRound = newRounds.find((round) => round.id === '1');

    if (firstRound) {
      firstRound.status = RoundStatus.IN_PROGRESS;
    }

    await TournamentsService.updateTournamentById(id, {
      status: TournamentStatus.IN_PROGRESS,
      rounds: newRounds,
    });

    await this.getTournamentDetails(id);
  }

  // @Action
  // async addGameToTournament(game: Game): Promise<void> {
  //   if (!this.tournamentDetails || !this.selectedMatch) {
  //     throw new Error('no tournament');
  //   }

  // const game = { // TODO: finish add game
  //   id: uuidv4(),
  //   scores: [this.score1, this.score2],
  // };

  // const newRounds = [...this.tournamentDetails.rounds];
  //
  // const match = newRounds.find((round) => round.matches.find((match) => match.id === this.selectedMatch!.id));
  //
  // if (match) {
  //   match
  // }
  // await TournamentsService.updateTournamentById(this.tournamentDetails.id, {
  //   rounds: newRounds,
  // });
  // }

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
    isAddGameModalOpen: false,
    tournamentDetails: null,
    selectedMatch: null,
    score1: {
      player: '',
      score: 0,
    },
    score2: {
      player: '',
      score: 0,
    },
  },
  store,
  name: 'tournaments',
});

export default tournamentsModule;
