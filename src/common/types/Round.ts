import RoundStatus from '@/common/types/RoundStatus';
import { Match } from '@/common/types/Match';

export interface Round {
  id: string;
  status: RoundStatus;
  matches: Match[];
}
