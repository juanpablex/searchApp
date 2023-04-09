import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, FlatList, Text, Modal, Share } from 'react-native';
import * as Sharing from 'expo-sharing';

import { Button, CardSection, InfoBox, Card } from './common'
import { MaterialIcons } from '@expo/vector-icons';

const BorrarImagen = ({ results, visible, cerrar, borrarbtn, borrar }) => {
   

    const compartir = (item) => {
        //console.log('compartiendo ulr: ', item.url);
        //console.log('compartiendo nombre ubicacion: ', item.nombrelugar, ' ', item.ubicacion);
        //console.log('compartiendo nombreprod: ', item.nombreprod);
        //Sharing.shareAsync(item.url);
        Share.share({
            //dialogTitle:'comparte',
            title: 'mira esto',
            message: item.url,
            url: item.url,
            subject: 'sujeto'
        });
    };
    const borrarfoto = (item) => {
        //console.log('borrar foto id: ', item.id);
        borrar.borrar(item.id, item.nombre)
    }

    return (

        <Modal
            visible={visible}
            transparent
            animationType="fade"
        >


            <FlatList
                style={{
                    marginTop: 10,
                    backgroundColor: 'rgba(0,0,0,0.75)',
                }}

                vertical
                transparent
                showsHorizontalScrollIndicator={false}
                data={results}
                keyExtractor={result => result.id}
                renderItem={({ item }) => {
                    return (
                        <>

                            <View style={{ alignItems: 'center' }}>
                                <Image
                                    //source={require('../imagenes/1-2.jpg')}
                                    source={{ uri: item.url }}
                                    style={styles.imageStyle}
                                />

                                {borrarbtn == true ?
                                    <CardSection>
                                        <Button
                                            //onPress={cerrar}
                                            onPress={() => compartir(item)}
                                        >
                                            <MaterialIcons
                                                name='share' size={20}

                                            />


                                        </Button>
                                        <Button
                                        //onPress={cerrar}
                                        >
                                            <MaterialIcons
                                                name='file-download' size={20}
                                            />
                                        </Button>
                                        <Button
                                            //onPress={cerrar}
                                            onPress={() => borrarfoto(item)}
                                        >
                                            <MaterialIcons
                                                name='delete' size={20}
                                            />
                                        </Button>
                                    </CardSection>
                                    :
                                    <CardSection>
                                        <Button
                                            //onPress={cerrar}
                                            onPress={() => compartir(item)}
                                        >
                                            <MaterialIcons
                                                name='share' size={20}

                                            />


                                        </Button>
                                        <Button
                                        //onPress={cerrar}
                                        >
                                            <MaterialIcons
                                                name='file-download' size={20}
                                            />
                                        </Button>
                                    </CardSection>
                                }


                            </View>
                        </>
                    )
                }}
            />

            <CardSection>
                <Button
                    onPress={cerrar}
                >Cerrar</Button>
            </CardSection>

        </Modal>
    );


}

const styles = StyleSheet.create({
    containerStyle: {
        borderRadius: 3,
        elevation: 2,
        marginTop: 30,
        shadowColor: 'rgba(0,0,0,1)',
        shadowOpacity: 0.2,
        shadowOffset: {
            height: 4,
            width: 4,
        },
        shadowRadius: 5,
        width: 250,
        alignItems: 'center'
    },
    imageContainerStyle: {
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        overflow: 'hidden',
    },
    imageStyle: {
        //flex: 1,
        // alignContent: 'center',
        // height: 250,
        // width: 250,

        borderRadius: 4,
        width: '100%',
        // Without height undefined it won't work
        height: undefined,
        // figure out your image aspect ratio
        aspectRatio: 4 / 3,

    },
})
export { BorrarImagen };