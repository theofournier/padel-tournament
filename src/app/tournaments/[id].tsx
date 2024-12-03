import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";

const tournament = {
  id: "1",
  name: "Tournament 1",
  players: ["T", "H", "E", "O", "E", "L", "S", "A"],
  points: 24,
  courts: ["1", "2"],
  rounds: [
    {
      id: "1",
      order: 0,
      games: [
        {
          id: "1",
          court: "1",
          teams: [
            { players: ["T", "H"], score: 0 },
            { players: ["E", "O"], score: 0 },
          ],
        },
        {
          id: "2",
          court: "2",
          teams: [
            { players: ["E", "L"], score: 0 },
            { players: ["S", "A"], score: 0 },
          ],
        },
      ],
    },
    {
      id: "2",
      order: 1,
      games: [
        {
          id: "1",
          court: "1",
          teams: [
            { players: ["T", "E"], score: 0 },
            { players: ["H", "O"], score: 0 },
          ],
        },
        {
          id: "2",
          court: "2",
          teams: [
            { players: ["E", "S"], score: 0 },
            { players: ["L", "A"], score: 0 },
          ],
        },
      ],
    },
  ],
};

export default function TournamentScreen() {
  const { id } = useLocalSearchParams();
  const [selectedRoundId, setSelectedRoundId] = useState(
    tournament.rounds[0].id
  );

  const selectedRound = tournament.rounds.find(
    (round) => round.id === selectedRoundId
  );

  return (
    <>
      <Stack.Screen options={{ title: `Tournament #${id}` }} />
      <View>
        <Text>Tournament {id}</Text>
        <Button title="Leaderboard" />
        <View style={{ flexDirection: "row" }}>
          {tournament.rounds.map((round, index) => (
            <Button
              title={index.toString()}
              onPress={() => setSelectedRoundId(round.id)}
            />
          ))}
        </View>
        {selectedRound && (
          <View>
            {selectedRound.games.map((game) => (
              <View>
                <Text>Court: {game.court}</Text>
                {game.teams.map((team) => (
                  <View style={{ flexDirection: "row" }}>
                    <Text>{team.players.join(", ")}</Text>
                    <TextInput value={team.score.toString()} />
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}
      </View>
    </>
  );
}
