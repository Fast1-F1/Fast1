import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';

import RaceListItem from '~/components/RaceListItem';

export default function Home() {
  const [races, setRaces] = useState([]);

  useEffect(() => {
    const fetchRaces = async () => {
      const response = await fetch('https://ergast.com/api/f1/current.json');
      const data = await response.json();
      setRaces(data.MRData.RaceTable.Races);
    };

    fetchRaces();
  }, []);

  const handlePress = (race) => {
    router.push(`/${race.round}`);
  };

  return (
    <View className="flex-1 bg-[#11100f]">
      <Stack.Screen options={{ title: 'Racing' }} />
      <FlatList
        contentContainerClassName="gap-3 p-5 rounded"
        data={races}
        renderItem={({ item }) => (
          <Pressable onPress={() => handlePress(item)}>
            <RaceListItem item={item} />
          </Pressable>
        )}
      />
      <StatusBar style="light" />
      <View />
    </View>
  );
}
