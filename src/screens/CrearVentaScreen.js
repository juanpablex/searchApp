import React, { Component } from 'react';
import {
    View, Text, StyleSheet,
    FlatList, TouchableOpacity,
    ActivityIndicator, AsyncStorage, ScrollView
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
    LISTA_TIPOPRODUCTOS_X_LUGAR,
    LISTA_UNA_IMAGEN_X_PRODUCTOLUGAR,
    LISTA_MIS_PRODUCTOSLUGAR_X_NOMBRE,
    LISTA_TIPOPRODUCTOS_X_LUGAR_X_NOMBREPRODUCTO,
    LISTA_PRODUCTOS_VENTA
} from '../php/consultas';
import SearchBar from '../components/common/SearchBar';
import { navigate } from '../navigationRef';
import { ResultsListVenta } from '../components/ResultsListVenta';
import KeyboarSpacer from 'react-native-keyboard-spacer';
import { CardSection, InfoBox, Button, Input } from '../components/common';
import { DetalleVenta } from '../components/DetalleVenta';

class CrearVentaScreen extends Component {
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
            fecha: '',
            idlugar: 0,
            term: '',
            nombrelugar: '',
            ubicacion: '',
            busqueda: false,
            total: 0,
            cantidad: '1',
            detalles: [],
            contdet: 0,
            visible: false,
        }
    }

    abrirDetalles(id) {
        //console.log('props navigation: ', this.props.navigation)
        //this.props.navigation.navigate('crearLugar', { ClickItemHolder: id });
        //this.props.navigation.navigate('crearLugar', { editar: true, idlugar: id });
    }

    async componentDidMount() {
        this.props.navigation.setParams(
            {
                title: this.state.titulo,
                setDetallesVisible: this.setDetallesVisible
            });
        this.setState({
            idusuario: (await AsyncStorage.getItem('elytoken')).split('|')[0],
            idempresa: (await AsyncStorage.getItem('elytoken')).split('|')[7],
        });
        var a = ('idlugar: ', await AsyncStorage.getItem('elytoken')).split('|')[7];
        // console.log('estoy en ventas: idusuario=', this.state.idusuario,
        // ', idlugar=', a);
        try {
            await fetch(LISTA_PRODUCTOS_VENTA, {
                method: 'POST',
                headers: {
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
                    this.setState({
                        //isLoading: false,
                        datosprod: responseJson,
                        nombrelugar: responseJson[0].nombrelugar,
                        ubicacion: responseJson[0].ubicacion
                    });
                    // console.log('lugares');
                    this.props.navigation.setParams({ title: this.state.nombrelugar + ' - ' + this.state.ubicacion });
                    //  console.log('una imagen por producto : ', this.state.datosprod);
                })
                .catch((error) => {
                    //console.error(error, ' datos: ', this.state.datos);
                    this.setState({ isLoading: false });
                });

            const response_1 = await fetch(LISTA_TIPOPRODUCTOS_X_LUGAR, {
                method: 'POST',
                headres: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: a
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



    getProductos(id) {


        try {
            //console.log('getProductos');
            var listaimagenes = [];
            //console.log('getImagenes-cantImagenes: ', this.state.cantimagenes);
            //console.log('imagenes: ', this.state.imagenes);
            if (this.state.datosprod == null) {
                return null;
            }
            //console.log('datos contador: ', this.state.datos.length);
            var cont = 0;
            var limite = 0;
            //console.log('length: ', this.state.term.length);
            if (this.state.term.length != 0) {
                limite = this.state.datos.length;
            } else {
                if (this.state.datos.length % 2 == 0) {
                    limite = this.state.datos.length + 1;
                } else {
                    limite = this.state.datos.length + 2;
                }

            }
            //console.log('cant datosprod: ', this.state.datosprod.length, ' limite: ', limite);
            var cont2 = 0;
            while (cont < limite) {

                var idtipoprod = null;
                try {
                    idtipoprod = this.state.datosprod[cont].idtipoproducto;
                } catch (error) {
                    console.log('error de tipoprod: ', idtipoprod, ' cont: ', cont, ' datosprod: ', this.state.datosprod);
                }

                //console.log('cont: ', cont);
                //console.log('state.datosprod.idtipoproducto', this.state.datosprod[cont].idtipoproducto);
                //console.log('idtipprod: ', idtipoprod);
                //console.log('id: ', id);
                if (idtipoprod == id) {
                    //console.log('prod: ', this.state.datosprod[cont].idprod);
                    listaimagenes[cont2] = {
                        id: this.state.datosprod[cont].id,
                        nombre: this.state.datosprod[cont].nombre,
                        etiqueta: this.state.datosprod[cont].etiqueta,
                        precio: this.state.datosprod[cont].preciolugar,
                        ubicacion: this.state.datosprod[cont].ubicacion,
                        //url: this.state.datosprod[cont].url,
                        //nombimagen: this.state.datosprod[cont].nombreimagen,
                        //idimagen: this.state.datosprod[cont].idimagen,
                        stock: this.state.datosprod[cont].stock,
                        cantidad: parseInt(this.state.cantidad)
                    }
                    if (this.state.busqueda) {
                        //      console.log('lista_productos_venta: ', listaimagenes);
                    }

                    cont2++;
                }

                cont++;
                //console.log('bucle imagenes: ', listaimagenes[i]);
            }
            //console.log('listaimagenes return: ', listaimagenes);
            return (
                listaimagenes
            );
        } catch (error) {
            console.log('error maldito: ', this.state.datosprod);
        }

    }

    irAcrearProducto(id, nombre) {
        // console.log('misProductosScreen id: ', id, ', nombre: ', nombre);
        navigate('crearProducto', { idtipoproducto: id, nombretipo: nombre })
    }
    cantproducto(cantidad) {
        //  console.log('cantidad de producto: ', cantidad);
    }

    sumarTotalSiExiste(id) {
        var suma = 0.00;

        var cantidad = this.state.detalles.length;
        //  console.log('cantdetalles: ', cantidad);
        for (let a = 0; a < cantidad; a++) {
            var total = this.state.detalles[a].total;
            //     console.log('esta sumando totales');
            if (id == this.state.detalles[a].id) {
                suma = parseFloat(suma) + parseFloat(total);

            }
        }
        //   console.log('sumarTotalSiExiste: ', suma);
        return suma;
    }

    sumarCantidadSiExiste(id) {
        var suma = 0.00;
        for (let a = 0; a < this.state.contdet; a++) {
            var total = this.state.detalles[a].cant;
            if (id == this.state.detalles[a].id) {
                suma = parseFloat(suma) + parseFloat(total);
                //          console.log('esta sumando cantidades');
            }
        }
        //   console.log('sumarCantidadSiExiste: ', suma);
        return suma;
    }

    cantInsertados(item, id) {
        var cont = 0;
        for (let a = 0; a < item.length; a++) {
            if (item[a] == id) {
                cont++;
            }
        }
        return cont;
    }

    sumar(id, nombre, precio, stock, cant) {
        var cont = this.state.contdet;

        var det = [];
        //var sumatotal = 0;
        this.setState({ total: parseInt(parseInt(this.state.cantidad) * parseInt(precio) + parseInt(this.state.total)) });
        var totalProducto = this.sumarTotalSiExiste(id) + (parseFloat(this.state.cantidad) * parseFloat(precio));
        //var cantProducto = this.sumarCantidadSiExiste(id) + parseFloat(cant);
        var insertar = true;
        var insertados = [];
        for (let a = 0; a < this.state.detalles.length; a++) {

            if (id == this.state.detalles[a].id) {//reemplaza el mismo
                det[a] = {
                    id: this.state.detalles[a].id,
                    nombre: this.state.detalles[a].nombre,
                    precio: this.state.detalles[a].precio,
                    stock: this.state.detalles[a].stock,
                    cant: cant,
                    total: totalProducto
                };

                insertados[a] = id;
            }
            else {//insertar existente
                det[a] = {
                    id: this.state.detalles[a].id,
                    nombre: this.state.detalles[a].nombre,
                    precio: this.state.detalles[a].precio,
                    stock: this.state.detalles[a].stock,
                    cant: this.state.detalles[a].cant,
                    total: this.state.detalles[a].total
                };
                insertados[a] = this.state.detalles[a].id;
            }
            //   console.log('cant detalles: ', det);
        }

        var cantinsertados = this.cantInsertados(insertados, id);
        if (cantinsertados >= 1) {
            insertar = false;
        } else {
            insertar = true;
        }

        if (insertar) {//inserta uno nuevo
            det[cont] = { id: id, nombre: nombre, precio: precio, stock: stock, cant: cant, total: totalProducto };
            this.setState({ contdet: cont + 1 });
        }
        this.setState({
            cantidad: parseInt(1),

            detalles: det

        });
        // console.log('detalles: ', this.state.detalles);
    }

    restar(id, nombre, precio, stock, cant) {
        var cont = this.state.contdet;

        var det = [];
        this.setState({ total: parseInt(this.state.total) - parseInt(parseInt(this.state.cantidad) * parseInt(precio)) });
        var totalProducto = this.sumarTotalSiExiste(id) - (parseFloat(this.state.cantidad) * parseFloat(precio));


        for (let a = 0; a < this.state.detalles.length; a++) {

            if (id == this.state.detalles[a].id) {//reemplaza el mismo

                det[a] = {
                    id: this.state.detalles[a].id,
                    nombre: this.state.detalles[a].nombre,
                    precio: this.state.detalles[a].precio,
                    stock: this.state.detalles[a].stock,
                    cant: this.state.detalles[a].cant - this.state.cantidad,
                    total: totalProducto
                };


            }
            else {//insertar existente
                det[a] = {
                    id: this.state.detalles[a].id,
                    nombre: this.state.detalles[a].nombre,
                    precio: this.state.detalles[a].precio,
                    stock: this.state.detalles[a].stock,
                    cant: this.state.detalles[a].cant,
                    total: this.state.detalles[a].total
                };

            }
            //   console.log('cant detalles: ', det);
        }
        var borrar = -1;
        for (let a = 0; a < det.length; a++) {

            if (det[a].cant == 0) {
                borrar = a;
            }
        }
        if (borrar != -1) {

            det.splice(borrar, 1);
            //   console.log('borrar: ', borrar, ', vector: ', det);
            this.setState({ contdet: this.state.contdet - 1 });
        }
        this.setState({
            cantidad: parseInt(1),

            detalles: det

        });
        //   console.log('detalles: ', this.state.detalles);
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
                    {/* <TouchableOpacity
                        onPress={this.setTotal.bind(this)}
                    >
                        <MaterialIcons name="add" style={{ fontSize: 20 }} />
                    </TouchableOpacity> */}
                </View>
                <View style={{ flexDirection: 'column' }}>


                    <ResultsListVenta
                        results={this.getProductos(rowData.id)}
                        onPressRemove={{ change: this.restar.bind(this) }}
                        onPressAdd={{
                            change: this.sumar.bind(this)
                            //, cant: this.cantproducto.bind(this) 
                        }}

                    //cantidad={{ change: this.cantidad.bind(this) }}
                    //onPressAdd={{ change: this.setState({ total: 4 }) }}
                    />
                </View>
            </>

        );

    }

    renderRefreshControl = async () => {
        // try {
        //     await fetch(LISTA_UNA_IMAGEN_X_PRODUCTOLUGAR, {
        //         method: 'POST',
        //         headres: {
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             id: this.state.idlugar
        //             //tabla: 'lugares',
        //         })
        //     })
        //         .then((response) => response.json())
        //         .then((responseJson) => {

        //             this.setState({
        //                 //isLoading: false,
        //                 datosprod: responseJson,
        //                 term: ''


        //             });
        //             // console.log('lugares');
        //             console.log('una imagen por producto : ', this.state.datosprod);
        //         })
        //         .catch((error) => {
        //             //console.error(error, ' datos: ', this.state.datos);
        //             this.setState({ isLoading: false });
        //         });

        //     const response_1 = await fetch(LISTA_TIPOPRODUCTOS_X_LUGAR, {
        //         method: 'POST',
        //         headres: {
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             id: this.state.idlugar
        //             //tabla: 'lugares',
        //         })
        //     });
        //     const responseJson_1 = await response_1.json();
        //     this.setState({
        //         isLoading: false,
        //         datos: responseJson_1,
        //         id: responseJson_1[0].id
        //     });
        //     // console.log('lugares');
        //     console.log('cant tipos productos: ', this.state.datos);
        // }
        // catch (error_1) {
        //     //console.error(error, ' datos: ', this.state.datos);
        //     this.setState({ isLoading: false });
        // }
    }

    async buscar() {
        //console.log('busqueda producto={ idempresa: ', this.state.idempresa, ', term: ', this.state.term, ', idtipoproducto: ', this.state.idtipoproducto, ' } ');
        this.setState({ isLoading: true });

        try {
            await fetch(LISTA_MIS_PRODUCTOSLUGAR_X_NOMBRE, {
                method: 'POST',
                headres: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: this.state.term,
                    idlugar: this.state.idlugar
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
                    //   console.log('resultado busqweda: ', this.state.datosprod);
                    //   console.log('busqueda', this.state.busqueda, ', idtipoproduto: ', this.state.idtipoproducto);
                })
                .catch((error) => {
                    //console.error(error, ' datos: ', this.state.datos);
                    this.setState({ isLoading: false });
                });

            // console.log('idtipoproducto: ', this.state.idtipoproducto, ', idlugar: ', this.state.idlugar, ', nombre: ', this.state.term);

            const response_1 = await fetch(LISTA_TIPOPRODUCTOS_X_LUGAR_X_NOMBREPRODUCTO, {
                method: 'POST',
                headres: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idlugar: this.state.idlugar,
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
            //   console.log('cant tipos productos busqweda: ', this.state.datos.length);
        }
        catch (error_1) {
            console.error(error_1, ' datos: ', this.state.datos);
            this.setState({ isLoading: false, busqueda: false });
        }
    }

    async recargar() {
        this.setState({ isLoading: true });
        try {
            await fetch(LISTA_UNA_IMAGEN_X_PRODUCTOLUGAR, {
                method: 'POST',
                headres: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: this.state.idlugar
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

                    //     console.log('una imagen por producto : ', this.state.datosprod);
                })
                .catch((error) => {
                    //console.error(error, ' datos: ', this.state.datos);
                    this.setState({ isLoading: false });
                });

            const response_1 = await fetch(LISTA_TIPOPRODUCTOS_X_LUGAR, {
                method: 'POST',
                headres: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: this.state.idlugar
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
            //  console.log('cant tipos productos: ', this.state.datos);
        }
        catch (error_1) {
            //console.error(error, ' datos: ', this.state.datos);
            this.setState({ isLoading: false });
        }
    }
    setDetallesVisible = () => {
        var bool = this.state.visible;
        if (bool) {
            this.setState({ visible: false });
        } else {
            this.setState({ visible: true });
        }
        //this.setState({ visible: bool });
        //  console.log('abrir detalles: ', this.state.visible);
    }
    static navigationOptions = ({ navigation }) => {
        try {
            return {
                headerTitleAlign: 'center',
                title: navigation.state.params.title.toUpperCase(),
                headerRight: () => (
                    <TouchableOpacity
                        //onPress={() => navigation.navigate('crearFoto')}
                        onPress={navigation.getParam('setDetallesVisible')}
                    >
                        <MaterialIcons name='info-outline' size={30} />
                    </TouchableOpacity >
                )

            }
        } catch (error) {
            return {
                headerTitleAlign: 'center',
                title: 'Ventas',
                // headerRight: () => (
                //     <TouchableOpacity
                //         onPress={() => navigation.navigate('crearFoto')}>
                //         <MaterialIcons name='add' size={35} />
                //     </TouchableOpacity>
                // )

            }
        }

    };
    cancelar = async () => {
        try {
            this.setState({ isLoading: true, detalles: [], contdet: 0, cantidad: '1', total: 0 });
            await fetch(LISTA_PRODUCTOS_VENTA, {
                method: 'POST',
                headers: {
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
                    this.setState({
                        //isLoading: false,
                        datosprod: responseJson,
                        nombrelugar: responseJson[0].nombrelugar,
                        ubicacion: responseJson[0].ubicacion
                    });
                    // console.log('lugares');
                    this.props.navigation.setParams({ title: this.state.nombrelugar + ' - ' + this.state.ubicacion });
                    //    console.log('una imagen por producto : ', this.state.datosprod);
                })
                .catch((error) => {
                    //console.error(error, ' datos: ', this.state.datos);
                    this.setState({ isLoading: false });
                });

            const response_1 = await fetch(LISTA_TIPOPRODUCTOS_X_LUGAR, {
                method: 'POST',
                headres: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: a
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
            //    console.log('cant tipos productos: ', this.state.datos);
        }
        catch (error_1) {
            //console.error(error, ' datos: ', this.state.datos);
            this.setState({ isLoading: false });
        }

    }

    setCantidad() {
        this.setState({ cantidad: texto })
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
                    <SearchBar
                        term={this.state.term}
                        onTermChange={(texto) => this.setState({ term: texto, datos: null, datosprod: null, busqueda: true })}
                        onTermSubmit={() => this.buscar()}
                    />
                    <CardSection>
                        <InfoBox label='TOTAL:' value={this.state.total}></InfoBox>

                    </CardSection>
                    <CardSection>
                        <Input
                            label="CANT: "
                            //placeholder="1"
                            onChangeText={(texto) => this.setState({ cantidad: texto })}
                            value={(this.state.cantidad).toString()}
                            keyboardType='numeric'
                        />

                    </CardSection>

                    <FlatList
                        ListHeaderComponent={
                            <>

                                <View style={styles.MainContainer}>
                                </View>
                                {
                                    this.state.visible ? <DetalleVenta
                                        visible={this.state.visible}
                                        cerrarPress={this.setDetallesVisible.bind(this)}
                                        results={this.state.detalles}
                                    //salir={this.salir.bind(this)} 
                                    //salir={this.cargarMarcadores.bind(this)}
                                    //buscar={{ busqueda: this.resultados.bind(this) }}
                                    >
                                    </DetalleVenta> : null
                                }


                            </>
                        }
                        data={this.state.datos}
                        renderItem={({ item: rowData }) => this.renderRow(rowData)}
                        onRefresh={() => this.renderRefreshControl()}
                        refreshing={this.state.isLoading}
                        keyExtractor={(item, index) => item.id}

                    />
                    <CardSection>
                        <Button onPress={this.cancelar}>Cancelar</Button>
                        <Button onPress={this.guardar}>Aceptar</Button>
                    </CardSection>
                </>
            );
        }
    }

}

// MisProductosLugarScreen.navigationOptions = ({ navigation }) => {
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
export default CrearVentaScreen;