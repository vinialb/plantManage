import React, { useState } from 'react';
import { SafeAreaView, KeyboardAvoidingView, View, StyleSheet, Text, TextInput, Platform, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function UserIdentification(){
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();

    const navigation = useNavigation();

    function handleInputBlur(){
        setIsFocused(false);
        setIsFilled(!!name);
    }

    function handleInputFocus(){
        setIsFocused(true);
    }

    function handleInputChange(value: string){
        setIsFilled(!!value);
        setName(value);
    }

    async function handleSubmit(){
        if(!name)
            return Alert.alert('Me diz como chamar você 😢');

        try{
            await AsyncStorage.setItem('@platmenager:user', name);
            navigation.navigate('Confirmation',{
                title: 'Prontinho',
                subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
                buttonTitle: 'Começar',
                icon: 'smile',
                nextScreen: 'PlantSelect'
            });
        }catch{
            Alert.alert('Não foi possível salvar o seu nome 😢')
        }
    }

    return(
        <SafeAreaView style={styles.container}>

            <KeyboardAvoidingView 
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >

                <TouchableWithoutFeedback
                    onPress={Keyboard.dismiss}
                >

                    <View style={styles.content}>

                        <View style={styles.form}>

                            <View style={styles.header}>
                                <Text style={styles.emoji}>
                                    { isFilled ? '😄' : '😊'}
                                </Text>

                                <Text style={styles.title}>
                                    Como podemos {'\n'}
                                    chamar você?
                                </Text>
                            </View>

                            <TextInput
                                onFocus={() => handleInputFocus()}
                                onBlur={() => handleInputBlur()}
                                onChangeText={(text) => handleInputChange(text)}
                                style={[styles.input, 
                                    (isFocused || isFilled) && { borderBottomColor: colors.green}
                                ]}
                            />

                            <View style={styles.footer}>

                                <Button 
                                    title="Confirmar"
                                    onPress={() => handleSubmit()}
                                />

                            </View>

                        </View>

                    </View>

                </TouchableWithoutFeedback>

            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        flex: 1,
        width: '100%'
    },
    form: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 54
    },
    header: {
        alignItems: 'center'
    },
    emoji: {
        fontSize: 44
    },
    title: {
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 20
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center'
    },
    footer: {
        marginTop: 40,
        width: '100%',
        paddingHorizontal: 20
    }
})