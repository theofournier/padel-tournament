import { Link } from "expo-router";
import { View, Text } from "react-native";

export default function HomeScreen() {
  return (
    <View>
      <Text>Home page</Text>
      <Link href="/tournaments/create">Create tournament</Link>
      <Link href="/tournaments">Tournaments list</Link>
      <Link href="/tournaments/1">Tournament 1</Link>
    </View>
  );
}
