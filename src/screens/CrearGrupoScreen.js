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
import { MaterialIcons } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements'
import {
    LISTA_PRIVILEGIOS,
    INSERTAR_GRUPO,
    MODIFICAR_GRUPO
} from '../php/consultas'
import { CardSection, Input, Button } from '../components/common';
import { navigate } from '../navigationRef';

class CrearGrupoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            cLugar: false,
            cProducto: false,
            cEmpleado: false,
            cGrupo: false,
            cVentas: false,
            cCompras: false,
            nombre: '',
            descripcion: '',
            idempresa: 0,
            idusuario: 0,
            titulo: 'Crear Grupo',
            nombreBoton: 'Guardar',
            ActivityIndicator_Loading: false,
            isLoading: true,
            editar: false
        }
    }

    async componentDidMount() {
        try {
            this.setState({
                idusuario: (await AsyncStorage.getItem('elytoken')).split('|')[0],
                idempresa: (await AsyncStorage.getItem('elytoken')).split('|')[7],

            });
            //console.log('mis grupos: ', this.state.idempresa);
            var ed = this.props.navigation.state.params.editar;
            if (ed != undefined) {
                var id = this.props.navigation.state.params.idgrupo;
                fetch(LISTA_PRIVILEGIOS, {
                    method: 'POST',
                    headres: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idgrupo: id,

                        //tabla: 'lugares',
                    })
                })
                    .then((response) => response.json())
                    .then((responseJson) => {

                        this.setState({
                            isLoading: false,
                            datos: responseJson,
                            id: responseJson[0].idgrupo,
                            nombre: responseJson[0].nombre,
                            descripcion: responseJson[0].descripcion,
                            titulo: 'Editar Grupo',
                            editar: true,
                            nombreBoton: 'Modificar'
                        });
                        //console.log('privilegios: ', this.state.datos.length);
                        for (let i = 0; i < this.state.datos.length; i++) {
                           // console.log(i + 1, responseJson[i].idprivilegio);
                            var idpriv = responseJson[i].idprivilegio;
                            //console.log('idprivilegio: ', idpriv);
                            switch (parseInt(idpriv)) {
                                case 1:
                                   // console.log('clugar: ');
                                    this.setState({ cLugar: true });
                                    break;
                                case 2:
                                    this.setState({ cEmpleado: true });
                                    break;
                                case 3:
                                    this.setState({ cProducto: true });
                                    break;
                                case 4:
                                    this.setState({ cGrupo: true });
                                    break;
                                case 5:
                                    this.setState({ cVentas: true });
                                    break;
                                case 6:
                                    this.setState({ cCompras: true });
                                    break;
                            }
                        }

                        // console.log('lugares');
                        this.props.navigation.setParams({ title: this.state.titulo });
                       // console.log('cant grupos: ', this.state.datos);
                    })
                    .catch((error) => {
                        //console.error(error, ' datos: ', this.state.datos);
                        this.setState({ isLoading: false })
                    });
            } else {

                this.setState({ isLoading: false });
            }
        } catch (error) {
            console.log('no existe token');
            this.setState({ isLoading: false });
        }


    }
    static navigationOptions = ({ navigation }) => {
        try {
            return {
                headerTitleAlign: 'center',
                title: navigation.state.params.title,


            }
        } catch (error) {
            return {
                headerTitleAlign: 'center',
                title: 'Crear Grupo',


            }
        }



    };

    guardar = () => {
        if (!this.state.editar) {
           // console.log("guardar");
            this.setState({ idestado: 1 });
            //    console.log(this.state);
            this.setState({ ActivityIndicator_Loading: true }, () => {
                fetch(INSERTAR_GRUPO,
                    {
                        method: 'post',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(
                            {
                                nombre: this.state.nombre,
                                descripcion: this.state.descripcion,
                                idempresa: this.state.idempresa,
                                idLugar: this.state.cLugar,
                                idProducto: this.state.cProducto,
                                idEmpleado: this.state.cEmpleado,
                                idGrupo: this.state.cGrupo,
                                idVentas: this.state.cVentas,
                                idCompras: this.state.cCompras


                            })
                    }).then((response) => response.text())
                    .then((responseJsonFromServer) => {

                        //console.log("ya guardo: ", responseJsonFromServer);
                        navigate("misGrupos");
                        alert(responseJsonFromServer);
                        this.setState({
                            ActivityIndicator_Loading: false, isLoading: false
                            //id: responseJsonFromServer.split('|')[1]
                        });
                        //console.log('idpersona: ', this.state.id);

                    }).catch((error) => {
                        this.setState({ ActivityIndicator_Loading: false, isLoading: false });
                    });
            });
        } else {
            //console.log("modificar");
            this.setState({ idestado: 1 });
            //console.log(this.state);
            this.setState({ ActivityIndicator_Loading: true }, () => {
                fetch(MODIFICAR_GRUPO,
                    {
                        method: 'post',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(
                            {
                                nombre: this.state.nombre,
                                descripcion: this.state.descripcion,
                                idempresa: this.state.idempresa,
                                idLugar: this.state.cLugar,
                                idProducto: this.state.cProducto,
                                idEmpleado: this.state.cEmpleado,
                                idGrupo: this.state.cGrupo,
                                idVentas: this.state.cVentas,
                                idCompras: this.state.cCompras,
                                id: this.state.id

                            })
                    }).then((response) => response.json())
                    .then((responseJsonFromServer) => {

                        //console.log("ya guardo: ", responseJsonFromServer);
                        navigate("misGrupos");
                        alert(responseJsonFromServer);
                        this.setState({ isLoading: false });
                        // this.setState({
                        //     ActivityIndicator_Loading: false, isLoading: false
                        //     //id: responseJsonFromServer.split('|')[1]
                        // });
                        //console.log('idpersona: ', this.state.id);

                    }).catch((error) => {
                        this.setState({ ActivityIndicator_Loading: false, isLoading: false });
                    });
            });
        }


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
            <ScrollView contentContainerStyle={styles.containerStyle}>
                <View >
                    <CardSection>
                        <Input label="Nombre"
                            placeholder="compras"
                            onChangeText={(texto) => this.setState({ nombre: texto })}
                            value={this.state.nombre}
                        />
                    </CardSection>
                    <CardSection>
                        <Input label="Descripcion"
                            placeholder="compra de insumos"
                            onChangeText={(texto) => this.setState({ descripcion: texto })}
                            value={this.state.descripcion}
                        />
                    </CardSection>
                    <CheckBox
                        title="Crear Lugar"
                        checked={this.state.cLugar}
                        // onChangeText={this.state.cLugar}
                        onPress={() => this.setState({ cLugar: !this.state.cLugar })}
                    />
                    <CheckBox
                        title="Crear Empleado"
                        checked={this.state.cEmpleado}
                        onPress={() => this.setState({ cEmpleado: !this.state.cEmpleado })}
                    />
                    <CheckBox
                        title="Crear Producto"
                        checked={this.state.cProducto}
                        onPress={() => this.setState({ cProducto: !this.state.cProducto })}
                    />
                    <CheckBox
                        title="Crear Grupo"
                        checked={this.state.cGrupo}
                        onPress={() => this.setState({ cGrupo: !this.state.cGrupo })}
                    />
                    <CheckBox
                        title="Ventas"
                        checked={this.state.cVentas}
                        onPress={() => this.setState({ cVentas: !this.state.cVentas })}
                    />
                    <CheckBox
                        title="Compras"
                        checked={this.state.cCompras}
                        onPress={() => this.setState({ cCompras: !this.state.cCompras })}
                    />
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
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    ActivityIndicatorStyle: {

        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'

    },
    containerStyle: {
        //backgroundColor: 'rgba(0,0,0,0.75)',
        //position: 'relative',
        justifyContent: 'center',
        flexGrow: 1
        //flex: 1
    }
});

// CrearGrupoScreen.navigationOptions = ({ navigation }) => {
//     return {
//         headerRight: () => (
//             <TouchableOpacity
//                 onPress={() => navigation.navigate('crearFoto')}
//             >
//                 <MaterialIcons name='add' size={35} />
//             </TouchableOpacity>
//         )
//     };
// }

export default CrearGrupoScreen;