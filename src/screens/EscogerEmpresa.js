import React, { useState } from 'react';
import { Text, View, Modal, StyleSheet, ScrollView, FlatList } from 'react-native';
import { CardSection, Button, Input, Card } from '../components/common';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { navigate } from '../navigationRef';
import { ElementoLista } from '../components/ElementoLista';

class EscogerEmpresa extends Component {

    abriLugares(id) {
        //console.log('props navigation: ', this.props.navigation)

        navigate('listaLugares', { idusuario: id });
    }
    renderRow() {
        return (
            <ElementoLista
                label={rowData.id + " " + rowData.nombre + " " + rowData.ubicacion}
                onPressText={this.abrirLugares.bind(this, rowData.id)}
            >

            </ElementoLista>
        );
    };
    render() {
        if (!results.length) {
            return null;
        }
        return (

            <ScrollView contentContainerStyle={styles.containerStyle}>
                <View>
                    <CardSection>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={results}
                            keyExtractor={result => result.id}
                            onRefresh={renderRefreshControl}
                            refreshing={isLoading}
                            renderItem={({ item: rowData }) => renderRow(rowData)}
                        />
                    </CardSection>
                </View>
            </ScrollView>

        );
    }

}

const styles = StyleSheet.create({

    containerStyle: {
        backgroundColor: 'rgba(0,0,0,0.75)',
        position: 'relative',
        justifyContent: 'center',
        flex: 1
        // flex: 1
    }

});

export { EscogerEmpresa };