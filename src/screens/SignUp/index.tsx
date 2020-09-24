import React, { memo, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "screens/SignUp/components/Header";
import Input from "screens/SiginIn/components/Input";
import { Montserrat } from "utils/fonts";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ROUTERS } from "utils/navigation";
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const ValidationSchema = yup.object().shape({
    first_name: yup
        .string()
        .required('First name is required'),
    last_name: yup
        .string()
        .required('Last name is required'),
    email: yup
        .string()
        .email('Invalid email. Enter a valid email id')
        .required('Email address is required'),
    phone: yup
        .string()
        .required('Phone number is required'),
    password: yup
        .string()
        .required('Password is required'),
    password_confirmation: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Password confirmation is required'),
});


const SignIn = memo(() => {
    const { navigate } = useNavigation();

    const onPressSignIn = useCallback(() => {
        navigate(ROUTERS.Onboarding);
    }, [])

    const onPressForgot = useCallback(() => {
        navigate(ROUTERS.ForgotPassword);
    }, [])

    const onPresGoToSignIn = useCallback(() => {
        navigate(ROUTERS.SignIn);
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps={'handled'}>
                <Header />

                <Formik
                    initialValues={{ phone: '', password: '' }}
                    onSubmit={(values: any, { resetForm }) => {
                        console.log(values)
                        onPressSignIn(values);
                        resetForm({
                            values: '',
                        });
                    }}
                    validationSchema={ValidationSchema}
                    validateOnChange={false}
                    validateOnBlur={false}>
                    {({ handleChange, handleSubmit, values, errors }) => {
                        return (
                            <>
                                <Input
                                    mt={40}
                                    placeholder={'First Name'}
                                    onChangeText={handleChange('first_name')}
                                    value={values.first_name}
                                    error={errors.first_name}
                                />
                                <Input
                                    mt={16}
                                    placeholder={'Last Name'}
                                    onChangeText={handleChange('last_name')}
                                    value={values.last_name}
                                    error={errors.last_name}
                                />
                                <Input
                                    mt={16}
                                    placeholder={'Email'}
                                    onChangeText={handleChange('email')}
                                    value={values.email}
                                    error={errors.email}
                                />
                                <Input
                                    mt={16}
                                    placeholder={'Phone number'}
                                    keyboardType={'phone-pad'}
                                    onChangeText={handleChange('phone')}
                                    value={values.phone}
                                    error={errors.phone}
                                />
                                <Input
                                    mt={16}
                                    pass={true}
                                    placeholder={'Password'}
                                    onChangeText={handleChange('password')}
                                    value={values.password}
                                    error={errors.password}
                                />
                                <Input
                                    mt={16}
                                    pass={true}
                                    placeholder={'Confirm Password'}
                                    onChangeText={handleChange('password_confirmation')}
                                    value={values.password_confirmation}
                                    error={errors.password_confirmation}
                                />
                                <View style={styles.containerSignIn}>
                                    <TouchableOpacity style={styles.btnSignIn} onPress={handleSubmit}>
                                        <Text style={styles.txtSignIn}>SIGN UP</Text>
                                    </TouchableOpacity>

                                </View>
                            </>)
                    }}
                </Formik>

                <TouchableOpacity style={styles.btnSignUp} onPress={onPresGoToSignIn}>
                    <Text style={styles.txtSignUp}>Have Account Already? Sign in</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
});

export default SignIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    containerSignIn: {
        flexDirection: 'row',
        marginHorizontal: 40,
        marginTop: 24
    },
    btnSignIn: {
        backgroundColor: '#31dde7',
        borderRadius: 24,
        flex: 1,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtSignIn: {
        fontFamily: Montserrat,
        fontWeight: '600',
        color: '#FFF',
        fontSize: 17
    },
    btnFaceId: {
        width: 48,
        height: 48,
        borderRadius: 16,
        backgroundColor: '#6979F8',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20
    },
    btnForgot: {
        marginTop: 24,
        alignSelf: 'center'
    },
    txtForgot: {
        fontSize: 12,
        color: '#0F4C81',
        fontFamily: Montserrat,
        fontWeight: '500'
    },
    containerOr: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 40,
        marginTop: 24
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#F0F0F0'
    },
    txtOr: {
        marginHorizontal: 20,
        fontSize: 16,
        color: '#1A051D',
        fontFamily: Montserrat,
        fontWeight: 'normal'
    },
    btnSignFb: {
        marginHorizontal: 40,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#4267B2',
        marginTop: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtSignInFb: {
        fontWeight: '600',
        fontSize: 17,
        color: '#FFF',
        textTransform: 'uppercase'
    },
    btnSignInGoogle: {
        marginHorizontal: 40,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#DB4437',
        marginTop: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnSignUp: {
        alignSelf: 'center',
        marginTop: 10
    },
    txtSignUp: {
        fontSize: 12,
        color: '#0F4C81',
        fontFamily: Montserrat,
        fontWeight: '500'
    }
})
