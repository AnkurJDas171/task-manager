import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Easing, StyleSheet, TouchableOpacity, View } from "react-native";

import EditCardTitle from "../components/Card/EditCardTitle";
import DropDown from "../components/DropDown";
import EditCardDescription from "../components/Card/EditCardDescription";
import CancelButton from "../components/Button/CancelButton";
import SaveButton from "../components/Button/SaveButton";
import { TaskEditScreenProps } from "./types";
import useStore from "../store";
import { localStorage } from "../localStorage";
import storeageKey from "../assets/constants/localStorageKeys";
import colors from "../assets/constants/colors";
import { cardData } from "../components/types";
import { useFocusEffect } from "@react-navigation/native";
import DeleteIcon from "../assets/icons/DeleteIcon";
import useKeyboardVisible from "../components/hooks/useKeyboardVisible";

const { height } = Dimensions.get("window");

const TaskEditScreen = ({ navigation }: TaskEditScreenProps): JSX.Element => {
    const positionAnim = useRef(new Animated.Value(0)).current;
    const colorAnimation = useRef(new Animated.Value(0)).current;
    const [currentTaskState, setCurrentTaskState] = useState<string>("");
    const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false);

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

    const clearEntries = (): void =>{
        setTaskTitle("");
        setTaskDescription("");
        setTaskStatus("");
    }

    const saveData = (list: cardData[]): void => {
        localStorage.set(storeageKey.LIST, JSON.stringify(list));
        clearEntries()
        navigation.goBack();
    }

    const handleCancelPress = (): void => {
        clearEntries()
        navigation.goBack();
    }

    const handleSavePressed = (): void => {
        const listCopy = [...listData]
        listCopy.forEach(item => {
            if (item.id === selectedCardId) {
                item.title = taskTitle;
                item.description = taskDescription;
                item.status = taskStatus;
            }
        })

        if(taskStatus === currentTaskState){
            saveData(listCopy);
            return;
        }

        Animated.timing(colorAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
            easing: Easing.ease
        }).start(() => saveData(listCopy))
    }

    const handleDeletePress = (): void => {
        const listDataCopy = [...listData].filter(data => data.id !== selectedCardId);
        localStorage.set(storeageKey.LIST, JSON.stringify(listDataCopy));
        clearEntries();
        navigation.goBack()
    }

    useEffect(() => {
        if (listData.length > 0) {
            const item = listData.find(item => item.id === selectedCardId);

            setTaskTitle(item?.title as string);
            setTaskDescription(item?.description as string);
            setTaskStatus(item?.status as string)

            setIsEditPageLoading(false);
        }
    }, [])

    useEffect(() => {
        if (!isEditPageLoading) {
            setCurrentTaskState(taskStatus);

            Animated.timing(positionAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false,
                easing: Easing.elastic(1)
            }).start();
        }
    }, [positionAnim, isEditPageLoading])

    useKeyboardVisible(setIsKeyboardVisible);

    const bottomPosition = positionAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-100, height / 3.5]
    })

    const cardColor = colorAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [
            currentTaskState === "Complete" ? colors.STATUS_COMPLETE_CARD_BACKGROUND : colors.CARD_BACKGROUND,
            currentTaskState === "Complete" ? colors.CARD_BACKGROUND : colors.STATUS_COMPLETE_CARD_BACKGROUND
        ]
    })

    if (isEditPageLoading) return <></>

    return (
        <View style={styles.body}>
            <Animated.View
                style={[
                    styles.container,
                    { backgroundColor: cardColor },
                    { bottom: bottomPosition },
                    isKeyboardVisible && { bottom: 0 }
                ]}
            >
                <TouchableOpacity 
                    onPress={handleDeletePress}
                    style={styles.deleteButtonContainer}
                >
                    <DeleteIcon/>
                </TouchableOpacity>
                <EditCardTitle />
                <DropDown defaultValue={taskStatus} />
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
        position: "absolute",
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 10,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5
    },
    buttonContainer: {
        marginTop: 20,
        width: "100%",
        flexDirection: 'row',
        justifyContent: "space-around"
    },
    deleteButtonContainer: {
        alignItems: "flex-end",
        marginBottom: 10,
    }
})

export default TaskEditScreen;
