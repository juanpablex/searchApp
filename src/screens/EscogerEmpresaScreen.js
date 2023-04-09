import React, { Component } from 'react';
import {
    View, Text, StyleSheet,
    FlatList, TouchableOpacity,
    ActivityIndicator, AsyncStorage
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LISTA_EMPRESAS_X_USUARIO } from '../php/consultas';
import ElementoLista from '../components/ElementoLista';
import { navigate } from '../navigationRef';

class EscogerEmpresaScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datos: null,
            isLoading: true,
            idusuario: 0,
            idempresa: 0,
            nombreempresa: '',
            ubicacionempresa: ''
        }
    }

    async irLugares(id) {
        //console.log('props navigation: ', this.props.navigation)

        var elytokens = await AsyncStorage.getItem('elytoken');
        await AsyncStorage.removeItem();
        elytokens = elytokens + '|' + id;
        await AsyncStorage.setItem('elytoken', elytokens);
        this.props.navigation.navigate('listaLugares');
    }

    async getTokens() {
        
    }

    async componentDidMount() {
        //this.getTokens();
        this.setState({ idusuario: (await AsyncStorage.getItem('elytoken')).split('|')[0] });
      //  console.log('estoy en escoger empresa', this.state.idusuario);
        fetch(LISTA_EMPRESAS_X_USUARIO, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idusuario: this.state.idusuario
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    datos: responseJson,
                    isLoading: false
                });


            })
            .catch((error) => {
                console.error(error);
                this.setState({ isLoading: false });
            });
    }



    renderRow = (rowData) => {
        return (

            <View style={styles.containerStyle}>
                <TouchableOpacity
                    onPress={this.irLugares.bind(this, rowData.id)}>
                    <Text style={styles.labelStyle}
                    >
                        {rowData.nombre + "     " + rowData.ubicacion}
                    </Text>

                </TouchableOpacity>
            </View>


        );
    }

    renderRefreshControl = () => {
        return fetch(LISTA_EMPRESAS_X_USUARIO, {
            method: 'POST',
            headres: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idusuario: this.state.idusuario
                //tabla: 'lugares',
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({ isLoading: false, datos: responseJson });
         //       console.log('lugares');
         //       console.log(this.state.datos);
            })
            .catch((error) => {
                console.error(error);
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

EscogerEmpresaScreen.navigationOptions = ({ navigation }) => {
    return {

        headerRight: () => (
            <TouchableOpacity
                onPress={() => navigation.navigate('crearEmpresa',
                    { id: navigation.getParam('id') },
                    { ClickItemHolder: 0 }
                )

                }

            >
                <MaterialIcons name="add" size={35} />


            </TouchableOpacity>
        )
    };

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
            marginLeft: 5
        },
        containerStyle: {
            backgroundColor: '#dcdcdc',
            height: 50,
            borderRadius: 5,
            marginHorizontal: 15,
            flexDirection: 'row',
            marginTop: 5,
            marginBottom: 5,
            alignItems: 'center'

        },
        labelStyle: {
            //flex: 1,
            fontSize: 18,//<18,//14 es el default
            marginLeft: 5,
            textAlign: 'center'
        },
    });
export default EscogerEmpresaScreen;