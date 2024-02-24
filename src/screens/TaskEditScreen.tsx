import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Easing, StyleSheet, View } from "react-native";

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

const { height } = Dimensions.get("window");

const TaskEditScreen = ({ navigation }: TaskEditScreenProps): JSX.Element => {
    const positionAnim = useRef(new Animated.Value(0)).current;
    const completeCardbackgroundColorAnim = useRef(new Animated.Value(0)).current;
    const incompleteCardbackgroundColorAnim = useRef(new Animated.Value(0)).current;


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

    const saveData = (list: cardData[]) => {
        localStorage.set(storeageKey.LIST, JSON.stringify(list));
        navigation.goBack();
    }

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

        const animationRef = taskStatus === 'Complete' ? 
            completeCardbackgroundColorAnim : 
            incompleteCardbackgroundColorAnim

        Animated.timing(animationRef, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
            easing: Easing.ease
        }).start(()=>saveData(listCopy))
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
            Animated.timing(positionAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false,
                easing: Easing.elastic(1)
            }).start();
        }
    }, [positionAnim, isEditPageLoading])

    const bottomPosition = positionAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-100, height / 3.5]
    })

    const completeCardColor = completeCardbackgroundColorAnim.interpolate({
        inputRange: [0,1],
        outputRange: [
            colors.STATUS_COMPLETE_CARD_BACKGROUND,
            colors.CARD_BACKGROUND, 
        ]
    })

    const incompleteCardColor = incompleteCardbackgroundColorAnim.interpolate({
        inputRange: [0,1],
        outputRange: [
            colors.STATUS_COMPLETE_CARD_BACKGROUND,
            colors.CARD_BACKGROUND, 
        ]
    })

    if (isEditPageLoading) return <></>

    return (
        <View style={styles.body}>
            <Animated.View 
                style={[
                    styles.container, 
                    completeCardbackgroundColorAnim === new Animated.Value(1) ?
                        {backgroundColor: completeCardColor} :
                        {backgroundColor: incompleteCardColor},
                    { bottom: bottomPosition }
                ]}
            >
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
    },
    buttonContainer: {
        marginTop: 20,
        width: "100%",
        flexDirection: 'row',
        justifyContent: "space-around"
    }
})

export default TaskEditScreen;
