import React, { useState } from "react";
import { View, TextInput, Text, TextInputProps } from "react-native";
import colors from "../../assets/colors/colors";

type Props = {
    rightComponet?: React.ReactNode,
    leftComponet?: React.ReactNode,
    containerStyle?: object,
    label: string,
    theme?: 'dark' | 'light',
    onPress?: () => void,
   
} & TextInputProps;

export default function InputField({ theme = 'dark', rightComponet, leftComponet, containerStyle, label, onPress, ...rest }: Props) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={[{
            backgroundColor:colors[theme].searchbackground,
            paddingHorizontal: 18,
            height: 48,
            flexDirection: 'row',
            width: '100%',
            alignItems:"center",
            justifyContent:"center",
            borderRadius:4,

        }, containerStyle]}>

            {/* <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: '100%',
                width: '100%',
                paddingHorizontal:10
            }}> */}
            {leftComponet && leftComponet}
            <TextInput
                style={{
                    fontSize: 16,
                    fontFamily: 'Axiforma-Regular',
                    color: colors[theme].text,
                    width: '100%',
                    justifyContent:"center"
                    
                  
                }}
                textAlign='center'
                placeholder={label}
                placeholderTextColor={colors[theme].searchText}
                cursorColor={colors[theme].text}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                {...rest}
            />
            {rightComponet && rightComponet}
            {/* </View> */}

        </View>

    );
}