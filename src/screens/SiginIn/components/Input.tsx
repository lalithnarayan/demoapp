import React, { memo, useCallback, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View, Text } from "react-native";
import { Lato } from "utils/fonts";
import SvgEyes from "svgs/signIn/SvgEyes";

interface Props {
    mt?: number;
    pass?: boolean;
    placeholder: string
    keyboardType?: string,
    onChangeText: Function,
    value: string,
    error: string,
}

const Input = memo((props: Props) => {
    const { pass, mt, placeholder, error, ...element_props } = props;
    const [secure, setSecure] = useState(pass);

    const onPressIn = useCallback(() => {
        setSecure(false);
    }, []);

    const onPressOut = useCallback(() => {
        setSecure(true);
    }, []);

    return (
        <>
            <View style={[styles.container, { marginTop: mt }, error ? {
                borderColor: 'red',
            } : {}]}>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor={'#ABA4AC'}
                    secureTextEntry={secure}
                    {...element_props}
                />
                {pass && <TouchableOpacity onPressIn={onPressIn} onPressOut={onPressOut}>
                    <SvgEyes />
                </TouchableOpacity>}
            </View>
            {
                error ?
                    (<View style={styles.errorMessageContainer}>
                        <Text style={styles.errorMessage}>{error}</Text>
                    </View>) : null
            }
        </>
    )
});

export default Input;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 40,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#EAE8EA',
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16
    },
    input: {
        flex: 1,
        fontSize: 15,
        fontFamily: Lato,
        padding: 0,
        margin: 0
    },
    errorMessageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 42,
        marginVertical: 8,
    },
    errorMessage: {
        fontSize: 12,
        color: 'red',
    }
});
