import React, { useCallback, useState } from "react";
import { Text, View } from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import DateViewer from "./DateViewer";
import TimeViewer from "./TimeViewer";

const Timer = (): JSX.Element => {
    const [date, setDate] = useState<Date | null>(null);

    useFocusEffect(
        useCallback(() => {
            const timer = setInterval(() => {
                const currentDate = new Date();
                setDate(currentDate);
            }, 1000)

            return () => clearInterval(timer);
        }, [])
    )

    return (
        <View>
            <DateViewer currentDate={date} />
            <TimeViewer currentTime={date} />
        </View>
    )
}

export default Timer;
