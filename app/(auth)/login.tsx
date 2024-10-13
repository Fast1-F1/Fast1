import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Alert, View, TextInput, Pressable, Text, ImageBackground } from 'react-native';

import bg from '~/assets/bg.jpg';
import { supabase } from '~/utils/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    if (!session) Alert.alert('Please check your inbox for email verification!');
    setLoading(false);
  }

  return (
    <ImageBackground source={bg} resizeMode="cover" className="h-full w-full">
      <View className="mb-20 mt-3 items-center p-3">
        <Text className="text-4xl font-bold text-red-600">
          Welcome to <Text className="text-white">Fast1</Text> !
        </Text>
      </View>
      <View className="flex-1 gap-2 p-3">
        <Stack.Screen
          options={{
            title: 'Authentication',
            headerStyle: { backgroundColor: '#FF1E00' },
            headerTitleStyle: { color: 'white', fontWeight: 'bold', fontSize: 20 },
            headerTintColor: 'white',
            headerBackTitle: 'Back',
          }}
        />
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
        <View className="p-2">
          <Text className="text-xl font-bold text-[#FFD700]">Password</Text>
          <TextInput
            className="rounded border border-gray-600 bg-white p-4"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
            placeholder="******"
            autoCapitalize="none"
          />
        </View>
        <View className="flex-1" />
        <View className="mb-5 mt-5 gap-3 p-2">
          <Pressable
            className="items-center rounded-lg border border-gray-400 bg-white p-3"
            disabled={loading}
            onPress={() => signInWithEmail()}>
            <Text className="text-lg font-bold text-[#ff1e00]">Sign In</Text>
          </Pressable>
          <Pressable
            className="items-center rounded-lg bg-[#FF1E00] p-3"
            disabled={loading}
            onPress={() => signUpWithEmail()}>
            <Text className="text-lg font-bold text-white">Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}
