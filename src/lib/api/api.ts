import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";
import {
  Court,
  Game,
  Player,
  Round,
  Tournament,
  TournamentType,
} from "./types";
import { tournament1Mock } from "./mock";

const TOURNAMENTS_IDS_STORAGE_KEY = "padel-tournaments-ids";
const TOURNAMENT_STORAGE_KEY = (id: string) => `padel-tournament-${id}`;

const getTournamentsIds = async (): Promise<string[]> => {
  try {
    const value = await AsyncStorage.getItem(TOURNAMENTS_IDS_STORAGE_KEY);
    if (value) {
      const tournamentsIds: string[] = JSON.parse(value);
      return tournamentsIds;
    }
  } catch (e) {
    console.log(e);
  }
  return [];
};

export const getTournaments = async (): Promise<Tournament[]> => {
  const tournamentsIds = await getTournamentsIds();
  const tournaments: Tournament[] = [];
  for (const id of tournamentsIds) {
    const tournament = await getTournament(id);
    if (tournament) {
      tournaments.push(tournament);
    }
  }
  return tournaments;
};

export const getTournament = async (id: string): Promise<Tournament | null> => {
  try {
    const tValue = await AsyncStorage.getItem(TOURNAMENT_STORAGE_KEY(id));
    if (tValue) {
      const tournament: Tournament = JSON.parse(tValue);
      return tournament;
    }
  } catch (e) {
    console.log(e);
  }
  return null;
};

interface GenerateRoundsData {
  type: TournamentType;
  players: Player[];
  courts: Court[];
}
const generateRounds = (data: GenerateRoundsData): Round[] => {
  return tournament1Mock.rounds;
};

interface CreateTournamentData {
  name: string;
  type: TournamentType;
  points: number;
  players: Player[];
  courts: Court[];
}
export const createTournament = async (
  data: CreateTournamentData
): Promise<Tournament | null> => {
  try {
    const id = uuidv4();
    const tournament: Tournament = {
      id,
      name: data.name,
      type: data.type,
      points: data.points,
      players: data.players,
      courts: data.courts,
      rounds: generateRounds(data),
      createdAt: new Date(),
    };
    const tournamentsIds = await getTournamentsIds();
    await AsyncStorage.setItem(
      TOURNAMENTS_IDS_STORAGE_KEY,
      JSON.stringify([...tournamentsIds, id])
    );
    await AsyncStorage.setItem(
      TOURNAMENT_STORAGE_KEY(id),
      JSON.stringify(tournament)
    );
    return tournament;
  } catch (e) {
    console.log(e);
  }
  return null;
};

interface UpdateTournamentData {
  id: string;
  name?: string;
}
export const updateTournament = async (
  data: UpdateTournamentData
): Promise<Tournament | null> => {
  const tournament = await getTournament(data.id);

  if (tournament) {
    try {
      const updatedTournament = {
        ...tournament,
        name: data.name ?? tournament.name,
      };
      await AsyncStorage.setItem(
        TOURNAMENT_STORAGE_KEY(tournament.id),
        JSON.stringify(tournament)
      );
      return updatedTournament;
    } catch (e) {
      console.log(e);
    }
  }

  return null;
};

export const deleteTournament = async (id: string): Promise<void> => {
  try {
    const tournamentsIds = await getTournamentsIds();
    if (tournamentsIds.includes(id)) {
      delete tournamentsIds[tournamentsIds.indexOf(id)];
      await AsyncStorage.setItem(
        TOURNAMENTS_IDS_STORAGE_KEY,
        JSON.stringify(tournamentsIds)
      );
    }
    await AsyncStorage.removeItem(TOURNAMENT_STORAGE_KEY(id));
  } catch (e) {
    console.log(e);
  }
};

export const updateGameScore = async (data: {
  tournamentId: string;
  roundId: string;
  gameId: string;
  score: { team1?: number; team2?: number };
}): Promise<Tournament | null> => {
  const tournament = await getTournament(data.tournamentId);
  if (tournament) {
    const roundIndex = tournament.rounds.findIndex(
      ({ id }) => id === data.roundId
    );
    if (roundIndex <= -1) {
      return null;
    }
    const round = tournament.rounds[roundIndex];
    const gameIndex = round.games.findIndex(({ id }) => id === data.gameId);
    if (gameIndex <= -1) {
      return null;
    }
    const game = round.games[gameIndex];
    round.games[gameIndex] = {
      ...game,
      score: {
        team1: data.score.team1 ?? game.score.team1,
        team2: data.score.team2 ?? game.score.team2,
      },
    };

    try {
      await AsyncStorage.setItem(
        TOURNAMENT_STORAGE_KEY(tournament.id),
        JSON.stringify(tournament)
      );
      return tournament;
    } catch (e) {
      console.log(e);
    }
  }
  return null;
};
