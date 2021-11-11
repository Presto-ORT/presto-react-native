import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabsNavigator from "../BottomTabsNavigator";
import Auth from "../Auth";

export default function StackNavigator() {

    const Stack = createStackNavigator()

    return (
        <Stack.Navigator initialRouteName={'Auth'} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={'Auth'} component={Auth} />
            <Stack.Screen name={'Main'} component={BottomTabsNavigator} />
        </Stack.Navigator>
    );
}
