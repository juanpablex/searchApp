import React from 'react';
import {
    StyleSheet, View, TouchableOpacity, Text,
    TouchableWithoutFeedback,
    UIManager,
    LayoutAnimation
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ElementoLista = ({ label, onPressText, onPressIcon, editor, showIcon, logueado }) => {




    return (




        <View style={styles.containerStyle}>






            <TouchableOpacity
                onPress={onPressText}>
                <Text style={styles.labelStyle}
                >
                    {label.length >= 25 ? label.substring(0, 25) + '...' : label}
                </Text>

            </TouchableOpacity>


            {/* <TouchableOpacity style={{ alignItems: 'flex-end' }}>
                <MaterialIcons style={styles.iconStyle}
                    name="cake" size={35} />
            </TouchableOpacity> */}

            <View style={styles.containerStyleIcon}>
                <TouchableOpacity
                    onPress={onPressIcon}
                >
                    {showIcon == true ?
                        <MaterialIcons
                            style={styles.iconStyle}
                            name="info-outline" size={20} />
                        : null
                    }

                </TouchableOpacity>
                {logueado == true ?
                    <Text style={{ alignItems: 'flex-end' }}> logueado</Text>
                    : null}
                {/* {editor == true ?
                    <TouchableOpacity>
                        <MaterialIcons style={styles.iconStyle}
                            name="import-export" size={10}
                        />
                    </TouchableOpacity>
                    : null} */}


            </View>


        </View>

    );

};

const styles = StyleSheet.create({
    labelStyle: {
        //flex: 1,
        fontSize: 14,//<18,//14 es el default
        flexDirection: 'row',
        textAlign: 'center',
        marginLeft: 10
    },
    iconStyle: {

        fontSize: 25,
        // alignSelf: 'flex-end',
        marginHorizontal: 5,
        alignContent: 'flex-end',
        // flexDirection: 'row-reverse'
    },
    containerStyle: {
        backgroundColor: '#dcdcdc',
        height: 50,
        borderRadius: 5,
        marginHorizontal: 15,
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    containerStyleIcon: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});

export default ElementoLista;