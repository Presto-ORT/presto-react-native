import React, { useContext } from 'react';
import { Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../screens/Home/Index.js';
import Diario from '../../screens/Diario/Index.js';
import Reportes from '../../screens/Reportes/Index.js';
import { Ionicons } from "@expo/vector-icons";
import GlobalContext from "../../components/globals/context";
import { removeToken } from "../../services/internalStorage";

export default function BottomTabsNavigator({ navigation }) {

    const Tabs = createBottomTabNavigator()
    const { setToken } = useContext(GlobalContext)

    const logout = async () => {
        await removeToken();
        setToken(null);
    }

    return (
        <Tabs.Navigator>
            <Tabs.Screen name={'Home'} component={Home} options={{
                headerTitleAlign: "center",
                headerLeft: () => <Button title={"Log out"} onPress={async () => { await logout() }} />,
                headerRight: () => <Button title={'+'} onPress={() => { navigation.navigate('Agregar registro') }} />,
                tabBarIcon: ({ tintColor }) => (
                    <Ionicons name="md-home" size={30} color="#900" />
                )
            }} />
            <Tabs.Screen name={'Diario'} component={Diario} options={{
                headerTitleAlign: "center",
                headerRight: () => <Button title={'+'} onPress={() => { navigation.navigate('Agregar registro') }} />,
                tabBarIcon: ({ tintColor }) => (
                    <Ionicons name="book" size={30} color="#900" />
                )
            }} />
            <Tabs.Screen name={'Reportes'} component={Reportes} options={{
                headerTitleAlign: "center",
                headerRight: () => <Button title={'+'} onPress={() => { navigation.navigate('Agregar registro') }} />,
                tabBarIcon: ({ tintColor }) => (
                    <Ionicons name="pie-chart-sharp" size={30} color="#900" />
                )
            }} />
        </Tabs.Navigator>
    );
}