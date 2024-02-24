import React from "react";
import {StyleSheet, Text, View} from "react-native";

import Button from "./Button";
import { CancelButtonProps } from "../types";

const CancelButton = ({hadleCancel}: CancelButtonProps): JSX.Element => {
    return (
        <Button handlePress={hadleCancel}>
            <View style={styles.body}>
                <Text style={styles.text}>Cancel</Text>
            </View>
        </Button>
    )
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: "#d5d5d5",
        width: 100
    },
    text: {
        fontSize: 15,
        fontWeight: "700",
        color: "#ffffff",
        textAlign: 'center',
        paddingVertical: 10,
    }
})

export default CancelButton;
