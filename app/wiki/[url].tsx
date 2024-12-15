import { Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Animated, View, Alert, Text } from 'react-native';
import WebView from 'react-native-webview';

import Loading from '~/components/Loading';

export default function DriverWiki() {
  const [loading, setLoading] = useState(true);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const { url } = useLocalSearchParams<string | any>();

  const handleLoadEnd = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setLoading(false);
  };

  if (!url) {
    Alert.alert('Error', 'The URL is missing or invalid.');
    return null;
  }

  return (
    <View className="flex-1 bg-[#11100f]">
      {/* Header */}
      <Stack.Screen
        options={{
          title: 'Driver Wiki',
          headerBackTitle: 'Back',
          headerStyle: { backgroundColor: '#FF1E00' },
          headerTintColor: 'white',
        }}
      />

      {/* Conditional rendering for Loading or WebView */}
      {loading && (
        <View className="flex-1">
          <Loading />
        </View>
      )}

      <Animated.View
        className="absolute bottom-0 left-0 right-0 top-0"
        style={{ opacity: fadeAnim }}>
        <WebView
          source={{ uri: decodeURIComponent(url) }}
          onLoadEnd={handleLoadEnd}
          startInLoadingState={false}
          renderError={() => (
            <View className="flex-1 items-center justify-center bg-[#11100f]">
              <Text className="text-white">Failed to load page.</Text>
            </View>
          )}
        />
      </Animated.View>
    </View>
  );
}
