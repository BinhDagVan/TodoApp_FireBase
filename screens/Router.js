import 'react-native-gesture-handler';
import React from 'react';
import { useMyContextController } from '../store';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Login from './Login';
import Customer from './Customer';
import Admin from './Admin';
import COLORS from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome5'
import Register from './Register';
import Setting from './Setting';
import AddNewService from './AddnewServices';
import UpdateService from './UpdateServices';
import DetailService from './Details';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const AdminScreens = () => {
    return (
        <Stack.Navigator
           
            screenOptions={{
                headerTintColor: 'white',
                headerStyle: { backgroundColor: COLORS.blue },
                headerTitleAlign: 'center',
                
            }}
        >
            <Stack.Screen name="Home" component={Admin} options={{ headerShown: false }} />
            <Stack.Screen name="UpdateService" component={UpdateService}  />
            <Stack.Screen name="ServiceDetail" component={DetailService} />
            <Stack.Screen name="AddNewService" component={AddNewService} />
        </Stack.Navigator>
    );
}

const CustomerScreens = () => {
    return (
        <Stack.Navigator
            
            screenOptions={{
                headerTintColor: 'white',
                headerStyle: { backgroundColor: COLORS.blue },
                headerTitleAlign: 'center',
            }}
        >
            <Stack.Screen name="CustomerScreen" component={Customer} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}


const SettingScreens = () => {
    return (
        <Stack.Navigator
            
            screenOptions={{
                headerTintColor: 'white',
                headerStyle: { backgroundColor: COLORS.pink },
                
            }}
        >
            <Stack.Screen name="SettingScreen" component={Setting} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

const Router = () => {
    const [controller] = useMyContextController();
    const { userLogin } = controller;

    return (
        <>
            {userLogin ? (
                <Tab.Navigator
                    initialRouteName="Home"
                    screenOptions={{
                        tabBarActiveTintColor: COLORS.pink,
                        headerShown: false,
                        tabBarShowLabel: true
                    }}
                >
                    {userLogin.role === 'admin' ? (
                        <>
                            <Tab.Screen
                                name="Admin"
                                component={AdminScreens}
                                options={{
                                    tabBarIcon: ({ color, size }) => (
                                        <Icon name="home" color={color} size={size} />
                                    ),
                                    title: "Home"
                                }}
                            />
                            <Tab.Screen
                                name="Transaction"
                                component={AddNewService}
                                options={{
                                    tabBarIcon: ({ color, size }) => (
                                        <Icon name="money-bill" color={color} size={size} />
                                    ),
                                    title: 'Transaction'
                                }}
                            />
                            <Tab.Screen
                                name="Customer"
                                component={CustomerScreens}
                                options={{
                                    tabBarIcon: ({ color, size }) => (
                                        <Icon name="users" color={color} size={size} />
                                    ),
                                    title: 'Customer'
                                }}
                            />
                            <Tab.Screen
                                name="Setting"
                                component={SettingScreens}
                                options={{
                                    tabBarIcon: ({ color, size }) => (
                                        <Icon name="cog" color={color} size={size} />
                                    ),
                                    title: 'Setting'
                                }}
                            />
                        </>
                    ) : (
                        <>
                            <Tab.Screen
                                name="Home"
                                component={AdminScreens}
                                options={{
                                    tabBarIcon: ({ color, size }) => (
                                        <Icon name="home" color={color} size={size} />
                                    ),
                                    title: "Home"
                                }}
                            />
                            <Tab.Screen
                                name="Setting"
                                component={SettingScreens}
                                options={{
                                    tabBarIcon: ({ color, size }) => (
                                        <Icon name="cog" color={color} size={size} />
                                    ),
                                    title: 'Setting'
                                }}
                            />
                        </>
                    )}
                </Tab.Navigator>
            ) : (
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen name="Register" component={Register} />
                </Stack.Navigator>
            )}
        </>
    );
}
export default Router;