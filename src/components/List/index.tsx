import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import ListItem from "./ListItem";
import { TaskListProps, cardData } from "../types";

import useStore from "../../store";


const TaskList = ({ navigation }: TaskListProps): JSX.Element => {
    const { listData } = useStore();

    const renderItem = ({ item }: { item: cardData }) => {
        return <ListItem item={item} navigation={navigation} />
    }

    if (listData.length === 0) return (
        <View style={styles.textBody}>
            <Text style={styles.text}>No Task</Text>
        </View>
    )

    return (
        <FlatList
            data={listData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
        />
    )
}

const styles = StyleSheet.create({
    textBody: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 25,
        fontWeight: "500",
        textAlign: "center",
        marginBottom: 200
    }
})

export default TaskList;
