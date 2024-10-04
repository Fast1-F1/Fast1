import { Stack, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, View, Text } from 'react-native';

import RaceResultsItem from '~/components/RaceResultsItem';

export default function RaceResultPage() {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { round } = useLocalSearchParams();

  useEffect(() => {
    const fetchRaceResults = async () => {
      try {
        const response = await fetch(`https://ergast.com/api/f1/current/${round}/results.json`);
        const data = await response.json();
        const race = data.MRData.RaceTable.Races[0];

        if (race && race.Results && race.Results.length > 0) {
          setResults(race.Results);
          setErrorMessage(null);
        } else {
          setErrorMessage('This race has not occurred yet. Please check back later.');
        }
      } catch (error) {
        setErrorMessage('An error occurred while fetching the race results.');
      }
    };

    fetchRaceResults();
  }, [round]);

  return (
    <View className="flex-1 bg-[#11100f]">
      <Stack.Screen
        options={{
          title: 'Race Result',
          headerStyle: { backgroundColor: '#FF1E00' },
          headerTitleStyle: { color: 'white', fontWeight: 'bold', fontSize: 20 },
          headerBackTitleVisible: false,
          headerTintColor: 'white',
        }}
      />
      {errorMessage ? (
        <View style={{ padding: 20 }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>{errorMessage}</Text>
        </View>
      ) : (
        <FlatList data={results} renderItem={({ item }) => <RaceResultsItem item={item} />} />
      )}

      <StatusBar style="light" />
    </View>
  );
}
