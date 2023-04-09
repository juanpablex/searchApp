import React, { useState } from 'react';
import {
    StyleSheet, View, TouchableOpacity, Text, TextInput, ScrollView,
    TouchableWithoutFeedback,
    UIManager,
    LayoutAnimation
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import KeyboarSpacer from 'react-native-keyboard-spacer';


const ElementoVenta = ({ cantreturn, cantidad, etiqueta, precio, stock, onPressRemoveVenta, onPressAddVenta }) => {

    const [cant, setCant] = useState(0);
    const [total, setTotal] = useState(0.00);
    const sumar = () => {
        //console.log('sumar ', etiqueta, ': ', precio);

        if (cant + cantidad <= stock) {
            setCant(cant + cantidad);

            //console.log('estoy en el if de cant');
            setTotal(parseFloat(total) + parseFloat(precio) * parseFloat(cantidad));

            //cantreturn = cant;
            // console.log('cant: ', cant);
            onPressAddVenta(cant + cantidad);
            //cantreturn(cant);
            //cantreturn(cant);
        }
    }
    const restar = () => {

        if (cant - cantidad >= 0) {
            //console.log('restar ', etiqueta, ': ', precio);
            setCant(cant - cantidad);
            setTotal(parseFloat(total) - parseFloat(precio) * parseFloat(cantidad))
            //console.log('cant: ', cant);
            onPressRemoveVenta(cant - cantidad);
        }
    }
    return (




        <View style={styles.containerStyle}>

            <View style={{ flexDirection: 'column' }}>

                <Text style={styles.labelStyle, { fontWeight: 'bold' }}
                >
                    {etiqueta.length >= 25 ? etiqueta.substring(0, 25) + '...' : etiqueta}
                </Text>
                <Text style={styles.labelStyle}
                >
                    {'Precio: ' + precio + '             ' + cant + '          ' + total}
                </Text>
                <Text style={styles.labelStyle}
                >
                    {'Stock: ' + stock}
                </Text>

            </View>
            <View style={{ flexDirection: 'row' }}>

                <TouchableOpacity
                    onPress={restar}>


                    <MaterialIcons name="remove" style={{ fontSize: 25 }} />


                </TouchableOpacity>
                <TouchableOpacity
                    onPress={sumar} style={{ marginLeft: 15 }}>



                    <MaterialIcons name="add" style={{ fontSize: 25 }} />

                </TouchableOpacity>
            </View>

        </View >

    );

};

const styles = StyleSheet.create({
    labelStyle: {
        //flex: 1,
        fontSize: 14,//<18,//14 es el default
        flexDirection: 'row',
        //textAlign: 'center',
        marginLeft: 10
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
    },
    scrollStyle: {
        //backgroundColor: 'rgba(0,0,0,0.75)',
        //position: 'relative',
        justifyContent: 'center',
        flexGrow: 1
        //flex: 1
    }
});

export default ElementoVenta;