import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "./HomeScreen";
import TaskCreateScreen from "./TaskCreateScreen";
import TaskEditScreen from "./TaskEditScreen";
import screens from "../assets/constants/screens";

const Stack = createNativeStackNavigator();

const Screens = (): JSX.Element => {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName={screens.HOME}
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name={screens.HOME} component={HomeScreen} />
                <Stack.Screen name={screens.TASK_CREATE} component={TaskCreateScreen} />
                <Stack.Screen name={screens.TASK_EDIT} component={TaskEditScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Screens;
