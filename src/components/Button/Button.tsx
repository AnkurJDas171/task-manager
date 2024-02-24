import React from "react";
import {TouchableOpacity} from "react-native";

import { ButtonProps } from "../types";

const Button = React.memo(({children, handlePress}: ButtonProps): JSX.Element => {
    return (
        <TouchableOpacity onPress={handlePress}>
            {children}
        </TouchableOpacity>
    )
})

export default Button;
