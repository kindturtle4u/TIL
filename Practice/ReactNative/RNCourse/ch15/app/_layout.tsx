import { Stack } from "expo-router";
import * as Notifications from "expo-notifications";


export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
}
