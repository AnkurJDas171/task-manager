import React from "react";
import { StyleSheet, View } from "react-native";

import Button from "./Button";
import { CreateTaskButtonProps } from "../types";
import screens from "../../assets/constants/screens";
import colors from "../../assets/constants/colors";

const CreateTaskButton = React.memo(({navigation}: CreateTaskButtonProps): JSX.Element => {

    const hadlePress = () => {
        navigation.navigate(screens.TASK_CREATE)
    }

    return (
        <View style={styles.body}>
            <Button handlePress={hadlePress}>
                <View style={styles.buttonBody}>
                    <View style={styles.horizontalLine} />
                    <View style={styles.verticalLine} />
                </View>
            </Button>
        </View>
    )
})

const styles = StyleSheet.create({
    body: {
        position: "absolute",
        bottom: 20,
        right: 20
    },
    buttonBody: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.SECONDARY,
        height: 60,
        width: 60,
        borderRadius: 60,
    },
    horizontalLine: {
        height: 10,
        width: 38,
        backgroundColor: "#fff",
        borderRadius: 45
    },
    verticalLine: {
        height: 38,
        width: 10,
        backgroundColor: "#fff",
        borderRadius: 45,
        position: "absolute"
    }
})

export default CreateTaskButton
