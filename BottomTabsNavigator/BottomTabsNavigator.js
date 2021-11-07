import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/Index.js';
import Diario from '../screens/Diario/Index.js';
import Reportes from '../screens/Reportes/Index.js';
import { Ionicons } from "@expo/vector-icons";

export default function BottomTabsNavigator(){

    const Tabs = createBottomTabNavigator()

    return (
        <Tabs.Navigator>
            <Tabs.Screen name={'Home'} component={Home} options={{                    
                    tabBarIcon: ({ tintColor }) => (
                        <Ionicons name="md-home" size={30} color="#900" />
                      )}}/>
            <Tabs.Screen name={'Diario'} component={Diario} options={{                    
                    tabBarIcon: ({ tintColor }) => (
                        <Ionicons name="book" size={30} color="#900" />
                      )}}/>                   
            <Tabs.Screen name={'Reportes'} component={Reportes} options={{                    
                    tabBarIcon: ({ tintColor }) => (
                        <Ionicons name="pie-chart-sharp" size={30} color="#900" />
                      )}}/>            
        </Tabs.Navigator>
    );
}