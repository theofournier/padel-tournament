import { Tournament, TournamentType } from "./types";

const playerT = { id: "T", name: "T" };
const playerH = { id: "H", name: "H" };
const playerE = { id: "E", name: "E" };
const playerO = { id: "O", name: "O" };
const playerEl = { id: "E", name: "E" };
const playerL = { id: "L", name: "L" };
const playerS = { id: "S", name: "S" };
const playerA = { id: "A", name: "A" };

const court1 = { id: "1", name: "Court 1" };
const court2 = { id: "2", name: "Court 2" };

export const tournament1Mock: Tournament = {
  id: "1",
  name: "Tournament 1",
  type: TournamentType.AMERICANO,
  createdAt: new Date("2024-12-14"),
  players: [
    playerT,
    playerH,
    playerE,
    playerO,
    playerEl,
    playerL,
    playerS,
    playerA,
  ],
  points: 24,
  courts: [court1, court2],
  rounds: [
    {
      id: "1",
      order: 0,
      games: [
        {
          id: "1",
          court: court1,
          team1: { id: "1", players: [playerT, playerH] },
          team2: { id: "2", players: [playerE, playerO] },
          score: {
            team1: 10,
            team2: 14,
          },
        },
        {
          id: "2",
          court: court2,
          team1: { id: "1", players: [playerEl, playerL] },
          team2: { id: "2", players: [playerS, playerA] },
          score: {
            team1: 10,
            team2: 14,
          },
        },
      ],
    },
    {
      id: "2",
      order: 1,
      games: [
        {
          id: "1",
          court: court1,
          team1: { id: "1", players: [playerT, playerE] },
          team2: { id: "2", players: [playerH, playerO] },
          score: {
            team1: 10,
            team2: 14,
          },
        },
        {
          id: "2",
          court: court2,
          team1: { id: "1", players: [playerEl, playerS] },
          team2: { id: "2", players: [playerL, playerA] },
          score: {
            team1: 10,
            team2: 14,
          },
        },
      ],
    },
  ],
};
