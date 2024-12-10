import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

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
      <Text className="p-2 text-center text-2xl font-bold text-white">Drivers of the Season</Text>
    </View>
  );
}
