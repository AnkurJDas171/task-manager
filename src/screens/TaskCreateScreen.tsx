import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Easing, StyleSheet, View } from "react-native"

import DropDown from "../components/DropDown";
import EditCardTitle from "../components/Card/EditCardTitle";
import EditCardDescription from "../components/Card/EditCardDescription";
import CancelButton from "../components/Button/CancelButton";
import SaveButton from "../components/Button/SaveButton";
import { TaskCreateScreenProps } from "./types";
import useStore from "../store";
import { localStorage } from "../localStorage";
import storeageKey from "../assets/constants/localStorageKeys";
import colors from "../assets/constants/colors";
import useKeyboardVisible from "../components/hooks/useKeyboardVisible";

const { height } = Dimensions.get("window");

const TaskCreateScreen = ({ navigation }: TaskCreateScreenProps): JSX.Element => {
    const positionAnim = useRef(new Animated.Value(0)).current;
    const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false);
    const {
        listData,
        taskTitle,
        taskDescription,
        taskStatus,
        setTaskTitle,
        setTaskDescription,
        setTaskStatus,
        setIsErrorInEditTitle,
        setIsErrorInEditDescription,
        setIsErrorInStatusDropDown
    } = useStore();

    const handleMissingEntry = () => {
        if(!taskTitle) setIsErrorInEditTitle(true);
        if(!taskDescription) setIsErrorInEditDescription(true);
        if(!taskStatus) setIsErrorInStatusDropDown(true);
    }

    const clearEntries = () =>{
        setTaskTitle("");
        setTaskDescription("");
        setTaskStatus("");
        setIsErrorInEditTitle(false);
        setIsErrorInEditDescription(false);
        setIsErrorInStatusDropDown(false);
    } 

    const handleCancelPress = () => {
        clearEntries()
        navigation.goBack();
    }

    const handleSavePressed = (): void => {
        if(!taskTitle || !taskDescription || !taskStatus) {
            handleMissingEntry();
            return;
        }

        const id = `${Date.now()}`;
        const listCopy = [...listData]
        listCopy.push({
            id,
            title: taskTitle,
            description: taskDescription,
            status: taskStatus
        });

        localStorage.set(storeageKey.LIST, JSON.stringify(listCopy));
        clearEntries();
        navigation.goBack();
    }

    useEffect(() => {
        Animated.timing(positionAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
            easing: Easing.elastic(1)
        }).start();
    }, [positionAnim])

    useKeyboardVisible(setIsKeyboardVisible);

    const bottomPosition = positionAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-100, height / 3.5]
    })

    return (
        <View style={styles.body}>
            <Animated.View 
                style={[
                    styles.container, 
                    {bottom: bottomPosition},
                    isKeyboardVisible && { bottom: 0 }
                ]}
            >
                <EditCardTitle />
                <DropDown />
                <EditCardDescription />
                <View style={styles.buttonContainer}>
                    <CancelButton hadleCancel={handleCancelPress} />
                    <SaveButton handleSave={handleSavePressed} />
                </View>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.PRIMARY
    },
    container: {
        width: '90%',
        backgroundColor: colors.CARD_BACKGROUND,
        paddingHorizontal: 20,
        paddingVertical: 30,
        position: "absolute",
        borderRadius: 10,
        shadowColor: '#171717',
        shadowOffset: { width: 2, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5
    },
    buttonContainer: {
        marginTop: 20,
        width: "100%",
        flexDirection: 'row',
        justifyContent: "space-around"
    }
})

export default TaskCreateScreen;
