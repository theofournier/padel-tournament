import { Link } from "expo-router";
import { View, Text, Button } from "react-native";

export default function HomeScreen() {
  return (
    <View>
      <Text>Home page</Text>
      <Link href="/create">Create tournament</Link>
      <Text>Tournaments</Text>
      <Link href="/tournaments/1">Tournament 1</Link>
    </View>
  );
}
