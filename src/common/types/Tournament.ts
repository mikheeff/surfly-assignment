import TournamentStatus from '@/common/types/TournamentStatus';
import { Round } from '@/common/types/Round';

export interface Tournament {
  id: string;
  rounds: Round[];
  players: string[];
  date: string;
  status: TournamentStatus;
}
