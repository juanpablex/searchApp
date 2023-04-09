import React from 'react';
import { View, Image, Text, StyleSheet, Modal, ScrollView } from 'react-native';

import { Button, CardSection } from '../components/common';
//import { ScrollView } from 'react-native-gesture-handler';


const InfoUsuario = ({ visible, onPress }) => {

    //var urlimagen = `../../imagenes/${result.image_url}`;
    //console.log(urlimagen);
    return (


        <Modal visible={visible}
            animationType="fade"
            transparent
            onRequestClose={() => { visible }}
        >
            <View style={styles.containerStyle}>
                <CardSection style={styles.campo}>
                    <Text style={styles.styleLabel}>
                        Usuario:
                </Text>
                    <Text style={styles.styleTexto}>
                        {onPress.results[0]}
                    </Text>
                </CardSection>

                <CardSection style={styles.campo}>
                    <Text style={styles.styleLabel}>
                        Persona:
                </Text>
                    <Text style={styles.styleTexto}>
                        {onPress.results[1]}
                    </Text>
                </CardSection>


                <CardSection style={styles.campo}>
                    <Text style={styles.styleLabel}>
                        Lugar:
                </Text>
                    <Text style={styles.styleTexto}>
                        {onPress.results[2]}
                    </Text>
                </CardSection>

                <CardSection style={styles.campo}>
                    <Text style={styles.styleLabel}>
                        Ubicación:
                </Text>
                    <Text style={styles.styleTexto}>
                        {onPress.results[3]}
                    </Text>
                </CardSection>
                <CardSection style={styles.campo}>
                    <Text style={styles.styleLabel}>
                        Grupo:
                </Text>
                    <Text style={styles.styleTexto}>
                        {onPress.results[4]}
                    </Text>
                </CardSection>
                <CardSection style={styles.campo}>
                    <Text style={styles.styleLabel}>
                        Fecha Inicio:
                </Text>
                    <Text style={styles.styleTexto}>
                        {onPress.results[5]}
                    </Text>
                </CardSection>

               

                <CardSection>
                    <Button onPress={() => onPress.change(false)}>
                        Ok
                </Button>
                </CardSection>
            </View>



        </Modal>


    );
};

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'rgba(0,0,0,0.75)',
        position: 'relative',
        justifyContent: 'center',
        flex: 1
        // flex: 1
    },
    campo: {
        justifyContent: 'center',
        //alignItems: 'flex-end',
    },
    styleLabel: {
        fontWeight: 'bold',
        fontSize: 15
    },
    styleTexto: {
        fontSize: 15,
        marginLeft: 5,

    }
});

export default InfoUsuario;