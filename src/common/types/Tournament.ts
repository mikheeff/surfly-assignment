import { Match } from '@/common/types/Match';
import TournamentStatus from '@/common/types/TournamentStatus';

export interface Tournament {
  id: string;
  rounds: Match[][]
  players: string[];
  date: string;
  status: TournamentStatus;
}
