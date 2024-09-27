import dayjs from 'dayjs';
import { View, Text } from 'react-native';

export default function RaceListItem({ item }) {
  return (
    <View className="flex-row items-center gap-3 rounded-lg bg-[#2a2a2a] p-2">
      <View className="items-center gap-1">
        <Text className="text-white">{dayjs(item.date).format('DD')}</Text>
        <Text className="font-bold uppercase text-white">{dayjs(item.date).format('MMM')}</Text>
      </View>
      <View className="h-full border" />
      <View className="gap-1">
        <Text className="text-white">Round {item.round}</Text>
        <Text className="text-lg font-bold text-white">{item.raceName}</Text>
        <Text className="text-lg text-gray-200">{item.Circuit.Location.country}</Text>
      </View>
    </View>
  );
}
