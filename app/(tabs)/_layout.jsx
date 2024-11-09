import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {Colors} from './../../constants/Colors'

export default function TabLayout() {
  return (
   //Tab is used for routing
   <Tabs 
   screenOptions={{
    headerShown:false,
    tabBarActiveTintColor:Colors.PRIMARY
  }}
   >
      <Tabs.Screen name='home' 
      options={{
        tabBarLabel:'Home',
        tabBarIcon:({color})=><Ionicons name="home" size={24} color={color} />
      }} />

      <Tabs.Screen name='profile' 
      options={{
        tabBarLabel:'Profile',
        tabBarIcon:({color})=><Ionicons name="person" size={24} color={color} />
      }}/>

      <Tabs.Screen name='settings' 
      options={{
        tabBarLabel:'Settings',
        tabBarIcon:({color})=><MaterialIcons name="settings" size={24} color={color} />
      }}/>
   </Tabs>
  )
}