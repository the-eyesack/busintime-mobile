import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import {MaterialCommunityIcons} from '@expo/vector-icons';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Route Lookup',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name='bus' color={color} />
          ),
        }}
      />
        <Tabs.Screen
            name="stopLookup"
            options={{
                title: 'Stop Lookup',
                tabBarIcon: ({ color, focused }) => (
                    <MaterialCommunityIcons size={28} name='bus-stop' color={color} />
                ),
            }}
        />
    </Tabs>
  );
}
