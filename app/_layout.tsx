import { Stack } from 'expo-router';

import AuthContextProvider from '~/context/AuthContext';
import '../global.css';
import { NotificationProvider } from '~/context/NotificationProvider';

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <NotificationProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>
      </NotificationProvider>
    </AuthContextProvider>
  );
}
