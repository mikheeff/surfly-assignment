import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Tournament } from '@/common/types/Tournament';
import { shuffle } from '@/common/utils/GeneralUtils';
import { Round } from '@/common/types/Round';
import RoundStatus from '@/common/types/RoundStatus';

export default class TournamentsService {
  static async getTournaments(): Promise<Tournament[]> {
    const { data } = await axios.get<Tournament[]>('http://localhost:3000/tournaments');

    return data;
  }

  static async getTournamentById(id: string): Promise<Tournament> {
    const { data } = await axios.get<Tournament>(`http://localhost:3000/tournaments/${id}`);

    return data;
  }

  static async createTournament(tournament: Tournament): Promise<void> {
    await axios.post('http://localhost:3000/tournaments', tournament);
  }

  static async updateTournamentById(id: string, tournament: Partial<Tournament>): Promise<void> {
    await axios.patch(`http://localhost:3000/tournaments/${id}`, tournament);
  }

  static generateRounds(inputPlayers: string[]): Round[] {
    const players: (string | null)[] = [...shuffle(inputPlayers)];
    const playersAmount = players.length;

    if (playersAmount <= 0) {
      return [];
    }

    const rounds: Round[] = [];
    const isEven = playersAmount % 2 === 0;
    const roundsAmount = isEven ? playersAmount - 1 : playersAmount;
    const matchesPerRound = Math.ceil(playersAmount / 2);
    // add fake player if players amount is odd
    if (!isEven) {
      players.push(null);
    }

    for (let round = 0; round < roundsAmount; round += 1) {
      for (let match = 0; match < matchesPerRound; match += 1) {
        if (!rounds[round]) {
          rounds[round] = {
            id: String(round + 1),
            status: RoundStatus.NOT_STARTED,
            matches: [],
          };
        }

        rounds[round].matches.push({
          id: uuidv4(),
          games: null,
          players: [
            players[match],
            players[players.length - 1 - match],
          ],
        });
      }
      const lastPlayer = players.pop();

      if (lastPlayer !== undefined) {
        players.splice(1, 0, lastPlayer);
      }
    }

    return rounds;
  }
}
