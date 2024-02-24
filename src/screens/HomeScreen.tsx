import React, { useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Timer from "../components/Timer/Timer";
import CreateTaskButton from "../components/Button/CreateTaskButton";
import TaskList from "../components/List";
import { HomeScreenProps } from "./types";
import { useFocusEffect } from "@react-navigation/native";
import { localStorage } from "../localStorage";
import storeageKey from "../assets/constants/localStorageKeys";
import useStore from "../store";
import colors from "../assets/constants/colors";

const HomeScreen = ({ navigation }: HomeScreenProps): JSX.Element => {
    const { setListData } = useStore();

    const chageListData = () => {
        const list = localStorage.getString(storeageKey.LIST);
        setListData(list ? JSON.parse(list) : []);
    }

    useFocusEffect(useCallback(() => {
        chageListData();
    }, []))


    const handleClear = () => {
        localStorage.clearAll();
        chageListData();
    }

    return (
        <View style={styles.body}>
            <Timer />
            <TouchableOpacity onPress={handleClear}>
                <Text style={styles.text}>Clear All</Text>
            </TouchableOpacity>
            <TaskList navigation={navigation} />
            <CreateTaskButton navigation={navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: colors.PRIMARY
    },
    text: {
        marginHorizontal: 20,
        textAlign: "right",
        paddingHorizontal: "10%"
    }
})

export default HomeScreen;
