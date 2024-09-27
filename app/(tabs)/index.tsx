import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

import RaceListItem from '~/components/RaceListItem';

export default function Home() {
  const [races, setRaces] = useState([]);

  const fetchRaces = async () => {
    try {
      const response = await fetch('https://ergast.com/api/f1/current.json');
      const data = await response.json();
      return data.MRData.RaceTable.Races; // List of races in current season
    } catch (error) {
      console.error('Error fetching races:', error);
    }
  };

  useEffect(() => {
    const loadRaces = async () => {
      const seasonRaces = await fetchRaces();
      setRaces(seasonRaces);
    };
    loadRaces();
  }, []);

  return (
    <View className="flex-1 bg-[#11100f]">
      <Stack.Screen options={{ title: 'Racing' }} />
      <FlatList
        contentContainerClassName="gap-3 p-5 rounded"
        data={races}
        renderItem={({ item }) => <RaceListItem item={item} />}
      />
      <View />
    </View>
  );
}
