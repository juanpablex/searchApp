import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { Button, CardSection, Input } from '../components/common';
import { navigate } from '../navigationRef';
import { INSERTAR_USUARIO } from '../php/consultas';
class CrearUsuarioScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            usuario: '',
            pass: '',
            idpersona: 0,
            idestado: 0,
            idgrupo: 0,
            idtipousuario: 0,
            fecini: '',
            ActivityIndicator_Loading: false
        }
    }
    componentDidMount() {
        //console.log('crear empresa: ', this.props.navigation.state.params.idpersona);

        var b = this.props.navigation.state.params.idpersona.slice(0, -1);
        this.setState({

            idpersona: b,
            idestado: 1,
            idtipousuario: 1,
            idgrupo: 1
        });



    }

    guardar = () => {
        //console.log("guardar");

       // console.log(this.state);
        this.setState({ ActivityIndicator_Loading: true }, () => {
            fetch(INSERTAR_USUARIO,
                {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            usuario: this.state.usuario,
                            pass: this.state.pass,
                            idpersona: this.state.idpersona,
                            idestado: this.state.idestado,
                            idgrupo: this.state.idgrupo,
                            idtipousuario: this.state.idtipousuario,
                            fecini: this.state.fecini
                        })
                }).then((response) => response.text())
                .then((responseJsonFromServer) => {

                 //   console.log("ya guardo: ", responseJsonFromServer);
                    alert(responseJsonFromServer.split('|')[0]);
                    this.setState({
                        ActivityIndicator_Loading: false,
                        id: responseJsonFromServer.split('|')[1]
                    });
                  //  console.log('idusuario: ', this.state.id);
                    navigate('crearEmpresa', { idusu: this.state.id, password: this.state.pass });
                }).catch((error) => {
                    this.setState({ ActivityIndicator_Loading: false });
                });
        });

    }

    // mainFlow() {
    //     navigate('mainFlow');
    // }
    render() {
        return (
            <ScrollView contentContainerStyle={styles.containerStyle}>
                <View>
                    <CardSection >
                        <Input label="Usuario"
                            placeholder="gisel"
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
                            onPress={this.guardar}
                        >
                            <Text> guardar</Text>
                        </Button>
                    </CardSection>

                </View>
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

export default CrearUsuarioScreen;