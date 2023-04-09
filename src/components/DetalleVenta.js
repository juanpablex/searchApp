import React from 'react';
import { StyleSheet, Modal, ScrollView, FlatList } from 'react-native';
import { Button, CardSection, InfoBox, Card } from './common'

const DetalleVenta = ({ results, visible, cerrarPress }) => {
    //console.log('detalles venta: ', results);
    if (!results.length) {
        return null;
    }
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"

        //onRequestClose={onRequestClose}
        >

            {/* <ScrollView contentContainerStyle={styles.containerStyle}> */}
            <FlatList
                //contentContainerStyle={styles.containerStyle}
                style={{
                    marginTop: 10,
                    backgroundColor: 'rgba(0,0,0,0.75)',
                    //justifyContent: 'center'

                }}
                vertical
                transparent
                showsHorizontalScrollIndicator={false}
                data={results}
                keyExtractor={result => result.id}
                //contentContainerStyle={styles.containerStyle}
                renderItem={({ item }) => {
                    //return <Text>{item.name}</Text>
                    return (


                        <>
                            <Card>
                                <CardSection>
                                    <InfoBox label='Nombre : ' value={item.nombre}></InfoBox>
                                </CardSection>
                                <CardSection>
                                    <InfoBox label='Precio : ' value={item.precio}></InfoBox>
                                </CardSection>
                                <CardSection>
                                    <InfoBox label='Stock : ' value={item.stock}></InfoBox>
                                </CardSection>
                                <CardSection>
                                    <InfoBox label='Cantidad : ' value={item.cant}></InfoBox>
                                </CardSection>
                                <CardSection>
                                    <InfoBox label='Total : ' value={item.total}></InfoBox>
                                </CardSection>
                            </Card>
                        </>



                    )
                }}
            />
            <CardSection>
                <Button
                    onPress={cerrarPress}
                >Cerrar</Button>

            </CardSection>
            {/* </ScrollView> */}
        </Modal>
    );
}


const styles = StyleSheet.create({
    containerStyle: {
        marginTop: 10,
        //backgroundColor: 'rgba(0,0,0,0.75)',
        //position: 'relative',
        justifyContent: 'center',
        //flex: 1
        // flex: 1

    }
});

export { DetalleVenta };