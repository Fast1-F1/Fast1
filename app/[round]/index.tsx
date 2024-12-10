import { Stack, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';

import {
  fetchRaceResults,
  fetchSprintResults,
  fetchQualifyingResults,
} from '../../utils/fetchResults';

import Loading from '~/components/Loading';
import QualifyingResultsItem from '~/components/QualifyingResultsItem';
import RaceResultsItem from '~/components/RaceResultsItem';
import ResultsSection from '~/components/ResultsSection';
import SprintResultsItem from '~/components/SprintResultsItem';
import { RaceResults, QualifyingResults, SprintResult } from '~/types/types';

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

  if (loading) {
    return (
      <>
        <Stack.Screen
          options={{
            title: 'Race and Qualifying Result',
            headerStyle: { backgroundColor: '#FF1E00' },
            headerTitleStyle: { color: 'white', fontWeight: 'bold', fontSize: 20 },
            headerTintColor: 'white',
            headerBackTitle: 'Back',
          }}
        />
        <Loading />
      </>
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
      <ResultsSection
        title="Race Results"
        results={results}
        errorMessage={raceErrorMessage}
        renderItem={({ item }) => <RaceResultsItem item={item} />}
        keyExtractor={(item: RaceResults) => item.Driver.familyName}
      />
      <ResultsSection
        title="Sprint Race Results"
        results={sprintResults}
        errorMessage={sprintErrorMessage}
        renderItem={({ item }) => <SprintResultsItem item={item} />}
        keyExtractor={(item) => `${round}-${item.Driver.driverId}-${item.position}`}
      />
      <ResultsSection
        title="Qualifying Results"
        results={qualifyingResults}
        errorMessage={qualifyingErrorMessage}
        renderItem={({ item }) => <QualifyingResultsItem item={item} />}
        keyExtractor={(item: QualifyingResults) => item.Driver.familyName}
      />
      <StatusBar style="light" />
    </ScrollView>
  );
}
