import React from "react";
import { StyleSheet, Text } from "react-native";

import { DateViewerProps } from "../types";
import { formateDate } from "../../assets/utils/TimerFunctions";
import colors from "../../assets/constants/colors";

const DateViewer = React.memo(({currentDate}: DateViewerProps): JSX.Element => {
    if(currentDate === null) return <></>

    return (
        <Text style={styles.date}>{
            formateDate(currentDate.toLocaleDateString())
        }</Text>
    )
})

const styles = StyleSheet.create({
    date: {
        fontSize: 25,
        fontWeight: "400",
        textAlign: "center",
        color: colors.TEXT
    }
})

export default DateViewer;
