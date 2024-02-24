import React, { useRef, useState } from "react";
import { StyleSheet, TextInput } from "react-native";

import { EditCardDescriptionProps, Timeout } from "../types";
import useStore from "../../store";
import colors from "../../assets/constants/colors";

const EditCardDescription = React.memo((): JSX.Element => {
    const { taskDescription, setTaskDescription } = useStore();

    const handleTextChange = (text: string) => setTaskDescription(text);

    return (
        <TextInput
            placeholder="description...."
            style={styles.description}
            onChangeText={handleTextChange}
            multiline={true}
            value={taskDescription}
        />
    )
})

const styles = StyleSheet.create({
    description: {
        height: 100,
        width: '100%',
        backgroundColor: colors.INPUT,
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 10 
    }
})

export default EditCardDescription;
