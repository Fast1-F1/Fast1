import { useState } from 'react';
import { View, Text } from 'react-native';

import { Circuit } from '~/types/types';

export default function CircuitScreen() {
  const [circuits, setCircuit] = useState<Circuit[]>([]);

  return (
    <View className="flex-1 bg-[#11100f]">
      <Text>Circuit Page</Text>
    </View>
  );
}
