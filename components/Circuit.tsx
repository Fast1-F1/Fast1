import MapView, { Marker } from 'react-native-maps';

export default function Circuit({ longitude, latitude }: { longitude: string; latitude: string }) {
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}>
      <Marker coordinate={{ latitude: parseFloat(latitude), longitude: parseFloat(longitude) }} />
    </MapView>
  );
}
