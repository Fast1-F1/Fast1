import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FlashList } from '@shopify/flash-list';
import { Stack, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import LottieView from 'lottie-react-native';
import { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';

import {
  fetchRaceResults,
  fetchSprintResults,
  fetchQualifyingResults,
} from '../../utils/fetchResults';

import QualifyingResultsItem from '~/components/QualifyingResultsItem';
import RaceResultsItem from '~/components/RaceResultsItem';
import SprintResultsItem from '~/components/SprintResultsItem';
import { RaceResults, QualifyingResults, SprintResult } from '~/types/types';

const Tab = createMaterialTopTabNavigator();

export default function RaceResultPage() {
  const [results, setResults] = useState<RaceResults[]>([]);
  const [qualifyingResults, setQualifyingResults] = useState<QualifyingResults[]>([]);
  const [sprintResults, setSprintResults] = useState<SprintResult[]>([]);
  const [raceErrorMessage, setRaceErrorMessage] = useState<string | undefined>(undefined);
  const [sprintErrorMessage, setSprintErrorMessage] = useState<string | undefined>(undefined);
  const [qualifyingErrorMessage, setQualifyingErrorMessage] = useState<string | undefined>(
    undefined
  );

  const [loading, setLoading] = useState(true);
  const { round } = useLocalSearchParams<{ round?: string }>();

  useEffect(() => {
    const fetchData = async () => {
      if (!round) {
        setLoading(false);
        return;
      }
      setLoading(true);

      try {
        const raceData = await fetchRaceResults(round);
        if (raceData.results.length > 0) {
          setResults(raceData.results);
          setRaceErrorMessage(undefined);
        } else {
          setRaceErrorMessage(raceData.errorMessage);
        }

        const sprintData = await fetchSprintResults(round);
        if (sprintData.results.length > 0) {
          setSprintResults(sprintData.results);
          setSprintErrorMessage(undefined);
        } else {
          setSprintErrorMessage(sprintData.errorMessage);
        }

        const qualifyingData = await fetchQualifyingResults(round);
        if (qualifyingData.results.length > 0) {
          setQualifyingResults(qualifyingData.results);
          setQualifyingErrorMessage(undefined);
        } else {
          setQualifyingErrorMessage(qualifyingData.errorMessage);
        }
      } catch (error) {
        setRaceErrorMessage('An error occurred while fetching the race results.');
        setSprintErrorMessage('An error occurred while fetching the sprint race results.');
        setQualifyingErrorMessage('An error occurred while fetching the qualifying results.');
        console.error(error);
      }

      setLoading(false);
    };

    fetchData();
  }, [round]);

  const RaceResultsTab = (results: RaceResults, errorMessage: string | null) => {};
  const SprintResultsTab = (results: SprintResult, errorMessage: string | null) => {};
  const QualifyingResultsTab = (results: QualifyingResults, errorMessage: string | null) => {};

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#11100f',
        }}>
        <Stack.Screen
          options={{
            title: 'Race and Qualifying Result',
            headerStyle: { backgroundColor: '#FF1E00' },
            headerTitleStyle: { color: 'white', fontWeight: 'bold', fontSize: 20 },
            headerTintColor: 'white',
            headerBackTitle: 'Back',
          }}
        />
        <LottieView
          source={require('../../assets/animations/loading.json')}
          autoPlay
          loop
          style={{ width: 150, height: 150 }}
        />
      </View>
    );
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

      {sprintErrorMessage ? (
        <View style={{ padding: 20 }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>{sprintErrorMessage}</Text>
        </View>
      ) : (
        <>
          <Text className="p-2 text-xl font-bold text-white">Sprint Race Results</Text>
          <FlashList
            data={sprintResults}
            keyExtractor={(item) => `${round}-${item.Driver.driverId}-${item.position}`}
            renderItem={({ item }) => <SprintResultsItem item={item} />}
            estimatedItemSize={30}
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
