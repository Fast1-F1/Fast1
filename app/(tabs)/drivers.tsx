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
      const response = await fetch('https://api.openf1.org/v1/drivers');
      const data = await response.json();
      const uniqueFullNames = new Set();
      const filteredDrivers = data.filter((driver: any) => {
        const fullName = driver.full_name;
        if (uniqueFullNames.has(fullName)) {
          return false;
        }
        uniqueFullNames.add(fullName);
        return true;
      });
      setDrivers(filteredDrivers);
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
        contentContainerClassName="p-2"
        data={drivers}
        keyExtractor={(item) => item.full_name}
        estimatedItemSize={25}
        scrollEnabled
        renderItem={({ item }) => <DriverInformationItem driverInformation={item} />}
      />
    </View>
  );
}
