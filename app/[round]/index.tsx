import { Stack, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, View, Text, ActivityIndicator, ScrollView } from 'react-native';

import QualifyingResultsItem from '~/components/QualifyingResultsItem';
import RaceResultsItem from '~/components/RaceResultsItem';
import { RaceResults, QualifyingResults } from '~/types/types';

export default function RaceResultPage() {
  const [results, setResults] = useState([]);
  const [qualifyingResults, setQualifyingResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { round } = useLocalSearchParams();

  useEffect(() => {
    const fetchRaceData = async () => {
      try {
        setLoading(true);

        // Fetch race results
        const raceResponse = await fetch(`https://ergast.com/api/f1/current/${round}/results.json`);
        const raceData = await raceResponse.json();
        const race = raceData.MRData.RaceTable.Races[0];

        if (race && race.Results && race.Results.length > 0) {
          setResults(race.Results);
        } else {
          setErrorMessage('This race has not occurred yet. Please check back later.');
        }

        // Fetch qualifying results
        const qualifyingResponse = await fetch(
          `https://ergast.com/api/f1/current/${round}/qualifying.json`
        );
        const qualifyingData = await qualifyingResponse.json();
        const qualifying = qualifyingData.MRData.RaceTable.Races[0];

        if (qualifying && qualifying.QualifyingResults && qualifying.QualifyingResults.length > 0) {
          setQualifyingResults(qualifying.QualifyingResults);
        } else {
          setErrorMessage('No qualifying data available for this race.');
        }
      } catch (error) {
        setErrorMessage('An error occurred while fetching the data.');
        console.log(error);
      }
      setLoading(false);
    };

    fetchRaceData();
  }, [round]);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView className="flex-1 bg-[#11100f]">
      <Stack.Screen
        options={{
          title: 'Race and Qualifying Result',
          headerStyle: { backgroundColor: '#FF1E00' },
          headerTitleStyle: { color: 'white', fontWeight: 'bold', fontSize: 20 },
          headerTintColor: 'white',
          headerBackTitle: 'Back',
        }}
      />
      {errorMessage ? (
        <View style={{ padding: 20 }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>{errorMessage}</Text>
        </View>
      ) : (
        <>
          <Text className="p-2 text-xl font-bold text-white">Race Results</Text>
          <FlatList
            data={results}
            keyExtractor={(item: RaceResults) => item.Driver.familyName}
            renderItem={({ item }) => <RaceResultsItem item={item} />}
            scrollEnabled={false}
          />

          <Text className="p-2 text-xl font-bold text-white">Qualifying Results</Text>
          <FlatList
            data={qualifyingResults}
            keyExtractor={(item: QualifyingResults) => item.Driver.familyName}
            renderItem={({ item }) => <QualifyingResultsItem item={item} />}
            scrollEnabled={false}
          />
        </>
      )}

      <StatusBar style="light" />
    </ScrollView>
  );
}
