import { View, Text } from 'react-native';

import { Driver } from '~/types/types';

export default function DriverListItem({ item }: { item: Driver }) {
  return (
    <View className="m-2 flex-row items-center  gap-3 bg-[#2a2a2a] p-3">
      <Text className="mr-8 w-10 text-lg text-white">{item.position}</Text>
      <Text className="flex-1  text-lg font-bold text-white">
        {item.Driver.givenName} {item.Driver.familyName}
      </Text>
      <Text className="pl-10 text-lg text-white">{item.points} Pts</Text>
    </View>
  );
}
