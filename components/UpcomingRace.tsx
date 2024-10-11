import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

type Circuit = {
  circuitId: string;
  circuitName: string;
  Location: {
    locality: string;
    country: string;
  };
};

type Race = {
  raceName: string;
  Circuit: Circuit;
  date: string;
  time: string;
};

type NextRace = Race | null;

export default function UpcomingRace() {
  const [races, setRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState(false);
  const [nextRace, setNextRace] = useState<NextRace | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchRaces = async () => {
      try {
        const response = await fetch('https://ergast.com/api/f1/current.json');
        const data = await response.json();
        const fetchedRaces = data.MRData.RaceTable.Races;
        setRaces(fetchedRaces);

        // Find the next race after setting the state
        const upcomingRace = fetchedRaces.find(
          (race) => new Date(`${race.date}T${race.time}`) > new Date()
        );
        setNextRace(upcomingRace);
      } catch (error) {
        console.error('Error fetching races:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRaces();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View className="p-2">
      <Text className="text-3xl font-bold text-yellow-300 ">Upcoming Race</Text>
      {nextRace ? (
        <View>
          <Text className="text-lg font-semibold text-white">{nextRace.raceName}</Text>
          <Text className="text-sm text-white">{nextRace.Circuit.circuitName}</Text>
          <Text className="text-sm text-white">
            {new Date(`${nextRace.date}T${nextRace.time}`).toLocaleString()}
          </Text>
        </View>
      ) : (
        <Text className="text-sm text-gray-500">No upcoming race available</Text>
      )}
    </View>
  );
}
