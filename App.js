import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BottomTabsNavigator from './components/BottomTabsNavigator';
import StackNavigator from "./components/StackNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
      {/* <BottomTabsNavigator /> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
