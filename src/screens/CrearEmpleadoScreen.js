import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    AsyncStorage,
    FlatList
} from 'react-native';
import { CheckBox } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons';
import { Button, CardSection, Input, InfoBox } from '../components/common';
import { navigate } from '../navigationRef';
import {
    INSERTAR_EMPLEADO,
    LISTA_EMPLEADO_X_ID,
    LISTA_MIS_GRUPOS,
    LISTA_LUGARES_X_EMPRESA,
    MODIFICAR_EMPLEADO
} from '../php/consultas';
import ElementoLista from '../components/ElementoLista';
import { BoxGrupos } from '../components/BoxGrupos';
class CrearEmpleadoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            nombres: '',
            apellidos: '',
            latitud: 0,
            longitud: 0,
            telefonos: '',
            direccion: '',
            idestado: 0,
            fecha: '',
            idusuario: 0,
            idempresa: 0,
            usuario: '',
            pass: '',
            idlugar: 0,
            idgrupo: 0,
            nombregrupo: '',
            datos: null,
            datosg: null,
            datose: null,
            listagrupos: [],
            listalugares: [],
            //escogergrupo: false,
            titulo: 'Crear Empleado',
            nombreBoton: 'Guardar',
            ActivityIndicator_Loading: false,
            isLoading: true,
            editar: false
        }
    }

    async componentDidMount() {
        try {
            var valorid = -1;
            //console.log('token: ', await AsyncStorage.getItem('elytoken'));

            if (await AsyncStorage.getItem('elytoken') != null) {
                this.setState({
                    idusuario: (await AsyncStorage.getItem('elytoken')).split('|')[0],
                    idempresa: (await AsyncStorage.getItem('elytoken')).split('|')[7]
                });
            }

            if (this.props.navigation.state.params.editar == true) {
                var ed = this.props.navigation.state.params.editar;
                var id = this.props.navigation.state.params.idpersona;
                //console.log('editar: ', ed, ', idpersona: ', id);
                try {
                    await fetch(LISTA_EMPLEADO_X_ID, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            id: id
                        })
                    }).then((response) => response.json())
                        .then((responseJson) => {
                            this.setState({
                                datos: responseJson,
                                id: responseJson[0].id,
                                nombres: responseJson[0].nombres,
                                apellidos: responseJson[0].apellidos,
                                telefonos: responseJson[0].telefonos,
                                idestado: responseJson[0].idestado,
                                direccion: responseJson[0].direccion,
                                fecha: responseJson[0].fecha,
                                usuario: responseJson[0].usuario,
                                idusuario: responseJson[0].idusuario,
                                idlugar: responseJson[0].idlugar,
                                idgrupo: responseJson[0].idgrupo,
                                nombregrupo: responseJson[0].nombregrupo,
                                //isLoading: false,
                                titulo: 'Editar Empleado',
                                nombreBoton: 'Modificar',
                                editar: ed
                            });
                            this.props.navigation.setParams({ title: this.state.titulo });
                            //console.log('idempresa: ', this.state.idempresa, ', idlugar: ', this.state.idlugar,
                            //    ', idgrupo: ', this.state.idgrupo);



                        })
                        .catch((error) => {
                            console.error(error);
                            this.setState({ isLoading: false });
                        });


                    await fetch(LISTA_MIS_GRUPOS, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            idempresa: this.state.idempresa,
                            //tabla: 'lugares',
                        })
                    })
                        .then((response2) => response2.json())
                        .then((responseJson2) => {

                            this.setState({
                                //isLoading: false,
                                datosg: responseJson2
                            });
                            // console.log('lugares');
                           // console.log('cant grupos: ', this.state.datosg);


                        })
                        .catch((error) => {
                            //console.error(error, ' datos: ', this.state.datos);
                            this.setState({ isLoading: false })
                        });


                    await fetch(LISTA_LUGARES_X_EMPRESA, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            idempresa: this.state.idempresa,
                            //tabla: 'lugares',
                        })
                    })
                        .then((response4) => response4.json())
                        .then((responseJson4) => {

                            this.setState({
                                isLoading: false,
                                datose: responseJson4
                            });
                            // console.log('lugares');
                            //console.log('cant lugares: ', this.state.datose);
                        })
                        .catch((error) => {
                            console.error(error, ' datos: ', this.state.datose);
                            this.setState({ isLoading: false })
                        });

                    //valorid = this.state.idgrupo;
                    //this.setCheckedGrupos();
                } catch (error) {
                    console.log('error editar 1: ', error);
                }
            } else {
                //this.setState({ isLoading: false });
                //console.log('editar empleado es falso');
                await fetch(LISTA_MIS_GRUPOS, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idempresa: this.state.idempresa,
                        //tabla: 'lugares',
                    })
                })
                    .then((response3) => response3.json())
                    .then((responseJson3) => {

                        this.setState({
                            //isLoading: false,
                            datosg: responseJson3
                        });
                        // console.log('lugares');
                       // console.log('cant grupos: ', this.state.datosg);
                    })
                    .catch((error) => {
                        //console.error(error, ' datos: ', this.state.datos);
                        this.setState({ isLoading: false })
                    });

                await fetch(LISTA_LUGARES_X_EMPRESA, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idempresa: this.state.idempresa,
                        //tabla: 'lugares',
                    })
                })
                    .then((response4) => response4.json())
                    .then((responseJson4) => {

                        this.setState({
                            isLoading: false,
                            datose: responseJson4
                        });
                        // console.log('lugares');
                       // console.log('cant lugares: ', this.state.datose);
                    })
                    .catch((error) => {
                        //console.error(error, ' datos: ', this.state.datos);
                        this.setState({ isLoading: false })
                    });

            }
            //valorid = this.state.idgrupo;
            var lg = [];
            lg = this.getGrupos();
            //console.log('lg: ', lg);
            if (lg == undefined) {

                navigate('misEmpleados');
                alert('Debe crear un grupo');
            }
            this.getLugares();
        } catch (error) {
            console.log('no existe token');
            this.setState({ isLoading: false });
        }

    }

    guardar = () => {
        if (!this.state.editar) {
           // console.log("guardar");
            this.setState({ idestado: 1 });
            //console.log(this.state);
            this.setState({ ActivityIndicator_Loading: true }, () => {
                fetch(INSERTAR_EMPLEADO,
                    {
                        method: 'post',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(
                            {
                                idlugar: this.state.idlugar,
                                nombres: this.state.nombres,
                                apellidos: this.state.apellidos,
                                direccion: this.state.direccion,
                                latitud: this.state.latitud,
                                longitud: this.state.longitud,
                                telefonos: this.state.telefonos,
                                idgrupo: this.state.idgrupo,
                                //idestado: this.state.idestado,
                                //fecha: this.state.fecha,
                                usuario: this.state.usuario,
                                pass: this.state.pass,
                                //idgrupo:this.state.idgrupo
                            })
                    }).then((response) => response.text())
                    .then((responseJsonFromServer) => {
                       // console.log("ya guardo: ", responseJsonFromServer);
                        alert(responseJsonFromServer.split('|')[0]);
                        this.setState({
                            ActivityIndicator_Loading: false,
                            //id: responseJsonFromServer.split('|')[1]
                        });
                       // console.log('idpersona: ', this.state.id);
                        navigate("misEmpleados");
                    }).catch((error) => {
                        this.setState({ ActivityIndicator_Loading: false });
                    });
            });
        } else {
            //console.log("modificar");
            this.setState({ idestado: 1 });
            //console.log(this.state);
            this.setState({ ActivityIndicator_Loading: true }, () => {
                fetch(MODIFICAR_EMPLEADO,
                    {
                        method: 'post',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(
                            {
                                id: this.state.id,
                                idlugar: this.state.idlugar,
                                nombres: this.state.nombres,
                                apellidos: this.state.apellidos,
                                direccion: this.state.direccion,
                                //latitud: this.state.latitud,
                                //longitud: this.state.longitud,
                                idusuario: this.state.idusuario,
                                telefonos: this.state.telefonos,
                                idgrupo: this.state.idgrupo,
                                //idestado: this.state.idestado,
                                //fecha: this.state.fecha,
                                usuario: this.state.usuario,
                                //pass: this.state.pass,
                                //idgrupo:this.state.idgrupo
                            })
                    }).then((response) => response.text())
                    .then((responseJsonFromServer) => {
                       // console.log("ya guardo: ", responseJsonFromServer);
                        alert(responseJsonFromServer.split('|')[0]);
                        this.setState({
                            ActivityIndicator_Loading: false,
                            //id: responseJsonFromServer.split('|')[1]
                        });
                       // console.log('idpersona: ', this.state.id);
                        //navigate("crearUsuario", { idpersona: this.state.id });
                    }).catch((error) => {
                        this.setState({ ActivityIndicator_Loading: false });
                    });
            });
        }

    }

    static navigationOptions = ({ navigation }) => {
        try {
           // console.log('navigation: ', navigation.state.params.title);
            if (navigation.state.params.title == 'Editar Empleado') {
                return {
                    headerTitleAlign: 'center',
                    title: navigation.state.params.title,
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('crearFoto')}>
                            <MaterialIcons name='add' size={35} />
                        </TouchableOpacity>
                    )

                }
            } else {
               // console.log('else del navigationoptions crear empleado');
                return {
                    headerTitleAlign: 'center',
                    title: 'Crear Empleado',
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('crearFoto')}>
                            <MaterialIcons name='add' size={35} />
                        </TouchableOpacity>
                    )

                }
            }
        } catch (error) {
            return {
                headerTitleAlign: 'center',
                title: 'Crear Empleado',
                headerRight: () => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('crearFoto')}>
                        <MaterialIcons name='add' size={35} />
                    </TouchableOpacity>
                )

            }
        }



    };

    setCheckedGrupos(id) {
        if (id == undefined) {
            return;
        }
        var c = false;
        var idg = 0;
        var listaaux = [];
        for (var j = 0; j < this.state.listagrupos.length; j++) {
            listaaux[j] = {
                idgrupo: this.state.listagrupos[j].idgrupo,
                nombregrupo: this.state.listagrupos[j].nombregrupo,
                checked: this.state.listagrupos[j].checked
            }
        }
        //console.log('listaaux j: ', listaaux);
        for (var i = 0; i < listaaux.length; i++) {
            if (id == listaaux[i].idgrupo) {
                listaaux[i].checked = !listaaux[i].checked;
                //console.log('listagrupos i: ', this.state.listagrupos);
                //return listaaux[i].checked;
                c = listaaux[i].checked;
                if (c == true) {
                    idg = id;
                } else {
                    idg = 0;
                }

            } else {
                listaaux[i].checked = false;
            }
        }
        this.setState({ listagrupos: listaaux, idgrupo: idg });
        return c;
    }

    getCheckedGrupo(id) {
        //if (this.state.escogergrupo == true) {
        //console.log('getcheckedgrupo: ', id);
        for (var i = 0; i < this.state.listagrupos.length; i++) {
            if (id == this.state.listagrupos[i].idgrupo) {
                //     valor = this.state.listagrupos[i].checked;

                // } else {
                //console.log('getcheckedgrupo: ', this.state.listagrupos[i]);
                return this.state.listagrupos[i].checked
            }



        }



        //this.setState({ escogergrupo: false });
        //return false;
        // } else {
        //     return false;
        // }

    }

    setCheckedLugar(id) {
        if (id == undefined) {
            return;
        }
        var c = false;
        var idg = 0;
        var listaaux = [];
        for (var j = 0; j < this.state.listalugares.length; j++) {
            listaaux[j] = {
                idlugar: this.state.listalugares[j].idlugar,
                nombrelugar: this.state.listalugares[j].nombrelugar,
                ubicacion: this.state.listalugares[j].ubicacion,
                checked: this.state.listalugares[j].checked
            }
        }
        //console.log('listaaux j: ', listaaux);
        for (var i = 0; i < listaaux.length; i++) {
            if (id == listaaux[i].idlugar) {
                listaaux[i].checked = !listaaux[i].checked;
                //console.log('listagrupos i: ', this.state.listagrupos);
                //return listaaux[i].checked;
                c = listaaux[i].checked;
                if (c == true) {
                    idg = id;
                } else {
                    idg = 0;
                }

            } else {
                listaaux[i].checked = false;
            }
        }
        this.setState({ listalugares: listaaux, idlugar: idg });
        return c;
    }

    getCheckedLugar(id) {
        //if (this.state.escogergrupo == true) {
        //console.log('getcheckedgrupo: ', id);
        for (var i = 0; i < this.state.listalugares.length; i++) {
            if (id == this.state.listalugares[i].idlugar) {
                //     valor = this.state.listagrupos[i].checked;

                // } else {
                //console.log('getcheckedgrupo: ', this.state.listagrupos[i]);
                return this.state.listalugares[i].checked
            }



        }



        //this.setState({ escogergrupo: false });
        //return false;
        // } else {
        //     return false;
        // }

    }

    renderRow = (rowData) => {
        //console.log('rowdata: ', rowData);
        return (

            <CheckBox
                title={rowData.nombre}
                checked={this.getCheckedGrupo(rowData.id)}
                onPress={this.setCheckedGrupos.bind(this, rowData.id)}

            />

        );
    }

    renderRowLugar = (rowData) => {
        //console.log('rowdata: ', rowData);
        return (

            <CheckBox
                title={rowData.nombre + ', ' + rowData.ubicacion}
                checked={this.getCheckedLugar(rowData.id)}
                onPress={this.setCheckedLugar.bind(this, rowData.id)}

            />

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
               // console.log('lugares');
               // console.log(this.state.datos);
            })
            .catch((error) => {
                //console.error(error);
                this.setState({ isLoading: false });
            });
    }

    getGrupos() {
        try {
            var cont = 0;
            var limite = this.state.datosg.length;
            var lgrupos = [];
            for (var i = 0; i < limite; i++) {
                var b = false;
               // console.log('this.state idgrupo: ', this.state.idgrupo, ', this.state.datosg[i].id: ', this.state.datosg[i].id);
                if (parseInt(this.state.idgrupo) == parseInt(this.state.datosg[i].id)) {
                    b = true;
                }
                lgrupos[cont] = {
                    idgrupo: this.state.datosg[i].id,
                    nombregrupo: this.state.datosg[i].nombre,
                    checked: b
                };
                cont++;
            }
            this.setState({ listagrupos: lgrupos });
            //console.log('listagrupos: ', this.state.listagrupos);
            return lgrupos;
        } catch (error) {
            console.log('error gruposg: ', error);
        }

    }

    getLugares() {
        try {
            var cont = 0;
            var limite = this.state.datose.length;
            var llugares = [];
            for (var i = 0; i < limite; i++) {
                var b = false;
                //console.log('this.state idlugar: ', this.state.idlugar, ', this.state.datose[i].id: ', this.state.datose[i].id);
                if (parseInt(this.state.idlugar) == parseInt(this.state.datose[i].id)) {
                    b = true;
                }
                llugares[cont] = {
                    idlugar: this.state.datose[i].id,
                    nombrelugar: this.state.datose[i].nombre,
                    ubicacion: this.state.datose[i].ubicacion,
                    checked: b
                };
                cont++;
            }
            this.setState({ listalugares: llugares });
            //console.log('listalugares: ', this.state.listalugares);
            return llugares;
        } catch (error) {
            console.log('error gruposg: ', error);
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
            <FlatList
                ListHeaderComponent={

                    <>
                        {/* <ScrollView contentContainerStyle={styles.containerStyle}> */}
                        <View style={styles.MainContainer}>
                            <CardSection >
                                <Input label="Nombres"
                                    placeholder="Joaquin"
                                    onChangeText={(texto) => this.setState({ nombres: texto })}
                                    value={this.state.nombres}
                                />
                            </CardSection >

                            <CardSection>
                                <Input label="Apellidos"
                                    placeholder="Chumacero"
                                    onChangeText={(texto) => this.setState({ apellidos: texto })}
                                    value={this.state.apellidos}
                                />
                            </CardSection>

                            <CardSection >
                                <Input label="Telefonos"
                                    placeholder="55587895"
                                    onChangeText={(texto) => this.setState({ telefonos: texto })}
                                    value={this.state.telefonos}
                                />
                            </CardSection >

                            <CardSection>
                                <Input label="Direccion"
                                    placeholder="calle 5"
                                    onChangeText={(texto) => this.setState({ direccion: texto })}
                                    value={this.state.direccion}
                                />
                            </CardSection>


                            {this.props.navigation.state.params.editar == true ?
                                <CardSection>
                                    <InfoBox label="Usuario"
                                        placeholder="user"
                                        onChangeText={(texto) => this.setState({ usuario: texto })}
                                        value={this.state.usuario}

                                    />
                                </CardSection> :
                                <>
                                    <CardSection>
                                        <Input label="Usuario"
                                            placeholder="user"
                                            onChangeText={(texto) => this.setState({ usuario: texto })}
                                            value={this.state.usuario}

                                        />
                                    </CardSection>



                                    <CardSection>
                                        <Input label="Password"
                                            placeholder="123"
                                            onChangeText={(texto) => this.setState({ pass: texto })}
                                            value={this.state.pass}

                                        />
                                    </CardSection>
                                </>
                            }


                            {/* <BoxGrupos
                            results={this.getGrupos()}
                        >

                        </BoxGrupos> */}



                        </View>
                        <>
                            <CardSection style={styles.MainContainer}>
                                <Text >
                                    {this.props.navigation.state.params.editar == true ?
                                        'Cambia el lugar' :
                                        'Escoge un lugar'}
                                </Text>

                                <TouchableOpacity
                                //onPress={() => navigation.navigate('crearFoto')}
                                >
                                    <MaterialIcons name='add' size={20} />
                                </TouchableOpacity>

                            </CardSection>
                            <FlatList
                                data={this.state.datose}
                                renderItem={({ item: rowData }) => this.renderRowLugar(rowData)}
                            />

                        </>
                        <CardSection style={styles.MainContainer}>
                            <Text >
                                {this.props.navigation.state.params.editar == true ?
                                    'Cambia el grupo' :
                                    'Escoge un grupo'}
                            </Text>

                            <TouchableOpacity
                                onPress={() => navigate('crearGrupo')}
                            >
                                <MaterialIcons name='add' size={20} />
                            </TouchableOpacity>


                        </CardSection>
                        {/* </ScrollView> */}



                    </>
                }

                data={this.state.datosg}
                renderItem={({ item: rowData }) => this.renderRow(rowData)}

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
        //justifyContent: 'center',
        //flexGrow: 1
        //flex: 1
    },
    MainContainer:
    {
        justifyContent: 'space-between',
        flex: 1,
        margin: 10

    }
});

// CrearPersonaScreen.navigationOptions = ({ navigation }) => {
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

export default CrearEmpleadoScreen;