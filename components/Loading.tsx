import LottieView from 'lottie-react-native';
import { View } from 'react-native';

export default function Loading() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#11100f',
      }}>
      <LottieView
        source={require('../assets/animations/loading.json')}
        autoPlay
        loop
        style={{ width: 150, height: 150 }}
      />
    </View>
  );
}
