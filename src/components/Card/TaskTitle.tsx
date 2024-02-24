import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TaskTitleProps } from "../types";

const TaskTitle = React.memo(({title}: TaskTitleProps): JSX.Element => {
    return (
        <View>
            <Text style={styles.text}>{title}</Text>
        </View>
    )
})

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: "400",
        paddingHorizontal: 50,
    }
})

export default TaskTitle;
