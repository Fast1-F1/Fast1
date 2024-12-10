import { FlashList } from '@shopify/flash-list';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

import ConstructorListItem from '~/components/ConstructorListItem';
import Loading from '~/components/Loading';
import { ConstructorStanding } from '~/types/types';

export default function ConstructorStandings() {
  const [constructors, setConstructors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchConstructorStandings = async () => {
      const response = await fetch('https://ergast.com/api/f1/current/constructorStandings.json');
      const data = await response.json();
      setConstructors(data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
      setLoading(false);
    };
    fetchConstructorStandings();
  }, []);

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: 'Constructors Standings' }} />
        <Loading />
      </>
    );
  }

  return (
    <View className="flex-1 bg-[#11100f]">
      <StatusBar style="light" />
      <Stack.Screen options={{ title: 'Constructors Standings' }} />
      <FlashList
        data={constructors}
        keyExtractor={(item: ConstructorStanding) => item.Constructor.name}
        renderItem={({ item }) => <ConstructorListItem item={item} />}
        estimatedItemSize={200}
      />
      <View />
    </View>
  );
}
