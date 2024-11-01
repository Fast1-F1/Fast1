import { View, Text } from 'react-native';

import { DriverStanding } from '~/types/types';

export default function DriverListItem({ item }: { item: DriverStanding }) {
  return (
    <View className="m-2 flex-row items-center  gap-3 bg-[#2a2a2a] p-3">
      <Text className="mr-8 w-10 text-lg text-white">{item.position}</Text>
      <View className="flex-1">
        <Text className="  text-lg font-bold text-white">
          {item.Driver.givenName} {item.Driver.familyName}
        </Text>
        <Text className="text-white">{item.Constructors[0]?.name}</Text>
      </View>
      <Text className="pl-10 text-lg text-white">{item.points} Pts</Text>
    </View>
  );
}
