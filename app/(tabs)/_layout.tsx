import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarActiveBackgroundColor: '#420d0c',
        tabBarStyle: { backgroundColor: '#2a2a2a' },
        headerStyle: { backgroundColor: '#2a2a2a' },
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
          title: 'Standings',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="racing-helmet" size={30} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
