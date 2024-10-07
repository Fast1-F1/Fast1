import { WebView } from 'react-native-webview';

export default function SocialFeed() {
  return <WebView className="flex-1" source={{ uri: 'https://x.com/F1' }} />;
}
