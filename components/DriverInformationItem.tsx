import { View, Text, Image } from 'react-native';

import { DriverInformation } from '~/types/types';

export default function DriverInformationItem({
  driverInformation,
}: {
  driverInformation: DriverInformation;
}) {
  return (
    <View className="border-b-hairline flex-1 flex-row items-center gap-2 border-gray-400 p-1">
      <Image source={{ uri: driverInformation.headshot_url }} style={{ width: 50, height: 50 }} />
      <View
        style={{
          borderColor: `#${driverInformation.team_colour}`,
          borderWidth: 1,
          height: 40,
          margin: 2,
        }}
      />
      <Text className="w-[50px] font-bold text-white">{driverInformation.name_acronym}</Text>
      <Text className="w-[130px] text-sm font-bold text-white">{driverInformation.full_name}</Text>
      <Text className="w-[120px] flex-1 text-white">{driverInformation.country_code}</Text>
      <Text className="pr-2 text-white">{driverInformation.team_name}</Text>
    </View>
  );
}
