import { View, Text, Pressable } from 'react-native';

import { DriverInformation } from '~/types/types';

export default function DriverInformationItem({
  driverInformation,
}: {
  driverInformation: DriverInformation;
}) {
  return (
    <View className="flex-1 flex-row gap-4 p-1">
      <Text className="font-bold text-white">{driverInformation.code}</Text>
      <Text className="font-semibold text-white">
        {driverInformation.givenName} {driverInformation.familyName}
      </Text>
      <Text className="text-white">{driverInformation.permanentNumber}</Text>
      <Text className="text-white">{driverInformation.nationality}</Text>
      <Text className="text-white">{driverInformation.dateOfBirth}</Text>
      <Pressable>
        <Text className="text-white">{driverInformation.url}</Text>
      </Pressable>
    </View>
  );
}
