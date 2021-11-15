import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabsNavigator from "../BottomTabsNavigator";
import Auth from "../Auth";
import AddRecord from "../../screens/AddRecord";
import GlobalContext from "../globals/context";

export default function StackNavigator() {

    const Stack = createStackNavigator()

    const [token, setToken] = useState('');

    const isAuthenticated = () => token;

    return (
        <GlobalContext.Provider value={{ token, setToken }}>
            <Stack.Navigator initialRouteName={'Auth'} screenOptions={{ headerShown: false }}>
                {
                    (isAuthenticated())
                        ? (
                            <>
                                <Stack.Screen name={'Main'} component={BottomTabsNavigator} />
                                <Stack.Screen name={'Agregar registro'} component={AddRecord} options={{ headerShown: true, headerBackTitle: 'Volver' }} />
                            </>
                        )
                        : (
                            <Stack.Screen name={'Auth'} component={Auth} />
                        )
                }
            </Stack.Navigator>
        </GlobalContext.Provider>
    );
}
