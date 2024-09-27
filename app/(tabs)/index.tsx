import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function Home() {
  return (
    <View className="flex-1 bg-[#212121]">
      <Stack.Screen options={{ title: 'Racing' }} />
      <View />
    </View>
  );
}
