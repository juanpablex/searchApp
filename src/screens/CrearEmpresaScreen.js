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
import { Button, CardSection, Input } from '../components/common';
import { navigate } from '../navigationRef';
import { INSERTAR_EMPRESA } from '../php/consultas';
import KeyboardSpacer from 'react-native-keyboard-spacer';
class CrearEmpresaScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            nombre: '',
            razonsocial: '',
            descripcion: '',
            latitud: 0,
            longitud: 0,
            telefonos: '',
            ubicacion: '',
            nit: '',
            idestado: 0,
            idusuario: 0,
            fecha: '',
            pass: '',
            ActivityIndicator_Loading: false,

        }
    }

    componentDidMount() {
        //console.log('crear empresa: ', this.props.navigation.state.params.idpersona);
        var a = this.props.navigation.state.params.idusu.slice(0, -1);
        var b = this.props.navigation.state.params.password;
        this.setState({ idusuario: parseInt(a), pass: b });
       // console.log('idpersona: ', a);
    }

    guardar = () => {
       // console.log("guardar");
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
                            fecha: this.state.fecha
                        })
                }).then((response) => response.text())
                .then((responseJsonFromServer) => {

                   // console.log("ya guardo: ", this.state);
                    alert(responseJsonFromServer);
                    this.setState({
                        ActivityIndicator_Loading: false,
                        //id: responseJsonFromServer.split('|')[1]
                    });
                    //this.guardarAsyncStorage();
                    navigate('login');
                }).catch((error) => {
                    this.setState({ ActivityIndicator_Loading: false });
                });
        });

    }

    async guardarAsyncStorage() {
        //await AsyncStorage.setItem('elytoken', this.state.idusuario + '|' + this.state.pass);
        //navigate('listaLugares', { idusuario: this.state.idusuario });
        navigate('login');
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.containerStyle}>
                <View >
                    <CardSection >
                        <Input label="Nit"
                            placeholder="4665411554"
                            onChangeText={(texto) => this.setState({ nit: texto })}
                            value={this.state.nit}
                        />
                    </CardSection >

                    <CardSection >
                        <Input label="Nombre"
                            placeholder="pasteleria ely"
                            onChangeText={(texto) => this.setState({ nombre: texto })}
                            value={this.state.nombre}
                        />
                    </CardSection >

                    <CardSection>
                        <Input label="Razon Social"
                            placeholder="repostreria"
                            onChangeText={(texto) => this.setState({ razonsocial: texto })}
                            value={this.state.razonsocial}
                        />
                    </CardSection>

                    <CardSection >
                        <Input label="Descripcion"
                            placeholder="tortería y repostrería"
                            onChangeText={(texto) => this.setState({ descripcion: texto })}
                            value={this.state.descripcion}
                        />
                    </CardSection >

                    <CardSection >
                        <Input label="Ubicacion"
                            placeholder="av japon"
                            onChangeText={(texto) => this.setState({ ubicacion: texto })}
                            value={this.state.ubicacion}
                        />
                    </CardSection >

                    <CardSection>
                        <Input label="Telefonos"
                            placeholder="555788454"
                            onChangeText={(texto) => this.setState({ telefonos: texto })}
                            value={this.state.telefonos}
                        />
                    </CardSection>

                    <CardSection >

                        {this.state.ActivityIndicator_Loading ?
                            <ActivityIndicator color='#009688' size='large'
                                style={styles.ActivityIndicatorStyle}
                            />
                            : <Button
                                onPress={this.guardar}
                            >
                                <Text>guardar</Text>
                            </Button>}

                    </CardSection>



                </View>
                <KeyboardSpacer />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        //backgroundColor: 'rgba(0,0,0,0.75)',
        //position: 'relative',
        justifyContent: 'flex-start',
        flexGrow: 1
        //flex: 1
    }
});

// CrearEmpresaScreen.navigationOptions = ({ navigation }) => {
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

export default CrearEmpresaScreen;