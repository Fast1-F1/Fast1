import { router, Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  View,
  TextInput,
  Pressable,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

//@ts-ignore
import bg from '../../assets/bg.jpg';

import { useAuth } from '~/context/AuthContext';
import { supabase } from '~/utils/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user]);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
    router.push('/');
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
      <ImageBackground source={bg} resizeMode="cover" className="h-full w-full">
        <View className="mb-20 mt-5 items-center p-3">
          <Text className="mb-5 text-3xl font-bold text-white">Welcome!</Text>
        </View>
        <View className="flex-1 gap-2 p-3">
          <Stack.Screen
            options={{
              title: 'Login',
              headerStyle: { backgroundColor: '#FF1E00' },
              headerTitleStyle: { color: 'white', fontWeight: 'bold', fontSize: 20 },
              headerTintColor: 'white',
              headerBackTitle: 'Back',
              headerBackVisible: false,
            }}
          />
          <View className="p-2">
            <Text className="text-xl font-bold text-yellow-300">Email</Text>
            <TextInput
              className="rounded border border-gray-600 bg-gray-200 p-4"
              onChangeText={setEmail}
              value={email}
              placeholder="email@address.com"
              autoCapitalize="none"
              keyboardType="email-address"
              placeholderTextColor="black"
            />
          </View>
          <View className="p-2">
            <Text className="text-xl font-bold text-yellow-300">Password</Text>
            <TextInput
              className="rounded border border-gray-600 bg-gray-200 p-4"
              onChangeText={setPassword}
              value={password}
              secureTextEntry
              placeholder="******"
              autoCapitalize="none"
              placeholderTextColor="black"
            />
          </View>
          <View className="mb-5 mt-5 gap-3 p-2">
            <Pressable
              className="items-center p-3"
              onPress={() => {
                router.push('/(auth)/register');
              }}>
              <Text className="text-xl font-bold text-white shadow-lg shadow-black">
                Don't have an account? Sign Up
              </Text>
            </Pressable>
            <Pressable
              className="items-center rounded-lg bg-[#ff1e00] p-3 shadow-md shadow-black"
              disabled={loading}
              onPress={signInWithEmail}>
              <Text className="text-xl font-bold text-white">Sign In</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}
