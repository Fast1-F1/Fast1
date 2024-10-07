import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

export default function Circuit() {
  const { round } = useLocalSearchParams();

  return (
    <View>
      <Text>Circuit Details</Text>
    </View>
  );
}
