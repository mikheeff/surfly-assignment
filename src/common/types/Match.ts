import { Game } from '@/common/types/Game';

export interface Match {
  id: string;
  players: [string | null, string | null];
  games: [Game] | [Game, Game] | [Game, Game, Game] | null;
}
