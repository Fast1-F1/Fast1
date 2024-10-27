import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';

import { QualifyingResults } from '~/types/types';

export default function QualifyingResultsItem({ item }: { item: QualifyingResults }) {
  return (
    <View className="p-2">
      <View className="flex-row items-center gap-3 rounded bg-[#2a2a2a] p-3">
        <Text className="w-10 pl-2 font-semibold text-white">{item.position}</Text>
        <View className="flex-1">
          <Text className="text-lg font-bold text-white">
            {item.Driver.givenName} {item.Driver.familyName}
          </Text>
          <Text className="text-md text-white">{item.Constructor.name}</Text>
        </View>
        <View>
          {item.Q3 && <Text className="text-md font-semibold text-red-500">Q3: {item.Q3}</Text>}
          {item.Q2 && <Text className="text-md font-semibold text-blue-500">Q2: {item.Q2}</Text>}
          {item.Q1 && <Text className="text-md font-semibold text-yellow-500">Q1: {item.Q1}</Text>}
        </View>
      </View>
      <StatusBar style="light" />
    </View>
  );
}
