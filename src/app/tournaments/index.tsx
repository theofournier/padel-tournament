import { Link } from "expo-router";
import { View, Text } from "react-native";

export default function TournamentsScreen() {
  return (
    <View>
      <Text>Tournaments page</Text>
      <Link href="/tournaments/1">Tournament 1</Link>
    </View>
  );
}
