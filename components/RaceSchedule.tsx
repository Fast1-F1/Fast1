import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import { Race } from '~/types/types';

type NextRace = Race | null;

export default function RaceSchedule() {
  const [schedule, setSchedule] = useState<Race[]>([]);
  const [nextRace, setNextRace] = useState<NextRace | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRaceSchedule = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://ergast.com/api/f1/current.json');
        const data = await response.json();
        const fetchedRaceSchedule = data.MRData.RaceTable.Races;
        setSchedule(fetchedRaceSchedule);
      } catch (error) {
        console.log('An error occured while fetching data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRaceSchedule();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View className="flex-1 p-4">
      <Text className="text-3xl font-bold text-white">Race Schedule</Text>
      <View>
        <Text>{}</Text>
      </View>
    </View>
  );
}
