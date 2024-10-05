import { View, Text } from 'react-native';

import { RaceResults } from '~/types/types';

export default function RaceResultsItem({ item }: { item: RaceResults }) {
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
        {item.Time && (
          <View className="p-1 pr-2">
            <Text className="text-lg text-green-400">{item.Time.time}</Text>
          </View>
        )}
        {!item.Time && (
          <View className="p-1 pr-2">
            <Text className="text-lg text-red-400">{item.status}</Text>
          </View>
        )}
      </View>
    </View>
  );
}
