import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { View, Text, ScrollView } from 'react-native';

import TopDrivers from '~/components/TopDrivers';
import TopTeams from '~/components/TopTeams';
import UpcomingRace from '~/components/UpcomingRace';
import { supabase } from '~/utils/supabase';

export default function LandingPage() {
  return (
    <ScrollView className="flex-1 bg-[#11100f]">
      <Text className="mt-2 p-2 text-3xl font-extrabold text-red-600">
        Welcome to <Text className="text-white">Fast 1</Text> !
      </Text>
      <Tabs.Screen
        options={{
          headerRight: () => (
            <FontAwesome
              onPress={() => supabase.auth.signOut()}
              className="p-2"
              name="sign-out"
              color="white"
              size={24}
            />
          ),
        }}
      />
      <UpcomingRace />
      <Text className="p-2 text-3xl font-bold text-white">Championship</Text>
      <View className="m-2 flex-row justify-between border border-gray-400 p-2">
        <TopDrivers />
        <TopTeams />
      </View>
    </ScrollView>
  );
}
