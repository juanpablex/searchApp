import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const EsconderBottom = ({ onPress, children }) => {
    const { buttonStyle, textStyle } = styles;
    return (
        <TouchableOpacity

            onPress={onPress}
            style={buttonStyle}>
            {/* <Text style={textStyle}>{children}</Text> */}
            <MaterialIcons name="arrow-drop-down" style={{ fontSize: 15, alignSelf: 'center' }} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonStyle: {
        //flex: 1,
        //alignSelf: 'stretch',
        // backgroundColor: '#fff',
        // borderRadius: 5,
        // borderWidth: 1,
        // borderColor: '#007aff',
        // marginLeft: 5,
        // marginRight: 5,
        //alignContent: 'center'
    }
});

export default EsconderBottom;
