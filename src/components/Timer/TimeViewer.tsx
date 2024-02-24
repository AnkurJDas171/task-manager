import React from "react";
import { StyleSheet, Text } from "react-native";

import { TimeViewerProps } from "../types";
import { formateTime } from "../../assets/utils/TimerFunctions";
import colors from "../../assets/constants/colors";

const TimeViewer = React.memo(({ currentTime }: TimeViewerProps): JSX.Element => {
    if (currentTime === null) return <></>

    return (
        <Text style={styles.text}>{
            formateTime(currentTime.toLocaleTimeString())
        }</Text>
    )
})

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        fontWeight: "200",
        textAlign: "center",
        color: colors.TEXT
    }
})

export default TimeViewer;
