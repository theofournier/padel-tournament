export interface Player {
  id: String;
  name: string;
  level?: number;
}

export interface Team {
  id: string;
  players: Player[];
}

export interface Court {
  id: string;
  name: string;
}

export interface Game {
  id: string;
  team1: Team;
  team2: Team;
  score: {
    team1: number;
    team2: number;
  };
  court?: Court;
}

export interface Round {
  id: string;
  order: number;
  games: Game[];
}

export enum TournamentType {
  AMERICANO = "AMERICANO",
  MEXICANO = "MEXICANO",
}

export interface Tournament {
  id: string;
  name: string;
  type: TournamentType;
  players: Player[];
  points: number;
  courts?: Court[];
  rounds: Round[];
  createdAt: Date;
}
