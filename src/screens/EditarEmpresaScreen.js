import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    AsyncStorage
} from 'react-native';
import { Button, CardSection, Input, InfoBox } from '../components/common';
import { navigate } from '../navigationRef';
import { GET_EMPRESA_X_ID, INSERTAR_EMPRESA } from '../php/consultas';
import { MaterialIcons } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
class EditarEmpresaScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titulo: 'Crear Empresa',
            idusuario: 0,
            datos: null,
            nombreBoton: 'Guardar',
            isLoading: true,
            nombre: '',
            ubicacion: '',
            descripcion: '',
            razonsocial: '',
            latitud: 0.00,
            longitud: 0.00,
            nit: '',
            telefonos: '',
            ActivityIndicator_Loading: false
        };
    }

    async componentDidMount() {
        try {
            if (await AsyncStorage.getItem('elytoken') != null) {
                this.setState({ idusuario: (await AsyncStorage.getItem('elytoken')).split('|')[0] });
            }
            if (this.props.navigation.state.params.editar == true) {
                var id = this.props.navigation.state.params.id;
               // console.log('idempresa en editar empresa: ', id);
                try {
                    await fetch(GET_EMPRESA_X_ID, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            idempresa: id
                        })
                    })
                        .then((response) => response.json())
                        .then((responseJson) => {
                            this.setState({
                                datos: responseJson,
                                titulo: 'Editar Empresa',
                                nombreBoton: 'Modificar',
                                nombre: responseJson[0].nombre,
                                descripcion: responseJson[0].descripcion,
                                telefonos: responseJson[0].telefonos,
                                razonsocial: responseJson[0].razonsocial,
                                nit: responseJson[0].nit,
                                ubicacion: responseJson[0].ubicacion,
                            });
                       //     console.log('no salio error');
                            this.props.navigation.setParams({ title: this.state.titulo });
                        })
                        .catch((error) => {
                         //   console.log('error en fetch: ', error);
                            this.setState({ isLoading: false });
                        });
                } catch (error) {
                    console.log('error editarEmpresa: ', error);
                }
            } else {
                this.setState({ isLoading: false })
            }
        } catch (error) {
            this.setState({ isLoading: false });
        }
        this.props.navigation.setParams({ title: this.state.titulo });
    }

    static navigationOptions = ({ navigation }) => {
        try {
            return {
                headerTitleAlign: 'center',
                title: navigation.state.params.title,
                //title: 'asdf',
                headerRight: () => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('editarEmpresa')}>
                        <MaterialIcons name='add' size={35} />
                    </TouchableOpacity>
                )

            }
        } catch (error) {
            return {
                headerTitleAlign: 'center',
                title: 'Mis Empresas',
                // headerRight: () => (
                //     <TouchableOpacity
                //         onPress={() => navigation.navigate('crearFoto')}>
                //         <MaterialIcons name='add' size={35} />
                //     </TouchableOpacity>
                // )

            }
        }



    };

    guardar = () => {
      //  console.log("guardar");
        this.setState({ idestado: 1 });
        // console.log(this.state);
        this.setState({ ActivityIndicator_Loading: true }, () => {
            fetch(INSERTAR_EMPRESA,
                {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            nombre: this.state.nombre,
                            razonsocial: this.state.razonsocial,
                            descripcion: this.state.descripcion,
                            latitud: this.state.latitud,
                            longitud: this.state.longitud,
                            telefonos: this.state.telefonos,
                            ubicacion: this.state.ubicacion,
                            nit: this.state.nit,
                            idestado: this.state.idestado,
                            idusuario: this.state.idusuario,
                            //isLoading: false
                            //fecha: this.state.fecha
                        })
                }).then((response) => response.text())
                .then((responseJsonFromServer) => {

                    //console.log("ya guardo: ", this.state);

                    navigate('misEmpresas');
                    alert(responseJsonFromServer);
                    this.setState({
                        ActivityIndicator_Loading: false, isLoading: false

                    });


                }).catch((error) => {
                    console.log('error de insertar empresa');
                    this.setState({ ActivityIndicator_Loading: false, isLoading: false });
                });
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
            <FlatList
                ListHeaderComponent={
                    <>
                        <View style={StyleSheet.MainContainer}>
                            <CardSection >
                                <Input label="Nit"
                                    placeholder="8849849"
                                    onChangeText={(texto) => this.setState({ nit: texto })}
                                    value={this.state.nit}
                                />
                            </CardSection >
                            <CardSection >

                                <Input label="Nombre"
                                    placeholder="empresa"
                                    onChangeText={(texto) => this.setState({ nombre: texto })}
                                    value={this.state.nombre}
                                />
                            </CardSection >
                            <CardSection >
                                <Input label="Razon Social"
                                    placeholder="razon social"
                                    onChangeText={(texto) => this.setState({ razonsocial: texto })}
                                    value={this.state.razonsocial}
                                />
                            </CardSection >
                            <CardSection >
                                <Input label="Descripción"
                                    placeholder="descripcion"
                                    onChangeText={(texto) => this.setState({ descripcion: texto })}
                                    value={this.state.descripcion}
                                />
                            </CardSection >
                            <CardSection >
                                <Input label="Teléfonos"
                                    placeholder="77789789"
                                    onChangeText={(texto) => this.setState({ telefonos: texto })}
                                    value={this.state.telefonos}
                                />
                            </CardSection >

                        </View>
                    </>
                }
                ListFooterComponent={
                    <CardSection >


                        {this.state.ActivityIndicator_Loading ?
                            <ActivityIndicator color='#009688' size='large'
                                style={styles.ActivityIndicatorStyle}
                            />
                            : <Button
                                onPress={this.guardar}
                            >
                                <Text>{this.state.nombreBoton}</Text>
                            </Button>}


                    </CardSection>
                }
            />

        );


    }
}

const styles = StyleSheet.create({
    MainContainer:
    {
        justifyContent: 'center',
        flex: 1,
        margin: 10

    },
    ActivityIndicatorStyle: {

        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'

    }
});



export default EditarEmpresaScreen;