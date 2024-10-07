import { Feather, FontAwesome5, MaterialCommunityIcons, FontAwesome6 } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';

import { useAuth } from '~/context/AuthContext';

export default function TabLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarActiveBackgroundColor: '#FF1E00',
        tabBarStyle: { backgroundColor: '#2a2a2a' },
        headerStyle: { backgroundColor: '#FF1E00' },
        tabBarShowLabel: false,
        headerTitleStyle: { color: 'white', fontWeight: 'bold', fontSize: 20 },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Races',
          tabBarIcon: ({ color }) => <FontAwesome5 name="flag-checkered" size={30} color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Driver Standings',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="racing-helmet" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          title: 'Constructor Standings',
          tabBarIcon: ({ color }) => <Feather name="bar-chart-2" size={30} color={color} />,
        }}
      />
      <Tabs.Screen
        name="social"
        options={{
          title: 'Social Media',
          tabBarIcon: ({ color }) => <FontAwesome6 name="x-twitter" size={30} color={color} />,
        }}
      />
    </Tabs>
  );
}
