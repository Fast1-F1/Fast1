import { router, Stack } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  View,
  TextInput,
  Pressable,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

// @ts-ignore
import bg from '~/assets/bg.jpg';
import { supabase } from '~/utils/supabase';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handlePasswordChange = (value: string) => {
    setConfirmPassword(value);
    setPasswordMismatch(value !== password);
  };

  async function signUpWithEmail() {
    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    setLoading(true);
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      style={{ flex: 1 }}>
      <ImageBackground source={bg} resizeMode="cover" className="h-full w-full">
        <View className="mb-20 mt-3 items-center p-3">
          <Text className="mb-5 text-3xl font-bold text-white">Welcome</Text>
        </View>
        <View className="flex-1 gap-2 p-3">
          <Stack.Screen
            options={{
              title: 'Register',
              headerStyle: { backgroundColor: '#FF1E00' },
              headerTitleStyle: { color: 'white', fontWeight: 'bold', fontSize: 20 },
              headerTintColor: 'white',
              headerBackVisible: false,
            }}
          />
          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
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
            <View className="p-2">
              <Text className="text-xl font-bold text-yellow-300">Confirm Password</Text>
              <TextInput
                className="rounded border border-gray-600 bg-gray-200 p-4"
                onChangeText={handlePasswordChange}
                value={confirmPassword}
                secureTextEntry
                placeholder="******"
                autoCapitalize="none"
                placeholderTextColor="black"
              />
            </View>
            {passwordMismatch && (
              <Text className=" pl-4 text-lg font-bold text-red-600">Passwords don't match</Text>
            )}
            <View className="mt-5 gap-3 p-2">
              <Pressable
                className="items-center p-3"
                onPress={() => {
                  router.push('/(auth)/login');
                }}>
                <Text className="text-xl font-bold text-white">
                  Already have an account? Sign In
                </Text>
              </Pressable>
              <Pressable
                className="items-center rounded-lg bg-[#FF1E00] p-3 shadow-md shadow-black"
                disabled={loading}
                onPress={signUpWithEmail}>
                <Text className="text-lg font-bold text-white shadow-lg shadow-black">Sign Up</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}
