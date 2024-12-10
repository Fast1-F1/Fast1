import { FlashList } from '@shopify/flash-list';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

import DriverListItem from '~/components/DriverListItem';
import Loading from '~/components/Loading';
import { DriverStanding } from '~/types/types';

export default function DriverStandings() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchDriverStandings = async () => {
      const response = await fetch('https://ergast.com/api/f1/current/driverStandings.json');
      const data = await response.json();
      setDrivers(data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
      setLoading(false);
    };
    fetchDriverStandings();
  }, []);

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: 'Driver Standings' }} />
        <Loading />
      </>
    );
  }

  return (
    <View className="flex-1 bg-[#11100f]">
      <StatusBar style="light" />
      <Stack.Screen options={{ title: 'Drivers Standings' }} />
      <FlashList
        data={drivers}
        keyExtractor={(item: DriverStanding) => item.Driver.familyName}
        renderItem={({ item }) => <DriverListItem item={item} />}
        estimatedItemSize={200}
      />
      <View />
    </View>
  );
}
