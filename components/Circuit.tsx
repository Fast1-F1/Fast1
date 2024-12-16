import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import Loading from './Loading';

export default function Circuit({ circuitId }: { circuitId: string }) {
  const [circuit, setCircuit] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchCircuit = async () => {
    try {
      const response = await fetch('https://ergast.com/api/f1/current/circuits.json');
      const data = await response.json();
      const circuitData = data.MRData.CircuitTable.Circuits.find(
        (item: any) => item.circuitId === circuitId
      );
      setCircuit(circuitData);
    } catch (error) {
      console.log('Error while fetching circuit data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCircuit();
  }, [circuitId]);

  if (loading) {
    return <Loading />;
  }

  if (!circuit) {
    return <Text className="font-semibold text-red-500">No circuit data found!</Text>;
  }

  const { lat, long } = circuit.Location;

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: parseFloat(lat),
        longitude: parseFloat(long),
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}>
      <Marker coordinate={{ latitude: parseFloat(lat), longitude: parseFloat(long) }} />
    </MapView>
  );
}
