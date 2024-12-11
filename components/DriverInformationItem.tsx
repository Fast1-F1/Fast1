import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { View, Text, Pressable } from 'react-native';

import { DriverInformation } from '~/types/types';

export default function DriverInformationItem({
  driverInformation,
}: {
  driverInformation: DriverInformation;
}) {
  return (
    <View className="flex-1 flex-row gap-4 p-1">
      <Text className="w-[50px] font-bold text-white">{driverInformation.code}</Text>
      <Text className="w-[120px] font-semibold text-white">
        {driverInformation.givenName} {driverInformation.familyName}
      </Text>
      <Text className="w-[30px] text-white">{driverInformation.permanentNumber}</Text>
      <Text className="w-[120px] text-white">{driverInformation.nationality}</Text>
      <Text className="text-white">{driverInformation.dateOfBirth}</Text>
      <Link href={`/${driverInformation.url}`} asChild>
        <Pressable>
          <FontAwesome name="arrow-circle-right" size={24} color="white" />
        </Pressable>
      </Link>
    </View>
  );
}
