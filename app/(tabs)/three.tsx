import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

import ConstructorListItem from '~/components/ConstructorListItem';

export default function ConstructorStandings() {
  const [constructors, setConstructors] = useState([]);

  useEffect(() => {
    const fetchConstructorStandings = async () => {
      const response = await fetch('https://ergast.com/api/f1/current/constructorStandings.json');
      const data = await response.json();
      setConstructors(data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
    };
    fetchConstructorStandings();
  }, []);
  return (
    <View className="flex-1 bg-[#11100f]">
      <StatusBar style="light" />
      <Stack.Screen options={{ title: 'Constructors Standings' }} />
      <FlatList
        data={constructors}
        renderItem={({ item }) => <ConstructorListItem item={item} />}
      />
      <View />
    </View>
  );
}
