import React, { Component } from 'react';
import {
    View, Text, StyleSheet,
    FlatList, TouchableOpacity,
    ActivityIndicator,
    AsyncStorage
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LISTA_MIS_GRUPOS } from '../php/consultas';
import ElementoLista from '../components/ElementoLista';
import { NavigationEvents } from 'react-navigation';

class MisGruposScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idusuario: 0,
            idempresa: 0,
            datos: null,
            titulo: 'Crear Grupo',
            nombreBoton: 'Guardar Grupo',
            ActivityIndicator_Loading: false,
            isLoading: true

        }
    }

    abrirDetalles(id) {
        //console.log('props navigation: ', this.props.navigation)
        this.props.navigation.navigate('crearGrupo', { idgrupo: id, editar: true });
    }

    async componentDidMount() {
        this.setState({
            idusuario: (await AsyncStorage.getItem('elytoken')).split('|')[0],
            idempresa: (await AsyncStorage.getItem('elytoken')).split('|')[7],

        });
       // console.log('mis grupos: ', this.state.idempresa);
        return fetch(LISTA_MIS_GRUPOS, {
            method: 'POST',
            headres: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idempresa: this.state.idempresa,
                //tabla: 'lugares',
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    datos: responseJson
                });
                // console.log('lugares');
            //    console.log('cant grupos: ', this.state.datos);
            })
            .catch((error) => {
                //console.error(error, ' datos: ', this.state.datos);
                this.setState({ isLoading: false })
            });
    }



    renderRow = (rowData) => {
        return (
            // <Text style={styles.rowViewContainer}
            //     onPress={this.abrirDetalles.bind(this, rowData.id)}>
            //     {rowData.id + ' '}
            //     {rowData.nombre + ' '}
            //     {rowData.ubicacion}

            // </Text>

            <ElementoLista
                label={rowData.nombre}
                onPressText={this.abrirDetalles.bind(this, rowData.id)}
            >

            </ElementoLista>


        );
    }

    renderRefreshControl = () => {
        return fetch(LISTA_MIS_GRUPOS, {
            method: 'POST',
            headres: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idempresa: this.state.idempresa,
                //tabla: 'lugares',
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({ isLoading: false, datos: responseJson });
         //       console.log('lugares');
        //        console.log(this.state.datos);
            })
            .catch((error) => {
                //console.error(error);
                this.setState({ isLoading: false });
            });
    }
    static navigationOptions = ({ navigation }) => {

        return {
            headerTitleAlign: 'center',
            title: "Mis Grupos",
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => navigation.navigate('crearGrupo')}>
                    <MaterialIcons name='add' size={35} />
                </TouchableOpacity>
            )

        }




    };

    async rerender() {
        return fetch(LISTA_MIS_GRUPOS, {
            method: 'POST',
            headres: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idempresa: this.state.idempresa,
                //tabla: 'lugares',
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    datos: responseJson
                });
                // console.log('lugares');
             //   console.log('cant grupos: ', this.state.datos);
            })
            .catch((error) => {
                //console.error(error, ' datos: ', this.state.datos);
                this.setState({ isLoading: false })
            });
    }

    render() {

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (
            <View style={styles.MainContainer}>
                <NavigationEvents
                    onDidFocus={this.rerender.bind(this)}
                />
                <FlatList
                    data={this.state.datos}
                    renderItem={({ item: rowData }) => this.renderRow(rowData)}
                    onRefresh={() => this.renderRefreshControl()}
                    refreshing={this.state.isLoading}
                    keyExtractor={(item, index) => item.id}
                />
            </View>
        );

    }

}

const styles = StyleSheet.create(
    {
        MainContainer:
        {
            justifyContent: 'center',
            flex: 1,
            margin: 10

        },

        rowViewContainer: {
            fontSize: 20,
            paddingRight: 10,
            paddingTop: 10,
            paddingBottom: 10,
        },

        textViewContainer: {

            padding: 5,
            fontSize: 20,
            color: '#000',
        }
    });
export default MisGruposScreen;