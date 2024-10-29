import { router, Stack } from 'expo-router';
import React, { useState } from 'react';
import { Alert, View, TextInput, Pressable, Text, ImageBackground } from 'react-native';

import bg from '~/assets/bg.jpg';
import { supabase } from '~/utils/supabase';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      Alert.alert(error.message);
    } else {
      Alert.alert('Account created successfully! You can now log in.');
      router.push('/login');
    }
    setLoading(false);
  }

  return (
    <ImageBackground source={bg} resizeMode="cover" className="h-full w-full">
      <View className="mb-20 mt-3 items-center p-3">
        <Text className="text-4xl font-bold text-red-600">Create an account</Text>
      </View>
      <View className="flex-1 gap-2 p-3">
        <Stack.Screen
          options={{
            title: 'Register',
            headerStyle: { backgroundColor: '#FF1E00' },
            headerTitleStyle: { color: 'white', fontWeight: 'bold', fontSize: 20 },
            headerTintColor: 'white',
            headerBackTitle: 'Back',
          }}
        />
        <View className="p-2">
          <Text className="text-xl font-bold text-yellow-300">Email</Text>
          <TextInput
            className="rounded border border-gray-600 bg-white p-4"
            onChangeText={setEmail}
            value={email}
            placeholder="email@address.com"
            autoCapitalize="none"
          />
        </View>
        <View className="p-2">
          <Text className="text-xl font-bold text-yellow-300">Password</Text>
          <TextInput
            className="rounded border border-gray-600 bg-white p-4"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
            placeholder="******"
            autoCapitalize="none"
          />
        </View>
        <View className="flex-1" />
        <View className="mb-5 mt-5 gap-3 p-2">
          <Pressable
            className="items-center p-3"
            onPress={() => {
              router.push('/(auth)/login');
            }}>
            <Text className="text-xl font-bold text-white">Already have an account? Sign In</Text>
          </Pressable>
          <Pressable
            className="items-center rounded-lg bg-[#FF1E00] p-3 shadow-md shadow-black"
            disabled={loading}
            onPress={signUpWithEmail}>
            <Text className="text-lg font-bold text-white">Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}
