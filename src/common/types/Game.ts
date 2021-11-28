export interface Score {
  player: string;
  score: number;
}

export interface Game {
  id: string;
  winner: string | null;
  scores: [Score, Score]
}
