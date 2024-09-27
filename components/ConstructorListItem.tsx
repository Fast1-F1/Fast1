import { View, Text } from 'react-native';

export default function ConstrutorListItem({ item }) {
  return (
    <View className="m-2 flex-row  items-center gap-3 bg-[#2a2a2a] p-3">
      <Text className="mr-8 w-10 text-lg text-white">{item.position}</Text>
      <Text className="flex-1  text-lg font-bold text-white">{item.Constructor.name}</Text>
      <Text className="pl-10 text-lg text-white">{item.points} Pts</Text>
    </View>
  );
}
