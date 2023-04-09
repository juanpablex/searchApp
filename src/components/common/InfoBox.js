import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const InfoBox = ({ label, value }) => {
    const { labelStyle, textStyle, containerStyle } = styles;
    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>{label}</Text>
            <Text style={textStyle}>{value}</Text>
            {/* secureTextEntry={secureTextEntry}//secureTextEntry={true}
                style={inputStyle}
                value={value}
                onChangeText={onChangeText}
                autoCorrect={false}
                autoCapitalize='none'
                placeholder={placeholder}
                keyboardType={keyboardType}
            /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    textStyle: {
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
        flex: 1,
        fontWeight: 'bold',
        justifyContent:'center'
    },
    containerStyle: {
        height: 20,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export { InfoBox };