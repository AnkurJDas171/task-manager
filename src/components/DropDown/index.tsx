import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

import DropDownList from "./DropDownList";
import { DropDownProps } from "../types";
import useStore from "../../store";
import colors from "../../assets/constants/colors";

const DropDown = React.memo(({ defaultValue = "" }: DropDownProps): JSX.Element => {
    const [isDropDownvisible, setIsDropDownVisible] = useState<boolean>(false);
    const {taskStatus, isErrorInStatusDropDown, setTaskStatus} = useStore()

    const handlePress = () => {
        if (isDropDownvisible) return;
        setIsDropDownVisible(true);
    }

    const handleDropDownValuePress = (value: string) => {
        setTaskStatus(value);
        setIsDropDownVisible(false);
    }

    useEffect(()=>{
        if(defaultValue){
            setTaskStatus(defaultValue);
        }
    }, [])

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <View 
                style={[
                    styles.body,
                    isErrorInStatusDropDown && {
                        borderColor: colors.ERROR
                    }
                ]}
            >
                <Text 
                    style={[
                        styles.text,
                        isErrorInStatusDropDown && {
                            color: colors.ERROR
                        }
                    ]}
                >
                    Status: {taskStatus}
                </Text>
                {isDropDownvisible && <DropDownList hanldeSelect={handleDropDownValuePress} />}
            </View>
        </TouchableWithoutFeedback>
    )
})

const styles = StyleSheet.create({
    body: {
        height: 20,
        width: '50%',
        borderBottomWidth: 1,
        borderColor: "#000",
        zIndex: 2,
        marginVertical: 25
    },
    text: {
        color: colors.TEXT
    }
})

export default DropDown;
