import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry, keyboardType }) => {
    const { inputStyle, labelStyle, containerStyle } = styles;
    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>{label}</Text>
            <TextInput
                secureTextEntry={secureTextEntry}//secureTextEntry={true}
                style={inputStyle}
                value={value}
                onChangeText={onChangeText}
                autoCorrect={false}
                autoCapitalize='none'
                placeholder={placeholder}
                keyboardType={keyboardType}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 15,
        lineHeight: 23,
        flex: 2
    },
    labelStyle: {
        fontSize: 15,
        paddingLeft: 10,
        flex: 1
    },
    containerStyle: {
        height: 20,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export { Input };