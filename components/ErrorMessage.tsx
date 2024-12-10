import { View, Text } from 'react-native';

export default function ErrorMessage({ errorMessage }: { errorMessage: string }) {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ color: 'white', textAlign: 'center' }}>{errorMessage}</Text>
    </View>
  );
}
