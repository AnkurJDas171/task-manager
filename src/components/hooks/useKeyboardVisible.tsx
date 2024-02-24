import React, { useEffect } from "react"
import { Keyboard } from "react-native";

const useKeyboardVisible = (callback: (arg: boolean) => void): void => {
    useEffect(()=>{
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            callback(true);
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            callback(false);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        }
    }, [])
}

export default useKeyboardVisible;
