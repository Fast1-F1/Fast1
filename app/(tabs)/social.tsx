import LottieView from 'lottie-react-native';
import { useState } from 'react';
import { View, Animated } from 'react-native';
import { WebView } from 'react-native-webview';

export default function SocialFeed() {
  const [loading, setLoading] = useState(true);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const twitterAccount = 'F1';

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin:0;padding:0;">
        <a class="twitter-timeline" data-theme="dark" data-chrome="noheader nofooter noborders" href="https://twitter.com/${twitterAccount}">
          Tweets by ${twitterAccount}
        </a> 
        <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
      </body>
    </html>
  `;

  const handleLoadEnd = () => {
    setLoading(false);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={{ flex: 1 }}>
      {loading && (
        <LottieView
          source={require('../../assets/animations/loading.json')}
          autoPlay
          loop
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 150,
            height: 150,
            marginLeft: -75,
            marginTop: -75,
          }}
        />
      )}
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <WebView
          source={{ html: htmlContent }}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={handleLoadEnd}
        />
      </Animated.View>
    </View>
  );
}
