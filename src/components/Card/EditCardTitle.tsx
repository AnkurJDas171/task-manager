import React, { useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

import { EditCardTitleProps, Timeout } from "../types";
import useStore from "../../store";
import colors from "../../assets/constants/colors";

const EditCardTitle = React.memo((): JSX.Element => {
    const { taskTitle, setTaskTitle } = useStore();

    const handleTextChange = (text: string) =>  setTaskTitle(text);

    return (
        <View style={styles.body}>
            <TextInput
                placeholder="Title"
                style={styles.title}
                onChangeText={handleTextChange}
                value={taskTitle}
            />
        </View>
    )
})

const styles = StyleSheet.create({
    body: {
        backgroundColor: colors.INPUT,
        borderRadius: 10
    },
    title: {
        fontSize: 20,
        fontWeight: "400",
        paddingHorizontal: 10,
        paddingVertical: 15
    },
})

export default EditCardTitle;
