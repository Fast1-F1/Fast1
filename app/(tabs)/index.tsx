import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { View } from 'react-native';

import TopDrivers from '~/components/TopDrivers';
import UpcomingRace from '~/components/UpcomingRace';
import { supabase } from '~/utils/supabase';

export default function LandingPage() {
  return (
    <View className="flex-1 bg-[#11100f]">
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
      <TopDrivers />
    </View>
  );
}
