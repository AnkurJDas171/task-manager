import React from "react";
import {StyleSheet, Text, View} from "react-native";

import Button from "./Button";
import { SaveButtonProps } from "../types";

const SaveButton = ({handleSave}: SaveButtonProps): JSX.Element => {
    return (
        <Button handlePress={handleSave}>
            <View style={styles.body}>
                <Text style={styles.text}>Save</Text>
            </View>
        </Button>
    )
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: "blue",
        width: 100
    },
    text: {
        fontSize: 15,
        fontWeight: "700",
        color: "#ffffff",
        textAlign: 'center',
        paddingVertical: 10
    }
})

export default SaveButton;
