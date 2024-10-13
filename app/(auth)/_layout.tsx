import { Redirect, Stack } from 'expo-router';

import { useAuth } from '~/context/AuthContext';

export default function AuthLayout() {
  const { user } = useAuth();
  if (user) {
    return <Redirect href="/" />;
  }
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
