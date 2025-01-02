import { router, useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

export default function CreateScreen() {
  const router = useRouter();
  const [players, setPlayers] = useState<string[]>(["", "", "", ""]);
  const [courts, setCourts] = useState<string[]>(["Court 1"]);

  return (
    <View>
      <Text>Name</Text>
      <TextInput />
      <Text>Points</Text>
      <TextInput />
      <Text>Players</Text>
      {players.map((player) => (
        <TextInput value={player} />
      ))}
      <Button title="Add player" />
      <Text>Courts</Text>
      {courts.map((court) => (
        <TextInput value={court} />
      ))}
      <Button title="Add court" />
      <Button
        title="Create Americano"
        onPress={() => {
          router.replace({
            pathname: "/tournaments/[id]",
            params: { id: "1" },
          });
        }}
      />
    </View>
  );
}
