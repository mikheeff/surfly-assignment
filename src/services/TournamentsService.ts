import axios from 'axios';
import { Tournament } from '@/common/types/Tournament';

export default class TournamentsService {
  static async getTournaments(): Promise<Tournament[]> {
    const { data } = await axios.get<Tournament[]>('http://localhost:3000/tournaments');

    return data;
  }

  static async createTournament(tournament: Tournament): Promise<void> {
    await axios.post('http://localhost:3000/tournaments', tournament);
  }
}
