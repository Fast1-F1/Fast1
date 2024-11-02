import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import { Race } from '~/types/types';

type NextRace = Race | null;

export default function RaceSchedule() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        const upcomingRace = fetchedRaceSchedule.find(
          (race: { date: string; time: string }) =>
            new Date(`${race.date}T${race.time}`) > new Date()
        );
        setNextRace(upcomingRace);
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
      <Text className="mb-2 text-3xl font-bold text-white">Race Schedule</Text>
      <View className="bg-[#2a2a2a] p-2">
        <View className="gap-2">
          {nextRace?.FirstPractice?.time && (
            <Text className="text-lg font-semibold text-white">
              Free Practice 1 : {nextRace?.FirstPractice.date} - {nextRace?.FirstPractice?.time}
            </Text>
          )}
          {nextRace?.SecondPractice?.time && (
            <Text className="text-lg font-semibold text-white">
              Free Practice 2 : {nextRace?.SecondPractice.date} - {nextRace?.SecondPractice?.time}
            </Text>
          )}
          {nextRace?.ThirdPractice?.time && (
            <Text className="text-lg font-semibold text-white">
              Free Practice 2 : {nextRace?.ThirdPractice.date} - {nextRace?.ThirdPractice?.time}
            </Text>
          )}
          {nextRace?.Sprint?.time && (
            <Text className="text-lg font-semibold text-white">
              Sprint Race : {nextRace?.Sprint?.date} - {nextRace?.Sprint?.time}
            </Text>
          )}
          {nextRace?.Qualifying?.time && (
            <Text className="text-lg font-semibold text-white">
              Qualifying : {nextRace?.Qualifying?.date} - {nextRace?.Qualifying?.time}
            </Text>
          )}
          {nextRace?.time && (
            <Text className="text-lg font-semibold text-white">
              Race : {nextRace?.date} - {nextRace?.time}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}
