import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import { Alert } from 'react-native';

export default function NotificationHandler() {
  useEffect(() => {
    const requestPermissions = async () => {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        Alert.alert('Permission not granted!', 'Please enable notifications in settings.');
        return;
      }

      //Optional token generate
      const token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
    };
    requestPermissions();
  }, []);
  return null;
}
