import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import DROP_DOWN_ITEMS from "../../assets/constants/DropDownList";
import { DropDownListProps } from "../types";

const DropDownList = React.memo(({hanldeSelect}: DropDownListProps): JSX.Element => {
    return (
        <View style={styles.body}>
            {DROP_DOWN_ITEMS.map((item) => {
                return (
                    <TouchableOpacity key={item} onPress={()=>hanldeSelect(item)}>
                        <Text style={styles.text}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
})

const styles = StyleSheet.create({
    body: {
        position: "absolute",
        top: 20,
        zIndex: 3,
        backgroundColor: '#000',
        alignSelf: "flex-end"
    },
    text: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        color: "#fff"
    }
})

export default DropDownList;
