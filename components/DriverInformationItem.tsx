import { View, Text } from 'react-native';

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
      <Text className="w-[120px] text-white">{driverInformation.nationality}</Text>
      <Text className="text-white">{driverInformation.dateOfBirth}</Text>
    </View>
  );
}
