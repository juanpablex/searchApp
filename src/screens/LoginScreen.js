import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator, AsyncStorage
} from 'react-native';
import { navigate } from '../navigationRef';
import { Button, Card, CardSection, Input } from '../components/common';
import { LOGIN, LUGAR_USUARIO } from '../php/consultas';

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            usuario: '',
            pass: '',
            idpersona: 0,
            idestado: 0,
            idtipousuario: 0,
            idgrupo: 0,
            fecini: '',
            ActivityIndicator_Loading: false,
            isLoading: true,
            datos: null,
            datoslu: null,
            idlugar: 0,
            idul: 0
        }
    }

    login() {
     //   console.log('estoy en login');

        if (this.state.usuario === '' || this.state.pass === '') {
            alert('Debe ingresar su usuario y contraseña');
        } else {
         //   console.log('estoy en el else de login');
            this.setState({ isLoading: true }, () => {
                fetch(LOGIN,
                    {
                        method: 'post',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(
                            {
                                usuario: this.state.usuario,
                                pass: this.state.pass
                            })
                    }).then((response) => response.json())
                    .then((responseJson) => {

                        //console.log("ya guardo: ", this.state);
                        //alert(responseJson);
                        this.setState({


                            datos: responseJson,
                            id: responseJson[0].id,
                            usuario: responseJson[0].usuario,
                            pass: responseJson[0].pass,
                            idpersona: responseJson[0].idpersona,
                            idestado: responseJson[0].idestado,
                            idgrupo: responseJson[0].idgrupo,
                            idtipousuario: responseJson[0].idtipousuario,
                            fecini: responseJson[0].fecini
                        });
                        //navigate("login");
                     //   console.log('states: ', this.state.usuario, ' ', this.state.pass);
                        this.ingresar();
                    }).catch((error) => {
                        alert('Datos erróneos');
                        this.setState({ isLoading: false, usuario: '', pass: '' });
                    });
            });
        }

    }

    async token() {
        let token = await AsyncStorage.getItem('elytoken');
        //await AsyncStorage.removeItem('elytoken');
       // console.log('///////////////componentdidmount_token: ', token);
        if (token) {
            var a = parseInt(token.split('|')[0].toString());
            //this.setState({ id: parseInt(token.split('|')[0].toString()) });
            this.setState({ id: a, isLoading: false });
           // console.log('componentdidmount_id', this.state.id);
            navigate('listaLugares', { idusuario: this.state.id });

        } else { 

            //this.login();
            this.setState({ isLoading: false });
        }
        //this.setState({ isLoading: false });
      //  console.log('loading: ', this.state.isLoading, ', id: ', this.state.id);
    }

    componentDidMount() {
        try {
            this.token();


        } catch (error) {
            console.log('error de asyncrono: ', error);
        }

    }

    // async componentDidUpdate(prevProps, prevState) {
    //     if (prevState.id !== this.state.id) {
    //         console.log('id ha cambiado: ', this.state.datos);
    //         console.log('componentdidupdate: ', await AsyncStorage.getItem('elytoken'));
    //         //navigate('listaLugares', { idusuario: this.state.id });
    //     } else {
    //         console.log('id no ha cambiado');
    //     }
    // }



    async ingresar() {
        await AsyncStorage.setItem('elytoken',
            this.state.id + '|'//0 idusuario 
            + this.state.pass + '|'//1 idpassword
            + this.state.usuario + '|'//2 nick
            + this.state.idpersona + '|'//3 
            + this.state.idgrupo + '|'//4
            + this.state.idtipousuario + '|'//5
            + this.state.fecini);//6
       // console.log('ingresar_token: ', await AsyncStorage.getItem('elytoken'));
        //this.setState({ isLoading: true });
        //this.setState({ isLoading: false });
        if (this.state.idtipousuario == 1) {
         //   console.log('estoy en el if de idtipousuario');
            navigate('escogerEmpresa');
            this.setState({ isLoading: false });
        } else {
            this.getLugarUsuario();
        }


    }

    getLugarUsuario() {
        fetch(LUGAR_USUARIO,
            {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        idusuario: this.state.id,

                    })
            }).then((response) => response.json())
            .then((responseJson) => {

                //console.log("ya guardo: ", this.state);
                //alert(responseJson);
                this.setState({
                    datoslu: responseJson,
                    idlugar: responseJson[0].idlugar,
                    idul: responseJson[0].id,
                });
                //navigate("login");
            //    console.log('states lugarusuario: ', this.state.idul, ' ', this.state.idlugar);
                this.setElyTokens();

            }).catch((error) => {
                alert('Datos erróneos');
                this.setState({ isLoading: false, usuario: '', pass: '' });
            });

    }

    async setElyTokens() {
        var elytokens = await AsyncStorage.getItem('elytoken');
        await AsyncStorage.removeItem();
        elytokens = elytokens + '|' + this.state.idlugar;
        await AsyncStorage.setItem('elytoken', elytokens);
        this.props.navigation.navigate('listaLugares');
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
            <View style={{ marginTop: 60 }}>


                <CardSection >
                    <Input label="Usuario"
                        placeholder="user"
                        onChangeText={(texto) => this.setState({ usuario: texto })}
                        value={this.state.usuario}
                    />
                </CardSection >

                <CardSection>
                    <Input label="Password"
                        placeholder="12345"
                        onChangeText={(texto) => this.setState({ pass: texto })}
                        value={this.state.pass}
                        secureTextEntry={true}
                    />
                </CardSection>

                <CardSection >
                    <Button
                        onPress={this.login.bind(this)}
                    >
                        <Text> ingresar</Text>
                    </Button>
                </CardSection>

                <CardSection style={styles.crearStyle}>
                    <TouchableOpacity onPress={() => navigate('crearPersona')}>
                        <Text style={{ color: '#007aff', marginTop: 30 }}>Crear Cuenta</Text>
                    </TouchableOpacity>
                </CardSection>


            </View >

        );
    }
}

const styles = StyleSheet.create({

    containerStyle: {
        backgroundColor: 'rgba(0,0,0,0.75)',
        position: 'relative',
        justifyContent: 'center',
        flexGrow: 1,

    },
    crearStyle: {
        backgroundColor: 'rgba(52,52,52,0)',
        alignSelf: 'center'
    }

});


export default LoginScreen;