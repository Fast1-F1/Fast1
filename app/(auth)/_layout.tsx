import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#FF1E00' },
        headerTitleStyle: { color: 'white', fontWeight: 'bold', fontSize: 20 },
        headerTintColor: 'white',
        headerBackTitle: 'Back',
      }}
    />
  );
}
