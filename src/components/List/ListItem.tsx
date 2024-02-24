import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import TaskTitle from "../Card/TaskTitle";
import { ListItemProps } from "../types";
import screens from "../../assets/constants/screens";
import useStore from "../../store";

const ListItem = React.memo(({ item, navigation }: ListItemProps): JSX.Element => {
    const { setSelectedCardId, setIsEditPageLoading } = useStore();

    const handlePress = (): void => {
        setSelectedCardId(item.id)
        setIsEditPageLoading(true);
        navigation.navigate(screens.TASK_EDIT);
    }

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.body}>
                <TaskTitle title={item.title} />
            </View>
        </TouchableOpacity>
    )
})

const styles = StyleSheet.create({
    body: {
        height: 50,
        width: '85%',
        backgroundColor: "#ffffff",
        justifyContent: "center",
        alignSelf: "center",
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    }
})

export default ListItem;
