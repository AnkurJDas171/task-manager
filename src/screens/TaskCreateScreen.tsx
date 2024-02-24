import React from "react";
import { StyleSheet, View } from "react-native"

import DropDown from "../components/DropDown";
import EditCardTitle from "../components/Card/EditCardTitle";
import EditCardDescription from "../components/Card/EditCardDescription";
import CancelButton from "../components/Button/CancelButton";
import SaveButton from "../components/Button/SaveButton";
import { TaskCreateScreenProps } from "./types";
import useStore from "../store";
import { localStorage } from "../localStorage";
import storeageKey from "../assets/constants/localStorageKeys";

const TaskCreateScreen = ({navigation}: TaskCreateScreenProps): JSX.Element => {
    const {
        listData, 
        taskTitle, 
        taskDescription, 
        taskStatus, 
        setTaskTitle, 
        setTaskDescription, 
        setTaskStatus
    } = useStore();

    const handleCancelPress = () => {
        setTaskTitle("");
        setTaskDescription("");
        setTaskStatus("");

        navigation.goBack();
    }

    const handleSavePressed = () => {
        console.log("Save Pressed");
        
        const id = `${Date.now()}`;
        const listCopy = [...listData]
        listCopy.push({
            id,
            title: taskTitle,
            description: taskDescription,
            status: taskStatus
        });

        localStorage.set(storeageKey.LIST, JSON.stringify(listCopy));
        navigation.goBack();
    }

    return (
        <View style={styles.body}>
            <View style={styles.container}>
                <EditCardTitle />
                <DropDown />
                <EditCardDescription />
                <View style={styles.buttonContainer}>
                    <CancelButton hadleCancel={handleCancelPress}/>
                    <SaveButton handleSave={handleSavePressed}/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    container: {
        width: '90%',
        backgroundColor: "#ffffff",
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 10,
        shadowColor: '#171717',
        shadowOffset: {width: 2, height: 5},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    buttonContainer: {
        marginTop: 20,
        width: "100%",
        flexDirection: 'row',
        justifyContent: "space-around"
    }
})

export default TaskCreateScreen;
