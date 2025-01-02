import { tournament1Mock } from "@/lib/api/mock";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";

export default function TournamentScreen() {
  const { id } = useLocalSearchParams();
  const [selectedRoundId, setSelectedRoundId] = useState(
    tournament1Mock.rounds[0].id
  );

  const selectedRound = tournament1Mock.rounds.find(
    (round) => round.id === selectedRoundId
  );

  return (
    <>
      <Stack.Screen options={{ title: `Tournament #${id}` }} />
      <View>
        <Text>Tournament {id}</Text>
        <Button title="Leaderboard" />
        <View style={{ flexDirection: "row" }}>
          {tournament1Mock.rounds.map((round, index) => (
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
                <Text>{game.court?.name}</Text>
                <View style={{ flexDirection: "row" }}>
                  <Text>
                    {game.team1.players.map(({ name }) => name).join(", ")}
                  </Text>
                  <TextInput defaultValue={game.score.team1.toString()} />
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text>
                    {game.team2.players.map(({ name }) => name).join(", ")}
                  </Text>
                  <TextInput defaultValue={game.score.team2.toString()} />
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </>
  );
}
