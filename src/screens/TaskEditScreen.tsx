import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

import EditCardTitle from "../components/Card/EditCardTitle";
import DropDown from "../components/DropDown";
import EditCardDescription from "../components/Card/EditCardDescription";
import CancelButton from "../components/Button/CancelButton";
import SaveButton from "../components/Button/SaveButton";
import { TaskEditScreenProps } from "./types";
import useStore from "../store";
import { localStorage } from "../localStorage";
import storeageKey from "../assets/constants/localStorageKeys";

const TaskEditScreen = ({ navigation }: TaskEditScreenProps): JSX.Element => {
    const {
        selectedCardId,
        listData,
        taskTitle,
        taskDescription,
        taskStatus,
        isEditPageLoading,
        setTaskTitle,
        setTaskDescription,
        setTaskStatus,
        setIsEditPageLoading
    } = useStore();

    const handleCancelPress = () => {
        setTaskTitle("");
        setTaskDescription("");
        setTaskStatus("");

        navigation.goBack();
    }

    const handleSavePressed = () => {
        const listCopy = [...listData]
        listCopy.forEach(item => {
            if (item.id === selectedCardId) {
                item.title = taskTitle;
                item.description = taskDescription;
                item.status = taskStatus;
            }
        })

        console.log( JSON.stringify(listCopy))

        // localStorage.set(storeageKey.LIST, JSON.stringify(listCopy));
        // navigation.goBack();
    }

    useEffect(()=>{
        if(listData.length > 0){
            const item = listData.find(item => item.id === selectedCardId);

            setTaskTitle(item?.title as string);
            setTaskDescription(item?.description as string);
            setTaskStatus(item?.status as string)

            setIsEditPageLoading(false);
        }
    },[])

    if(isEditPageLoading) return <></>

    return (
        <View style={styles.body}>
            <View style={styles.container}>
                <EditCardTitle prevTitle={taskTitle}/>
                <DropDown defaultValue={taskStatus}/>
                <EditCardDescription prevDescription={taskDescription}/>
                <View style={styles.buttonContainer}>
                    <CancelButton hadleCancel={handleCancelPress} />
                    <SaveButton handleSave={handleSavePressed} />
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
        shadowOffset: { width: -2, height: 4 },
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

export default TaskEditScreen;
