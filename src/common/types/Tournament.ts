import { Match } from '@/common/types/Match';

export interface Tournament {
  id: string;
  games: Match[] | null;
  date: string;
}
