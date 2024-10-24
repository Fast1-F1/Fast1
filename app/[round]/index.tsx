import { FlashList } from '@shopify/flash-list';
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
  const [raceErrorMessage, setRaceErrorMessage] = useState<string | null>(null);
  const [qualifyingErrorMessage, setQualifyingErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { round } = useLocalSearchParams();

  useEffect(() => {
    const fetchRaceResults = async () => {
      try {
        const response = await fetch(`https://ergast.com/api/f1/current/${round}/results.json`);
        const data = await response.json();
        const race = data.MRData.RaceTable.Races[0];

        if (race && race.Results && race.Results.length > 0) {
          setResults(race.Results);
          setRaceErrorMessage(null);
        } else {
          setRaceErrorMessage('This race has not occurred yet. Please check back later.');
        }
      } catch (error) {
        setRaceErrorMessage('An error occurred while fetching the race results.');
        console.error(error);
      }
    };

    const fetchQualifyingResults = async () => {
      try {
        const response = await fetch(`https://ergast.com/api/f1/current/${round}/qualifying.json`);
        const data = await response.json();
        const qualifying = data.MRData.RaceTable.Races[0];

        if (qualifying && qualifying.QualifyingResults && qualifying.QualifyingResults.length > 0) {
          setQualifyingResults(qualifying.QualifyingResults);
          setQualifyingErrorMessage(null);
        } else {
          setQualifyingErrorMessage('No qualifying data available for this race.');
        }
      } catch (error) {
        setQualifyingErrorMessage('An error occurred while fetching the qualifying results.');
        console.error(error);
      }
    };

    // Fetch both race results and qualifying results
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchRaceResults(), fetchQualifyingResults()]);
      setLoading(false);
    };

    fetchData();
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
      {raceErrorMessage ? (
        <View style={{ padding: 20 }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>{raceErrorMessage}</Text>
        </View>
      ) : (
        <>
          <Text className="p-2 text-xl font-bold text-white">Race Results</Text>
          <FlashList
            data={results}
            keyExtractor={(item: RaceResults) => item.Driver.familyName}
            renderItem={({ item }) => <RaceResultsItem item={item} />}
            scrollEnabled={false}
            estimatedItemSize={200}
          />
        </>
      )}

      {qualifyingErrorMessage ? (
        <View style={{ padding: 20 }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>{qualifyingErrorMessage}</Text>
        </View>
      ) : (
        <>
          <Text className="p-2 text-xl font-bold text-white">Qualifying Results</Text>
          <FlashList
            data={qualifyingResults}
            keyExtractor={(item: QualifyingResults) => item.Driver.familyName}
            renderItem={({ item }) => <QualifyingResultsItem item={item} />}
            scrollEnabled={false}
            estimatedItemSize={200}
          />
        </>
      )}

      <StatusBar style="light" />
    </ScrollView>
  );
}
