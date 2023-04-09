import React from 'react';
import {
    StyleSheet, View, TouchableOpacity, Text,
    TouchableWithoutFeedback,
    UIManager,
    LayoutAnimation
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const EmpleadosLista = ({ label, label2, onPressText, onPressUser, onPressIcon, lugar }) => {




    return (
        <View>


            <View style={styles.empleadoStyle}>
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

                {/* <View style={styles.containerStyleIcon}>

                    <TouchableOpacity>
                        <MaterialIcons style={styles.iconStyle}
                            name="add" size={10}
                        />
                    </TouchableOpacity>


                </View> */}


            </View>

            <View style={styles.lugarStyle}>

                <TouchableOpacity
                    onPress={onPressUser}
                >
                    <Text style={styles.labelStyle}
                    >
                        {label2.length >= 25 ? label2.substring(0, 25) + '...' : label2}
                    </Text>
                </TouchableOpacity>


                {/* <TouchableOpacity style={{ alignItems: 'flex-end' }}>
                <MaterialIcons style={styles.iconStyle}
                    name="cake" size={35} />
            </TouchableOpacity> */}

                {/* <View style={styles.containerStyleIcon}>
                    {lugar == false ?
                        <TouchableOpacity>
                            <MaterialIcons style={styles.iconStyle}
                                name="import-export" size={10}
                            />
                        </TouchableOpacity> :
                        null}

                </View> */}


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
    empleadoStyle: {
        backgroundColor: '#dcdcdc',
        height: 50,
        borderRadius: 5,
        marginHorizontal: 15,
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
    },
    lugarStyle: {
        backgroundColor: '#dcdcdc',
        height: 50,
        borderRadius: 5,
        marginHorizontal: 15,
        flexDirection: 'row',
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    containerStyleIcon: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});

export default EmpleadosLista;