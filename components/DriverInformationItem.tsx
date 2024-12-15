import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { View, Text, Pressable } from 'react-native';

import { DriverInformation } from '~/types/types';

export default function DriverInformationItem({
  driverInformation,
}: {
  driverInformation: DriverInformation;
}) {
  return (
    <View className="border-b-hairline flex-1 flex-row gap-2 border-gray-400 p-1">
      <Text className="w-[50px] font-bold text-white">{driverInformation.code}</Text>
      <Text className="w-[130px] font-bold text-white">
        {driverInformation.givenName} {driverInformation.familyName}
      </Text>
      <Text className="w-[120px] flex-1 text-white">{driverInformation.nationality}</Text>
      <Text className="pr-2 text-white">{driverInformation.dateOfBirth}</Text>
      <Pressable onPress={() => router.push(`/wiki/${encodeURIComponent(driverInformation.url)}`)}>
        <FontAwesome name="arrow-right" size={20} color="white" />
      </Pressable>
    </View>
  );
}
