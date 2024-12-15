import { Stack, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import WebView from 'react-native-webview';

export default function DriverWiki() {
  const { url } = useLocalSearchParams<string | any>();
  return (
    <View className="flex-1 bg-[#11100f]">
      <Stack.Screen
        options={{
          title: 'Driver Wiki',
          headerBackTitle: 'Back',
          headerStyle: { backgroundColor: '#FF1E00' },
          headerTintColor: 'white',
        }}
      />
      <WebView source={{ uri: url }} style={{ flex: 1 }} />
    </View>
  );
}
