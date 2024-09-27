import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

export default function Home() {
  return (
    <View className="flex-1 bg-[#11100f]">
      <StatusBar style="light" />
      <Stack.Screen options={{ title: 'Standings' }} />
      <View />
    </View>
  );
}
