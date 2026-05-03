import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />

      <Stack.Screen
        name="details"
        options={{
          title: "Details",
          // This will hide the back button text and only show the back arrow
          headerBackButtonDisplayMode: "minimal",
          presentation: "formSheet", // This will make the details screen appear as a modal on top of the index screen
          sheetAllowedDetents: [0.3, 0.5, 0.7],
          sheetGrabberVisible: true,
          headerShown: false, // This will hide the header of the details screen

        }}
      />
    </Stack>
  );
}
