import { FontAwesome5 } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { View, Text } from 'react-native';

import { Race } from '~/types/types';

export default function RaceListItem({ item }: { item: Race }) {
  const currentDay = new Date();
  const raceDate = new Date(item.date);

  const raceCompleted = currentDay > raceDate;

  return (
    <View className="flex-row items-center gap-3 rounded-lg bg-[#2a2a2a] p-2">
      <View className=" w-[75px] items-center gap-1">
        <Text className="text-white">{dayjs(item.date).format('DD')}</Text>
        <Text className="rounded-full bg-gray-900 font-bold uppercase text-white">
          {dayjs(item.date).format('MMM')}
        </Text>
      </View>
      <View className="h-full border" />
      <View className="flex-1 gap-2 p-1">
        <Text className="text-white">Round {item.round}</Text>
        <Text className="text-lg font-bold text-white">{item.raceName}</Text>
        <Text className="text-lg text-gray-200">{item.Circuit.Location.country}</Text>
      </View>
      {raceCompleted ? (
        <FontAwesome5 className="p-3" name="flag-checkered" size={20} color="green" />
      ) : (
        <FontAwesome5 className="p-3" name="flag-checkered" size={20} color="red" />
      )}
    </View>
  );
}
