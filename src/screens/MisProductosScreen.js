import React, { Component } from 'react';
import {
    View, Text, StyleSheet,
    FlatList, TouchableOpacity,
    ActivityIndicator, AsyncStorage
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
    LISTA_TIPOPRODUCTOS_X_EMPRESA,
    LISTA_UNA_IMAGEN_X_PRODUCTO,
    LISTA_MIS_PRODUCTOS_X_NOMBRE,
    LISTA_TIPOPRODUCTOS_X_EMPRESA_X_NOMBREPRODUCTO
} from '../php/consultas';
import SearchBar from '../components/common/SearchBar';
import { navigate } from '../navigationRef';
import { ResultsList } from '../components/ResultsList';
import { CardSection } from '../components/common';
import { NavigationEvents } from 'react-navigation';

class MisProductosScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datos: null,
            datosprod: null,
            isLoading: true,
            id: 0,
            nombre: '',
            descripcion: '',
            idempresa: 0,
            idusuario: 0,
            idtipoproducto: 0,
            idtipprod: 0,
            nombretipo: '',
            fecha: '',

            term: '',
            busqueda: false
        }
    }

    abrirDetalles(id) {
        //console.log('props navigation: ', this.props.navigation)
        //this.props.navigation.navigate('crearLugar', { ClickItemHolder: id });
        //this.props.navigation.navigate('crearLugar', { editar: true, idlugar: id });
    }

    async componentDidMount() {
        this.setState({
            idusuario: (await AsyncStorage.getItem('elytoken')).split('|')[0],
            idempresa: (await AsyncStorage.getItem('elytoken')).split('|')[7]
        });
        // console.log('estoy en mis productos: idusuario=', this.state.idusuario,
        //     ', idempresa=', this.state.idempresa);
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



                    });
                    // console.log('lugares');
                    //console.log('una imagen por producto : ', this.state.datosprod);
                })
                .catch((error) => {
                    //console.error(error, ' datos: ', this.state.datos);
                    this.setState({ isLoading: false });
                });

            const response_1 = await fetch(LISTA_TIPOPRODUCTOS_X_EMPRESA, {
                method: 'POST',
                headres: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idempresa: this.state.idempresa
                    //tabla: 'lugares',
                })
            });
            const responseJson_1 = await response_1.json();
            this.setState({
                isLoading: false,
                datos: responseJson_1,
                id: responseJson_1[0].id
            });
            // console.log('lugares');
            //console.log('cant tipos productos: ', this.state.datos);
        }
        catch (error_1) {
            //console.error(error, ' datos: ', this.state.datos);
            this.setState({ isLoading: false });
        }


    }

    getImagenes(id) {
        try {
            //console.log('getImagenes idtipoprod: ', id);
            //console.log('datosprod: ', this.state.datosprod);

            var listaimagenes = [];
            var cont = 0;
            var produsado = 0;
            if (this.state.datosprod == null) {
                return null;
            }
            for (var i = 0; i < this.state.datos.length; i++) {
               // console.log('for de datos JP');
                if (this.state.datos[i].id == id) {
                    var contimprod = 0;
                    for (var j = 0; j < this.state.datosprod.length; j++) {
                        if (produsado != this.state.datosprod[j].idprod) {
                            //console.log('for de datosprod: ', this.state.datosprod[j].nombreprod);
                            //console.log('   if datos[i].id(', this.state.datos[i].id, ')==datosprod[j].idproducto(', this.state.datosprod[j].idtipoproducto, ')');
                            if (this.state.datos[i].id == this.state.datosprod[j].idtipoproducto) {
                                var auxidprod = parseInt(this.state.datosprod[j].idprod);
                                var contproductos = 0;
                                for (var k = 0; k < this.state.datosprod.length; k++) {
                                    //console.log('       if(auxidprod:', auxidprod, '==datosprod[k].idprod(', this.state.datosprod[k].idprod, ')');
                                    //console.log('       && datosprod[k].idtipoproducto(', this.state.datosprod[k].idtipoproducto, ')', '==', id, ')')
                                    if (auxidprod == this.state.datosprod[k].idprod
                                        && this.state.datosprod[k].idtipoproducto == id) {
                                        contproductos = contproductos + 1;
                                        produsado = this.state.datosprod[j].idprod;
                                        //console.log('           1contproductos=', contproductos);
                                    }
                                    if (contproductos == 2) {
                                        //console.log('           2contproductos: ', contproductos);
                                        break;
                                    }
                                }

                                if (contproductos == 1) {
                                    listaimagenes[cont] = {
                                        id: this.state.datosprod[j].idprod,
                                        nombre: this.state.datosprod[j].nombreprod,
                                        etiqueta: this.state.datosprod[j].etiquetaprod,
                                        precio: this.state.datosprod[j].precio,
                                        url: this.state.datosprod[j].url,
                                        nombimagen: this.state.datosprod[j].nombreimagen,
                                        nombrelugar: this.state.nombrelugar,
                                        idimagen: this.state.datosprod[j].idimagen,
                                        nombretipo: this.state.datosprod[j].nombretipo,
                                        navegar: 'crearProducto',
                                        editar: true,
                                    }
                                    //console.log('imagen: ', this.state.datosprod[j].nombreimagen);
                                } else {
                                    listaimagenes[cont] = {
                                        id: this.state.datosprod[j + 1].idprod,
                                        nombre: this.state.datosprod[j + 1].nombreprod,
                                        etiqueta: this.state.datosprod[j + 1].etiquetaprod,
                                        precio: this.state.datosprod[j + 1].precio,
                                        url: this.state.datosprod[j + 1].url,
                                        nombimagen: this.state.datosprod[j + 1].nombreimagen,
                                        nombrelugar: this.state.nombrelugar,
                                        idimagen: this.state.datosprod[j + 1].idimagen,
                                        nombretipo: this.state.datosprod[j + 1].nombretipo,
                                        navegar: 'crearProducto',
                                        editar: true,
                                    }
                                    //console.log('imagen: ', this.state.datosprod[j + 1].nombreimagen);
                                }
                                cont = cont + 1;
                            }
                        }

                    }
                }
            }
            return (listaimagenes);
        } catch (error) {
            console.log('error maldito: ', this.state.datosprod);
        }
        // try {
        //     console.log('getImagenes');
        //     var listaimagenes = [];
        //     //console.log('getImagenes-cantImagenes: ', this.state.cantimagenes);
        //     //console.log('imagenes: ', this.state.imagenes);
        //     if (this.state.datosprod == null) {
        //         return null;
        //     }
        //     console.log('datos contador: ', this.state.datos.length);
        //     var cont = 0;
        //     var limite = 0;
        //     console.log('length: ', this.state.term.length);
        //     if (this.state.term.length != 0) {
        //         limite = this.state.datos.length;
        //     } else {
        //         if (this.state.datos.lentgh % 2 == 0) {
        //             limite = this.state.datos.length + 1;
        //         } else {
        //             limite = this.state.datos.length + 2;
        //         }
        //     }
        //     console.log('cant datosprod: ', this.state.datosprod.length, ' limite: ', limite);
        //     var cont2 = 0;
        //     while (cont < limite) {

        //         var idtipoprod = null;
        //         try {
        //             idtipoprod = this.state.datosprod[cont].idtipoproducto;
        //         } catch (error) {
        //             console.log('error de tipoprod: ', idtipoprod, ' cont: ', cont, ' datosprod: ', this.state.datosprod);
        //         }

        //         console.log('cont: ', cont);
        //         //console.log('state.datosprod.idtipoproducto', this.state.datosprod[cont].idtipoproducto);
        //         console.log('idtipprod: ', idtipoprod);
        //         console.log('id: ', id);
        //         if (idtipoprod == id) {
        //             //console.log('prod: ', this.state.datosprod[cont].idprod);
        //             listaimagenes[cont2] = {
        //                 id: this.state.datosprod[cont].idprod,
        //                 nombre: this.state.datosprod[cont].nombreprod,
        //                 etiqueta: this.state.datosprod[cont].etiquetaprod,
        //                 precio: this.state.datosprod[cont].precio,
        //                 url: this.state.datosprod[cont].url,
        //                 nombimagen: this.state.datosprod[cont].nombreimagen,
        //                 idimagen: this.state.datosprod[cont].idimagen,
        //                 nombretipo: this.state.datosprod[cont].nombretipo,
        //                 navegar: 'crearProducto',
        //                 editar: true
        //             }
        //             if (this.state.busqueda)
        //                 console.log('listaimagenesXprod: ', listaimagenes);
        //             cont2++;
        //         }

        //         cont++;
        //         //console.log('bucle imagenes: ', listaimagenes[i]);
        //     }

        //     console.log('listaimagenes return: ', listaimagenes);
        //     return (
        //         listaimagenes
        //     );
        // } catch (error) {
        //     console.log('error maldito: ', this.state.datosprod);
        // }

    }

    irAcrearProducto(id, nombre) {
      // console.log('misProductosScreen id: ', id, ', nombre: ', nombre);
        navigate('crearProducto', { idtipoproducto: id, nombretipo: nombre })
        //navigate('misTiposProductos');
    }

    renderRow = (rowData) => {
        //console.log('rowData:::::', rowData);
        return (
            <>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between', marginTop: 10
                }}>
                    <Text>
                        {rowData.nombre}
                    </Text>
                    <TouchableOpacity onPress={this.irAcrearProducto.bind(this, rowData.id, rowData.nombre)}>
                        <MaterialIcons name="add" style={{ fontSize: 20 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <CardSection>
                        <ResultsList results={this.getImagenes(rowData.id)} />
                    </CardSection>
                </View>
            </>
        );
    }

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
                  //  console.log('una imagen por producto : ', this.state.datosprod);
                })
                .catch((error) => {
                    //console.error(error, ' datos: ', this.state.datos);
                    this.setState({ isLoading: false });
                });

            const response_1 = await fetch(LISTA_TIPOPRODUCTOS_X_EMPRESA, {
                method: 'POST',
                headres: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idempresa: this.state.idempresa
                    //tabla: 'lugares',
                })
            });
            const responseJson_1 = await response_1.json();
            this.setState({
                isLoading: false,
                datos: responseJson_1,
                id: responseJson_1[0].id
            });
            // console.log('lugares');
         //   console.log('cant tipos productos: ', this.state.datos);
        }
        catch (error_1) {
            //console.error(error, ' datos: ', this.state.datos);
            this.setState({ isLoading: false });
        }
    }

    static navigationOptions = ({ navigation }) => {
        try {
            return {
                headerTitleAlign: 'center',
                title: 'Mis Productos',
                //title: 'asdf',
                headerRight: () => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('misTiposProductos')}>
                        <MaterialIcons name='add' size={35} />
                    </TouchableOpacity>
                )

            }
        } catch (error) {
            return {
                headerTitleAlign: 'center',
                title: 'Mis Productos',
                // headerRight: () => (
                //     <TouchableOpacity
                //         onPress={() => navigation.navigate('crearFoto')}>
                //         <MaterialIcons name='add' size={35} />
                //     </TouchableOpacity>
                // )

            }
        }



    };

    async buscar() {
        //console.log('busqueda producto={ idempresa: ', this.state.idempresa, ', term: ', this.state.term, ', idtipoproducto: ', this.state.idtipoproducto, ' } ');
        this.setState({ isLoading: true });

        try {
            await fetch(LISTA_MIS_PRODUCTOS_X_NOMBRE, {
                method: 'POST',
                headres: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: this.state.term,
                    idempresa: this.state.idempresa
                    //tabla: 'lugares',
                })
            })
                .then((response) => response.json())
                .then((responseJson) => {

                    this.setState({
                        //isLoading: false,
                        datosprod: responseJson,
                        idtipoproducto: responseJson[0].idtipoproducto


                    });
                    //console.log('resultado busqweda: ', this.state.datosprod);
                    //console.log('busqueda', this.state.busqueda, ', idtipoproduto: ', this.state.idtipoproducto);
                })
                .catch((error) => {
                    //console.error(error, ' datos: ', this.state.datos);
                    this.setState({ isLoading: false });
                });

            const response_1 = await fetch(LISTA_TIPOPRODUCTOS_X_EMPRESA_X_NOMBREPRODUCTO, {
                method: 'POST',
                headres: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idempresa: this.state.idempresa,
                    nombre: this.state.term,
                    idtipoproducto: this.state.idtipoproducto
                    //tabla: 'lugares',
                })
            });
            const responseJson_1 = await response_1.json();
            this.setState({
                isLoading: false,
                datos: responseJson_1,
                id: responseJson_1[0].id
            });
            // console.log('lugares');
            //console.log('cant tipos productos busqweda: ', this.state.datos.length);
        }
        catch (error_1) {
            //console.error(error_1, ' datos: ', this.state.datos);
            this.setState({ isLoading: false, busqueda: false });
        }
    }

    async recargar() {
        this.setState({ isLoading: true })
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
                    //console.log('una imagen por producto : ', this.state.datosprod);
                })
                .catch((error) => {
                    //console.error(error, ' datos: ', this.state.datos);
                    this.setState({ isLoading: false });
                });

            const response_1 = await fetch(LISTA_TIPOPRODUCTOS_X_EMPRESA, {
                method: 'POST',
                headres: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idempresa: this.state.idempresa
                    //tabla: 'lugares',
                })
            });
            const responseJson_1 = await response_1.json();
            this.setState({

                datos: responseJson_1,
                id: responseJson_1[0].id,
                isLoading: false
            });
            // console.log('lugares');
            //console.log('cant tipos productos: ', this.state.datos);
        }
        catch (error_1) {
            //console.error(error, ' datos: ', this.state.datos);
            this.setState({ isLoading: false });
        }
    }

    async rerender() {
        this.setState({
            idusuario: (await AsyncStorage.getItem('elytoken')).split('|')[0],
            idempresa: (await AsyncStorage.getItem('elytoken')).split('|')[7]
        });
      //  console.log('estoy en mis productos: idusuario=', this.state.idusuario,
         //   ', idempresa=', this.state.idempresa);
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



                    });
                    // console.log('lugares');
           //         console.log('una imagen por producto : ', this.state.datosprod);
                })
                .catch((error) => {
                    //console.error(error, ' datos: ', this.state.datos);
                    this.setState({ isLoading: false });
                });

            const response_1 = await fetch(LISTA_TIPOPRODUCTOS_X_EMPRESA, {
                method: 'POST',
                headres: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idempresa: this.state.idempresa
                    //tabla: 'lugares',
                })
            });
            const responseJson_1 = await response_1.json();
            this.setState({
                isLoading: false,
                datos: responseJson_1,
                id: responseJson_1[0].id
            });
            // console.log('lugares');
           // console.log('cant tipos productos: ', this.state.datos);
        }
        catch (error_1) {
            //console.error(error, ' datos: ', this.state.datos);
            this.setState({ isLoading: false });
        }

    }


    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );

        } else {
            if (this.state.datos == null && !this.state.busqueda) {
                return (
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ marginTop: 20 }}>No hay resultados</Text>
                        <TouchableOpacity style={{ marginTop: 30 }}
                            onPress={() => this.recargar()}>
                            <Text style={{ color: '#007aff' }}>Recargar</Text>
                        </TouchableOpacity>
                    </View>

                );
            }

            return (
                <>
                    <NavigationEvents
                        onDidFocus={this.rerender.bind(this)}
                    />

                    <View style={styles.MainContainer}>
                        <SearchBar
                            term={this.state.term}
                            onTermChange={(texto) => this.setState({ term: texto, datos: null, datosprod: null, busqueda: true })}
                            onTermSubmit={() => this.buscar()}
                        />
                        <View style={styles.MainContainer}>
                            <FlatList
                                data={this.state.datos}
                                renderItem={({ item: rowData }) => this.renderRow(rowData)}
                                onRefresh={() => this.renderRefreshControl()}
                                refreshing={this.state.isLoading}
                                keyExtractor={(item, index) => item.id}

                            />
                        </View>
                    </View>



                </>
            );
        }
    }

}

// MisProductosScreen.navigationOptions = ({ navigation }) => {
//     return {

//         headerRight: () => (
//             <TouchableOpacity
//                 onPress={() => navigation.navigate('crearLugar',
//                     // { id: navigation.getParam('id') },
//                     // { ClickItemHolder: 0 }

//                 )

//                 }

//             >
//                 <MaterialIcons name="add" size={35} />


//             </TouchableOpacity>
//         )
//     };

// }
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
export default MisProductosScreen;