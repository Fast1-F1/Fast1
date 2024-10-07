import { FontAwesome } from '@expo/vector-icons';
import { router, Tabs } from 'expo-router';
import { Button } from 'react-native';

export default function RaceLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: '#11100f' },
        tabBarActiveTintColor: 'white',
        tabBarIcon: () => null,
        tabBarLabelPosition: 'beside-icon',
        headerLeft: () => <Button title="Back" color="white" onPress={() => router.back()} />,
      }}>
      <Tabs.Screen
        name="circuit"
        options={{
          title: 'Circuit Details',
          headerStyle: { backgroundColor: '#FF1E00' },
          headerTitleStyle: { color: 'white', fontWeight: 'bold', fontSize: 20 },
          headerTintColor: 'white',
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Race Result',
          headerStyle: { backgroundColor: '#FF1E00' },
          headerTitleStyle: { color: 'white', fontWeight: 'bold', fontSize: 20 },
          headerTintColor: 'white',
        }}
      />
      <Tabs.Screen
        name="qualifying"
        options={{
          title: 'Qualifying',
          headerStyle: { backgroundColor: '#FF1E00' },
          headerTitleStyle: { color: 'white', fontWeight: 'bold', fontSize: 20 },
          headerTintColor: 'white',
        }}
      />
    </Tabs>
  );
}
