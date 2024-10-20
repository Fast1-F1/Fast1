import { FlashList } from '@shopify/flash-list';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';

import RaceListItem from '~/components/RaceListItem';
import { Race } from '~/types/types';

export default function Home() {
  const [races, setRaces] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchRaces = async () => {
      const response = await fetch('https://ergast.com/api/f1/current.json');
      const data = await response.json();
      setRaces(data.MRData.RaceTable.Races);
      setLoading(false);
    };

    fetchRaces();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }
  const handlePress = (race: Race) => {
    router.push(`/${race.round}`);
  };

  return (
    <View className="flex-1 bg-[#11100f]">
      <Stack.Screen options={{ title: 'Racing' }} />
      <FlashList
        contentContainerStyle={{ padding: 10 }}
        keyExtractor={(item: Race) => item.round}
        data={races}
        estimatedItemSize={200}
        renderItem={({ item }) => (
          <Pressable className="p-1" onPress={() => handlePress(item)}>
            <RaceListItem item={item} />
          </Pressable>
        )}
      />
      <StatusBar style="light" />
      <View />
    </View>
  );
}
