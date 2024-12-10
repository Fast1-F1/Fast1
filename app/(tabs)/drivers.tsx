import { FlashList } from '@shopify/flash-list';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

import DriverInformationItem from '~/components/DriverInformationItem';
import Loading from '~/components/Loading';
import { DriverInformation } from '~/types/types';

export default function DriversScreen() {
  const [drivers, setDrivers] = useState<DriverInformation[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchDriverInformation = async () => {
    try {
      const response = await fetch('https://ergast.com/api/f1/current/drivers.json');
      const data = await response.json();
      setDrivers(data.MRData.DriverTable.Drivers);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDriverInformation();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-[#11100f]">
      <FlashList
        contentContainerClassName="p-4"
        data={drivers}
        keyExtractor={(item) => item.driverId}
        estimatedItemSize={25}
        renderItem={({ item }) => <DriverInformationItem driverInformation={item} />}
      />
    </View>
  );
}
