import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

import RaceResultsItem from '~/components/RaceResultsItem';

export default function RaceResultPage() {
  const [results, setResults] = useState([]);
  const { round } = useLocalSearchParams();

  useEffect(() => {
    const fetchRaceResults = async () => {
      const response = await fetch(`https://ergast.com/api/f1/current/${round}/results.json`);
      const data = await response.json();
      setResults(data.MRData.RaceTable.Races[0].Results);
    };

    fetchRaceResults();
  }, [round]);

  return (
    <View className="flex-1 bg-[#11100f]">
      <Stack.Screen
        options={{
          title: 'Race Result',
          headerStyle: { backgroundColor: '#420d0c' },
          headerTitleStyle: { color: 'white', fontWeight: 'bold', fontSize: 20 },
        }}
      />
      <FlatList data={results} renderItem={({ item }) => <RaceResultsItem item={item} />} />
    </View>
  );
}
