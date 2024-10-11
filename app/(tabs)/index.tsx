import { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';

import UpcomingRace from '~/components/UpcomingRace';

export default function LandingPage() {
  return (
    <View className="flex-1 bg-[#11100f]">
      <UpcomingRace />
    </View>
  );
}
