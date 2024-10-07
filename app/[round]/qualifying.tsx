import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

export default function QualyScreen() {
  const { round } = useLocalSearchParams();
  return (
    <View>
      <Text>Qualy</Text>
    </View>
  );
}
