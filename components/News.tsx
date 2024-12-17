import { View, Text, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
export default function News() {
  const { height, width } = Dimensions.get('window');

  const injectedJavaScript = `
    // Remove unwanted elements like header, footer, and ads
    const removeElements = () => {
      const header = document.querySelector('header');
      const footer = document.querySelector('footer');
      const ads = document.querySelectorAll('iframe, .ad, [id*="ad"]');
      
      if (header) header.remove();
      if (footer) footer.remove();
      ads.forEach(ad => ad.remove());
    };

    // Apply dark mode CSS
    const applyDarkMode = () => {
      const css = \`
        body {
          background-color: #121212 !important;
          color: #ffffff !important;
        }
        a, h1, h2, h3, h4, h5, h6, p, span {
          color: #e0e0e0 !important;
        }
        img {
          filter: brightness(0.8) contrast(1.2);
        }
      \`;
      const style = document.createElement('style');
      style.type = 'text/css';
      style.appendChild(document.createTextNode(css));
      document.head.appendChild(style);
    };

    // Execute functions after page load
    removeElements();
    applyDarkMode();
  `;

  return (
    <View className="flex-1">
      <Text className="p-4 text-3xl font-bold text-white">Latest F1 News</Text>
      <WebView
        source={{ uri: 'https://www.motorsport.com/f1/news/' }}
        style={{ width, height }}
        injectedJavaScript={injectedJavaScript}
      />
    </View>
  );
}
