import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import WebView from 'react-native-webview';

export default function DriverWiki() {
  const { url } = useLocalSearchParams<string | any>();
  return (
    <View>
      <WebView source={{ uri: url }} style={{ flex: 1 }} />
    </View>
  );
}
