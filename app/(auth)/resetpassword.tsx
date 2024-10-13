import { Stack } from 'expo-router';
import { useState } from 'react';
import { View, ImageBackground, Text, TextInput, Pressable } from 'react-native';

import bg from '~/assets/bg.jpg';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  return (
    <ImageBackground source={bg} resizeMode="cover" className="h-full w-full">
      <View className="mb-20 mt-3 items-center p-3">
        <Text className="text-4xl font-bold text-red-600">Reset your password!</Text>
      </View>
      <View className=" flex-1">
        <Stack.Screen options={{ title: 'Reset Password' }} />
        <View className="p-2">
          <Text className="text-xl font-bold text-[#FFD700]">Email</Text>
          <TextInput
            className="rounded border border-gray-600 bg-white p-4"
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize="none"
          />
        </View>
        <Pressable className="m-2 rounded-lg bg-gray-400 p-2">
          <Text className="">Send link</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}
