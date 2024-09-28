import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

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
    <View>
      <Stack.Screen options={{ headerShown: false }} />
    </View>
  );
}
