import React, { useRef, useState } from "react";
import { Animated, PanResponder, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

import TaskTitle from "../Card/TaskTitle";
import { ListItemProps } from "../types";
import screens from "../../assets/constants/screens";
import useStore from "../../store";
import colors from "../../assets/constants/colors";
import DeleteIcon from "../../assets/icons/DeleteIcon";
import { localStorage } from "../../localStorage";
import storeageKey from "../../assets/constants/localStorageKeys";

const ListItem = React.memo(({ item, navigation }: ListItemProps): JSX.Element => {
    const [throttle, setThrottle] = useState<boolean>(false);
    const pan = useRef(new Animated.Value(0)).current;

    const panResponder = useRef(PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => {
            const dx = gestureState.dx;
            if (dx > 0) {
                pan.setValue(0);
            } else if (dx < -100) {
                pan.setValue(-10000);
                handleDelete();
            } else {
                pan.setValue(dx);
            }
        },
        onPanResponderRelease: () => {
            pan.resetAnimation();
        },
    })).current;

    const { listData, setListData, setSelectedCardId, setIsEditPageLoading } = useStore();

    const handlePress = (): void => {
        setSelectedCardId(item.id)
        setIsEditPageLoading(true);
        navigation.navigate(screens.TASK_EDIT);
    }

    const handleDelete = (): void => {
        if(throttle) return;
        setThrottle(true);
        setTimeout(()=>{
            setThrottle(false);
        }, 1000)

        const listDataCopy = [...listData].filter(data => data.id !== item.id);
        localStorage.set(storeageKey.LIST, JSON.stringify(listDataCopy));
        setListData(listDataCopy)
    }

    return (
        <View style={styles.body}>
            <Animated.View
                style={[
                    styles.container,
                    { backgroundColor: item.status === "Complete" ? 
                        colors.STATUS_COMPLETE_CARD_BACKGROUND : 
                        colors.CARD_BACKGROUND 
                    },
                    { transform: [{ translateX: pan }] }
                ]}
                {...panResponder.panHandlers}
            >
                <TouchableOpacity onPress={handlePress}>
                    <TaskTitle title={item.title} />
                </TouchableOpacity>
            </Animated.View>
            <TouchableOpacity 
                onPress={handleDelete}
                style={styles.deleteConatiner}
            >
                <DeleteIcon style={styles.delete} />
            </TouchableOpacity>
        </View>
    )
})

const styles = StyleSheet.create({
    body: {
        height: 50,
        width: '85%',
        backgroundColor: colors.PRIMARY,
        justifyContent: "center",
        marginVertical: 10,
        alignSelf: "center",
    },
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: colors.PRIMARY,
        justifyContent: "center",
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5
    },
    deleteConatiner: {
        zIndex: -1,
        position: "absolute",
        right:10
    },
    delete: {
        alignSelf: "flex-end",
        marginRight: 10,
    }
})

export default ListItem;
