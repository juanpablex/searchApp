import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { CardSection, Button, InfoBox } from '../components/common';
import { navigate } from '../navigationRef';
import {
    LISTA_DETALLE_LUGAR,
    LISTA_IMAGENES_LUGAR,
    GET_IMAGEN_LUGAR
} from '../php/consultas';
import InfoPersona from '../components/InfoPersona';
import { ResultsList } from '../components/ResultsList';
import { BorrarImagen } from '../components/BorrarImagen';
class DetalleLugarScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            idempresa: 0,
            idestado: 0,
            idusuario: 0,
            nit: '',
            nombre: '',
            telefonos: '',
            ubicacion: '',
            fecha: '',
            idpersona: 0,
            nombres: '',
            apellidos: '',
            datos: null,
            datosib: null,
            idlugar: 0,
            titulo: '',
            isLoading: true,
            infopersona: false,
            datosi: null,
            idimagen: 0,
            nombrei: '',
            url: '',
            fechai: '',
            datosimagen: [],
            imagenvisible: false,
            cantImagenes: 0
        }
    }

    async componentDidMount() {
        this.setState({ idlugar: this.props.navigation.state.params.lugar });
        var a = this.props.navigation.state.params.lugar;
      //  console.log('idlugar: ', a);
        try {
            const response = await fetch(LISTA_DETALLE_LUGAR, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idlugar: a,
                })
            });
            const responseJson = await response.json();
            this.setState({
                datos: responseJson,
                id: responseJson[0].id,
                idempresa: responseJson[0].idempresa,
                idestado: responseJson[0].idestado,
                idusuario: responseJson[0].idusuario,
                nit: responseJson[0].nit,
                nombre: responseJson[0].nombre,
                telefonos: responseJson[0].telefonos,
                ubicacion: responseJson[0].ubicacion,
                fecha: responseJson[0].fecha,
                idpersona: responseJson[0].idpersona,
                nombres: responseJson[0].nombres,
                apellidos: responseJson[0].apellidos,
                //isLoading: false,
                //busqueda: false
            });
            this.props.navigation.setParams({ title: this.state.nombre });
         //   console.log('datos: ', this.state.datos);

            ////////////////lista imagenes lugar

            const response2 = await fetch(LISTA_IMAGENES_LUGAR, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idlugar: a,
                })
            });
            const responseJson2 = await response2.json();
            this.setState({
                datosi: responseJson2,
                idimagen: responseJson2[0].id,
                nombrei: responseJson2[0].nombre,
                url: responseJson2[0].url,
                fechai: responseJson2[0].fecha,
                isLoading: false,
                //busqueda: false
            });
            this.setState({ cantImagenes: this.state.datosi.length });
         //   console.log('cant imagenes del lugar: ', this.state.datosi.length);

        }
        catch (error) {
            //console.error(error);
            this.setState({ isLoading: false });
        }

    }

    static navigationOptions = ({ navigation }) => {
        try {
            return {
                headerTitleAlign: 'center',
                title: navigation.state.params.title.toUpperCase(),
                // headerRight: () => (
                //     <TouchableOpacity
                //         onPress={() => navigation.navigate('crearFoto')}>
                //         <MaterialIcons name='add' size={35} />
                //     </TouchableOpacity>
                // )

            }
        } catch (error) {
            return {
                headerTitleAlign: 'center',
                title: '',
                // headerRight: () => (
                //     <TouchableOpacity
                //         onPress={() => navigation.navigate('crearFoto')}>
                //         <MaterialIcons name='add' size={35} />
                //     </TouchableOpacity>
                // )

            }
        }



    };

    mostrarInfo() {
        this.setState({ infopersona: true });
    }
    cerrarInfo() {
        this.setState({ infopersona: false });
    }
    // renderRow = (rowData) => {
    //     //console.log('rowData:::::', rowData);
    //     return (
    //         <>
    //             <CardSection>
    //                 <ResultsList results={this.getImagenes(rowData.id)} />
    //             </CardSection>
    //         </>
    //     );
    // }

    renderRefreshControl = async () => {
        try {
            await fetch(LISTA_UNA_IMAGEN_X_PRODUCTO, {
                method: 'POST',
                headres: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idempresa: this.state.idempresa
                    //tabla: 'lugares',
                })
            })
                .then((response) => response.json())
                .then((responseJson) => {

                    this.setState({
                        //isLoading: false,
                        datosprod: responseJson,
                        term: ''


                    });
                    // console.log('lugares');
                //    console.log('una imagen por producto : ', this.state.datosprod);
                })
                .catch((error) => {
                    //console.error(error, ' datos: ', this.state.datos);
                    this.setState({ isLoading: false });
                });
        }
        catch (error_1) {
            //console.error(error, ' datos: ', this.state.datos);
            this.setState({ isLoading: false });
        }
    }
    getImagenes() {
        var listaimagenes = [];
      //  console.log('getImagenes-cantImagenes: ', this.state.cantImagenes);
        //console.log('imagenes: ', this.state.imagenes);
        // if (this.state.cantImagenes > 0) {
        //     console.log('datos de imagenes del lugar: ', this.state.datosi);
        // }
        for (var i = 0; i < this.state.cantImagenes; i++) {
            listaimagenes[i] = {
                id: this.state.datosi[i].id,
                url: this.state.datosi[i].url,
                nombre: this.state.datosi[i].nombre,
                detalle: 1
            }
            //console.log('bucle imagenes: ', listaimagenes[i]);
        }
        if (listaimagenes.length > 1) {
            listaimagenes.splice(0, 1);
        }
        console.log('listaimageneslugar: ', listaimagenes);
        return (
            listaimagenes
        );
    }

    getImagen = async (idimagen) => {
     //   console.log('getImagen////////////////////////');
      //  console.log('imagen visible: ', this.state.imagenvisible);
      //  console.log('id de la imagen: ', idimagen);
        await fetch(GET_IMAGEN_LUGAR, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: idimagen,

            })
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    datosib: responseJson
                });
                //console.log('datosib: ', this.state.datosib);

            })
            .catch((error) => {
                console.error(error);
                this.setState({ isLoading: false });
            });
        var lista = [];
        for (var i = 0; i < this.state.datosib.length; i++) {
            lista[i] = {
                id: this.state.datosib[0].id,
                nombre: this.state.datosib[0].nombre,
                //nombreprod: this.state.nombre,
                nombrelugar: this.state.nombrelugar,
                ubicacion: this.state.ubicacion,
                url: this.state.datosib[0].url,
                idlugar: this.state.datosib[0].idlugar,
                fecha: this.state.datosib[0].fecha,
            };


        }
       // console.log('getImagen.lista: ', lista);
        this.setState({ datosimagen: lista });
        //console.log('lista imagen: ', lista);
        // return (
        //     lista
        // );
    }

    setVisible = (item) => {
      //  console.log('setVisible.item: ', item);
        this.setState({ imagenvisible: true, idimagen: item });
        //var v = this.state.imagenvisible;
        //console.log('imagen visible: ', v, ', item: ', item.id);

      //  console.log('setVisible.if');
        this.getImagen(item);



    }
    cerrar = () => {
        this.setState({ imagenvisible: !this.state.imagenvisible });
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
                        <ResultsList
                            results={this.getImagenes()} grande={true}
                            presionar={{ visible: this.setVisible.bind(this) }}
                        />
                    </CardSection>

                    <CardSection>
                        <InfoBox label='NIT:' value={this.state.nit}></InfoBox>
                    </CardSection>

                    <CardSection>
                        <InfoBox label='UBICACION:' value={this.state.ubicacion}></InfoBox>
                    </CardSection>

                    <CardSection>
                        <InfoBox label='TELEFONOS:' value={this.state.telefonos}></InfoBox>
                    </CardSection>

                    {/* <CardSection>
                        <TouchableOpacity onPress={this.mostrarInfo.bind(this)}>
                            <InfoBox
                                label='PROPIETARIO'
                                value={(this.state.nombres + ' ' + this.state.apellidos).toUpperCase()}></InfoBox>
                        </TouchableOpacity>
                    </CardSection> */}


                    <CardSection style={styles.campo}>
                        <Text style={styles.styleLabel}>PROPIETARIO: </Text>
                        <TouchableOpacity
                            onPress={this.mostrarInfo.bind(this)}
                        >
                            <Text style={styles.styleTexto,
                            {
                                textDecorationLine: 'underline',
                                color: '#007aff'
                            }}>{(this.state.nombres + ' ' + this.state.apellidos).toUpperCase()}</Text>
                        </TouchableOpacity>


                    </CardSection>

                    <InfoPersona
                        visible={this.state.infopersona}
                        onPress={{
                            results: [
                                this.state.nombres,
                                this.state.apellidos,
                                this.state.telefonos],
                            change: this.cerrarInfo.bind(this)
                        }}
                    >

                    </InfoPersona>
                    {this.state.imagenvisible ?
                        <BorrarImagen
                            visible={this.state.imagenvisible}
                            cerrar={this.cerrar.bind(this)}
                            results={this.state.datosimagen}
                            //borrarbtn={true}
                        // borrar={{ borrar: this.borrarfoto.bind(this) }}
                        >

                        </BorrarImagen> : null}
                    {/* <CardSection>
                        <Button children={'Lista de productos'}
                            onPress={() => navigate('listaProductos')}
                        >

                        </Button>
                    </CardSection> */}
                </View>
            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        //backgroundColor: 'rgba(0,0,0,0.75)',
        //position: 'relative',
        justifyContent: 'center',
        flex: 1,
        position: 'relative'
        //flex: 1
    },
    campo: {
        justifyContent: 'center',
        //alignItems: 'flex-end',
    },
    styleLabel: {
        fontWeight: 'bold',
        fontSize: 18
    },
    styleTexto: {
        fontSize: 18,
        marginLeft: 5,

    }
});

// DetalleLugarScreen.navigationOptions = ({ navigation }) => {
//     return {
//         headerTextAlign: 'center',
//         headerRight: () => (
//             <TouchableOpacity
//                 onPress={() => navigation.navigate('crearLugar')}
//             >
//                 <MaterialIcons name='add' size={35} />
//             </TouchableOpacity>
//         )
//     };
// }

export default DetalleLugarScreen;