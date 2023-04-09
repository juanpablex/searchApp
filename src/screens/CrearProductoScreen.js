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
import KeyboarSpacer from 'react-native-keyboard-spacer';
import { CheckBox } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { CardSection, Button, Input, InfoBox } from '../components/common';
import {
    INSERTAR_PRODUCTO,
    MODIFICAR_PRODUCTO,
    DATOS_PRODUCTO,
    LISTA_IMAGENES_PRODUCTO,
    LISTA_LUGARES_X_EMPRESA,
    GET_IMAGEN_PRODUCTO,
    urllocal2,
    uriimagenvacia,
    BORRAR_IMAGEN
} from '../php/consultas';
import { navigate } from '../navigationRef';
import { ResultsList } from '../components/ResultsList';
import { subirImagenAmazon } from '../libs/subirimagen';
//import borrarimagen from '../libs/borrarimagen';
import { NavigationEvents } from 'react-navigation';
import { BorrarImagen } from '../components/BorrarImagen';
import { borrarimagenarchivo } from '../libs/borrarimagen';


class CrearProductoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            nit: '',
            nombre: '',
            idusuario: 0,
            etiqueta: '',
            idempresa: 0,
            fecha: '',
            idtipoproducto: 0,
            precio: 0.0,
            titulo: 'Crear Producto',
            nombretipo: '',
            isLoading: true,
            datos: null,
            editar: false,
            datosi: null,
            datose: null,
            datosib: null,
            idlugar: 0,
            listalugares: [],
            listalugaresmod: [],
            idimagen: 0,
            nombrei: '',
            url: '',
            fechai: '',
            imagenvisible: false,
            cantImagenes: 0,
            datosimagen: [],
            nombreBoton: 'Guardar Producto',
            imagenborrada: false
        }
    }
    static idprod = 0;
    static nombreproducto = "";
    async componentDidMount() {
        try {
            this.props.navigation.setParams({ title: this.state.titulo });
            this.setState({
                idusuario: (await AsyncStorage.getItem('elytoken')).split('|')[0],
                idempresa: (await AsyncStorage.getItem('elytoken')).split('|')[7]
            });

            //console.log('parametro: ', this.props.navigation.state.params.title);
            var ed = this.props.navigation.state.params.editar;
            var tipoprod = this.props.navigation.state.params.idtipoproducto;
            var nombtipo = this.props.navigation.state.params.nombretipo;
            //console.log('idtipoproducto: ', tipoprod, ', nombretipoproducto: ', nombtipo, ', idempresa: ', this.state.idempresa);
            this.setState({ idtipoproducto: tipoprod, nombretipo: nombtipo });
            if (ed != undefined) {
                try {
                    //   console.log('editar producto');
                    var id = this.props.navigation.state.params.id;
                    idprod = id;

                    this.setState({
                        editar: ed,
                        id: id,
                        idtipoproducto: tipoprod,
                        nombretipo: nombtipo,
                        titulo: 'Editar Producto'
                    });
                    //   console.log('editar: ', ed, ', idproducto: ', id, ', nombretipo: ', this.state.nombretipo);

                    //console.log('crear lugar idusuario: ', this.state.idusuario);
                    await fetch(DATOS_PRODUCTO, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            id: this.state.id
                        })
                    }).then((response) => response.json())
                        .then((responseJson) => {
                            this.setState({
                                datos: responseJson,
                                //id: responseJson[0].id,
                                etiqueta: responseJson[0].etiqueta,
                                //idtipoproducto: responseJson[0].idtipoproducto,
                                nombre: responseJson[0].nombre,
                                precio: responseJson[0].precio,
                                //idempresa: responseJson[0].idempresa,
                                fecha: responseJson[0].fecha,
                                //isLoading: false,
                                titulo: 'Editar Producto',
                                nombreBoton: 'Modificar Producto'
                            });
                            this.props.navigation.setParams({ title: this.state.titulo });
                            this.props.navigation.setParams({ hayproducto: true });
                            nombreproducto = this.state.nombre;
                            // console.log('idProducto: ', this.state.id);

                        })
                        .catch((error) => {
                            console.error(error);
                            this.setState({ isLoading: false });
                        });

                    ////////////////lista imagenes lugar

                    await fetch(LISTA_IMAGENES_PRODUCTO, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            id: this.state.id,
                        })
                    })
                        .then((response2) => response2.json())
                        .then((responseJson2) => {
                            this.setState({
                                datosi: responseJson2,
                                idimagen: responseJson2[0].id,
                                nombrei: responseJson2[0].nombre,
                                url: responseJson2[0].url,
                                fechai: responseJson2[0].fecha,
                                //  isLoading: false,
                                //busqueda: false
                            });
                            this.setState({ cantImagenes: this.state.datosi.length });
                            //console.log('cant imagenes del Producto: ', this.state.datosi.length);
                        })
                        .catch((error2) => {
                            console.error(error2);
                            this.setState({ isLoading: false });
                        });
                    // console.log('entrando a listar los lugares');
                    //const responseJson2 = await response2.json();

                    await fetch(LISTA_LUGARES_X_EMPRESA, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            idempresa: this.state.idempresa
                        })
                    })
                        .then((response4) => response4.json())
                        .then((responseJson4) => {

                            this.setState({
                                isLoading: false,
                                datose: responseJson4,
                                //idlugar: responseJson4[0].id
                            });
                            // console.log('lugares');
                            //console.log('cant lugares: ', this.state.datose);
                        })
                        .catch((error) => {
                            console.error(error, 'error en lista de lugares crear producto');
                            this.setState({ isLoading: false })
                        });
                }
                catch (error) {
                    console.log('error crearProducto componentDidMount: ', error);
                }

            } else {
                this.props.navigation.setParams({ hayproducto: false });
                this.props.navigation.setParams({ title: this.state.titulo });
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
                            datose: responseJson4,
                            idlugar: responseJson4[0].id
                        });
                        // console.log('lugares');
                        //console.log('cant lugares: ', this.state.datose);
                    })
                    .catch((error) => {
                        console.error(error, 'error en lista de lugares crear producto');
                        this.setState({ isLoading: false })
                    });

                //this.setState({ isLoading: false });
                //this.setState({ isLoading: false });

            }
            this.getLugares();
        }

        catch (error) {
            this.setState({ isLoading: false });
        }
    }

    async rerender() {
        this.props.navigation.setParams({ title: this.state.titulo });
        this.setState({
            idusuario: (await AsyncStorage.getItem('elytoken')).split('|')[0],
            idempresa: (await AsyncStorage.getItem('elytoken')).split('|')[7],

        });

        //console.log('parametro: ', this.props.navigation.state.params.title);
        var ed = this.props.navigation.state.params.editar;
        var tipoprod = this.props.navigation.state.params.idtipoproducto;
        var nombtipo = this.props.navigation.state.params.nombretipo;
        // console.log('idtipoproducto: ', tipoprod, ', nombretipoproducto: ', nombtipo, ', idempresa: ', this.state.idempresa);
        this.setState({ idtipoproducto: tipoprod, nombretipo: nombtipo });
        if (ed != undefined) {
            try {
                //  console.log('editar producto');
                var id = this.props.navigation.state.params.id;
                idprod = id;

                this.setState({
                    editar: ed,
                    id: id,
                    idtipoproducto: tipoprod,
                    nombretipo: nombtipo,
                    titulo: 'Editar Producto'
                });
                //  console.log('editar: ', ed, ', idproducto: ', id, ', nombretipo: ', this.state.nombretipo);

                //console.log('crear lugar idusuario: ', this.state.idusuario);
                this.setState({ ActivityIndicator_Loading: true }, () => {


                    fetch(DATOS_PRODUCTO, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            id: this.state.id
                        })
                    }).then((response) => response.json())
                        .then((responseJson) => {
                            this.setState({
                                id: responseJson[0].id,
                                etiqueta: responseJson[0].etiqueta,
                                idtipoproducto: responseJson[0].idtipoproducto,
                                nombre: responseJson[0].nombre,
                                precio: responseJson[0].precio,
                                //idempresa: responseJson[0].idempresa,
                                fecha: responseJson[0].fecha,
                                //isLoading: false,
                                titulo: 'Editar Producto',
                                nombreBoton: 'Modificar Producto'
                            });
                            this.props.navigation.setParams({ title: this.state.titulo });
                            this.props.navigation.setParams({ hayproducto: true });
                            //console.log('idProducto: ', this.state.id);

                        })
                        .catch((error) => {
                            console.error(error);
                            this.setState({ isLoading: false });
                        });

                    ////////////////lista imagenes lugar

                    fetch(LISTA_IMAGENES_PRODUCTO, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            id: this.state.id,
                        })
                    })
                        .then((response2) => response2.json())
                        .then((responseJson2) => {
                            this.setState({
                                datosi: responseJson2,
                                idimagen: responseJson2[0].id,
                                nombrei: responseJson2[0].nombre,
                                url: responseJson2[0].url,
                                fechai: responseJson2[0].fecha,
                                //  isLoading: false,
                                //busqueda: false
                            });
                            this.setState({ cantImagenes: this.state.datosi.length });
                            console.log('cant imagenes del Producto: ', this.state.datosi.length);
                        })
                        .catch((error2) => {
                            console.error(error2);
                            this.setState({ isLoading: false });
                        });
                    // console.log('entrando a listar los lugares');
                    //const responseJson2 = await response2.json();

                    fetch(LISTA_LUGARES_X_EMPRESA, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            idempresa: this.state.idempresa
                        })
                    })
                        .then((response4) => response4.json())
                        .then((responseJson4) => {

                            this.setState({
                                isLoading: false,
                                datose: responseJson4,
                                idlugar: responseJson4[0].id,
                                ActivityIndicator_Loading: false
                            });
                            // console.log('lugares');
                            // console.log('cant lugares: ', this.state.datose);
                        })
                        .catch((error) => {
                            console.error(error, 'error en lista de lugares crear producto');
                            this.setState({ isLoading: false, ActivityIndicator_Loading: false })
                        });
                });
            }
            catch (error) {
                console.log('error crearProducto componentDidMount: ', error);
            }

        } else {
            this.props.navigation.setParams({ hayproducto: false });
            this.props.navigation.setParams({ title: this.state.titulo });
            this.setState({ ActivityIndicator_Loading: true }, () => {
                fetch(LISTA_LUGARES_X_EMPRESA, {
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
                            datose: responseJson4,
                            ActivityIndicator_Loading: false,
                            //idlugar: responseJson4[0].id
                        });
                        // console.log('lugares');
                        //  console.log('cant lugares: ', this.state.datose);
                    })
                    .catch((error) => {
                        console.error(error, 'error en lista de lugares crear producto');
                        this.setState({ isLoading: false })
                    });

                //this.setState({ isLoading: false });
                //this.setState({ isLoading: false });
            });
        }
        console.log('entrando a imagen borrada');
        if (this.state.imagenborrada === true) {

            console.log('error borra ofto:', this.state.id);
            this.setState({ ActivityIndicator_Loading: true }, () => {


                fetch(LISTA_IMAGENES_PRODUCTO, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: this.state.id,
                    })
                })
                    .then((response2) => response2.json())
                    .then((responseJson2) => {
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
                        //console.log('cant imagenes del Producto: ', this.state.datosi.length);
                    })
                    .catch((error2) => {
                        console.error(error2);
                        this.setState({ isLoading: false });
                    });
            });
        }
        this.getLugares();
    }

    getLugares() {
        //  console.log('datose: ', this.state.datose);
        var limite = this.state.datose.length;
        var cont = 0;
        var llugares = [];
        try {
            if (this.state.datos != null) {
                for (var i = 0; i < limite; i++) {
                    var b = false;
                    for (var j = 0; j < this.state.datos.length; j++) {

                        //     console.log('this.state idlugar: ', this.state.idlugar, ', this.state.datose[i].id: ', this.state.datose[i].id);
                        if (parseInt(this.state.datos[j].idlugar) == parseInt(this.state.datose[i].id)) {
                            b = true;
                        }

                    }
                    var idlugar = this.state.datose[i].id;
                    var nombrelugar = this.state.datose[i].nombre;
                    var ubicacion = this.state.datose[i].ubicacion;
                    var checked = b;
                    llugares[cont] = [
                        idlugar, nombrelugar, ubicacion, checked
                    ];
                    cont++;

                }


            } else {
                // console.log('datos es null');
                for (var i = 0; i < limite; i++) {
                    var idlugar = this.state.datose[i].id;
                    var nombrelugar = this.state.datose[i].nombre;
                    var ubicacion = this.state.datose[i].ubicacion;
                    var checked = false;
                    llugares[cont] = [
                        idlugar, nombrelugar, ubicacion, checked
                    ];
                    cont++;
                }

            }
            this.setState({ listalugares: llugares, listalugaresmod: llugares });
            //   console.log('listalugares: ', this.state.listalugares);
            return llugares;
        } catch (error) {
            console.log('error gruposg: ', error);
        }

    }


    guardar = () => {
        //   console.log('guardar producto');
        if (!this.state.editar) {
            var idproducto = 0;
            this.setState({ isLoading: true }, () => {
                fetch(INSERTAR_PRODUCTO,
                    {
                        method: 'post',
                        headers:
                        {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(
                            {
                                etiqueta: this.state.etiqueta,
                                nombre: this.state.nombre,
                                precio: this.state.precio,
                                idtipoproducto: this.state.idtipoproducto,
                                idusuario: this.state.idusuario,
                                url: urllocal2,
                                //lista: lista
                                lista: this.state.listalugares
                            })
                    }).then((response) => response.json())
                    .then((responseJson) => {
                        try {
                            navigate("misProductos");


                            idproducto = responseJson.split('|')[1];
                            //console.log('idproducto: ', idproducto);
                            let subir = subirImagenAmazon(uriimagenvacia, 0, idproducto, 2);
                            alert(responseJson.split('|')[0]);
                            //alert(responseJson);
                            //console.log('responseJson: ', responseJson);
                            this.setState({ isLoading: false });
                        } catch (error) {
                            console.log('error guardar producto: ', responseJson);
                        }

                    }).catch((error) => {
                        console.error(error);
                        this.setState({ isLoading: false });
                    })
            });
            //console.log('idproductocrearproducto: ', idproducto);

            //this.getImagenes2(idproducto);
        } else {
            // console.log('nit: ', this.state.nit,
            //     ',nombre: ', this.state.nombre, ',ubicacion: ', this.state.ubicacion,
            //     ', telefonos: ', this.state.telefonos, ', idusuario: ', this.state.idusuario,
            //     ', idestado: ', this.state.idestado, ', idempresa: ', this.state.idempresa);

            //this.setState({ idestado: 1 });
            var lista = [];
            var listaa = [];
            var cont = 0;
            var operacion = [];
            operacion[0] = [0, 1];
            for (var i = 0; i < this.state.listalugaresmod.length; i++) {
                var idlugar = this.state.listalugares[i][0];
                if (this.state.listalugares[i][3] && !this.state.listalugaresmod[i][3]) {
                    //var checked = this.state.listalugares[i][3];
                    lista[cont] = [idlugar, operacion[0][0]];//0 inserta
                    cont++;
                }
                else {
                    if (this.state.listalugares[i][3]) {
                        lista[cont] = [idlugar, operacion[0][1]];//1 modifica
                        cont++
                    }
                }
            }
            listaa = lista;
            //enviar = listamodificar;
            //  console.log('modificar producto: ', this.state.id, ' ', this.state.etiqueta, ' ', this.state.nombre, ' ',
            // this.state.precio, ' ', ' ', listaa);
            this.setState({ isLoading: true }, () => {
                fetch(MODIFICAR_PRODUCTO,
                    {
                        method: 'post',
                        headers:
                        {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(
                            {
                                id: this.state.id,
                                etiqueta: this.state.etiqueta,
                                nombre: this.state.nombre,
                                precio: this.state.precio,
                                lista: listaa
                            })
                    }).then((response) => response.json())
                    .then((responseJson) => {
                        try {
                            navigate("misProductos");
                            alert(responseJson);
                            this.setState({ isLoading: false });
                        } catch (error) {
                            console.log('error prodlugar: ', responseJson);
                        }

                    }).catch((error) => {
                        console.error('ins mod producto lugar: ');
                        this.setState({ isLoading: false });
                    })
            });
        }
    }

    getNavigationParams() {
        return this.props.navigation.state.params || {};
    }

    static navigationOptions = ({ navigation }) => {
        //  console.log('navigation producto: ', navigation.state.params.hayproducto);

        if (!navigation.state.params.hayproducto) {
            try {
                return {
                    headerTitleAlign: 'center',
                    title: navigation.state.params.title,
                    //tabBarVisible: false


                }
            } catch (error) {
                return {
                    headerTitleAlign: 'center',
                    title: 'Crear Producto',


                }
            }
        }
        try {
            return {
                headerTitleAlign: 'center',
                title: navigation.state.params.title,
                headerRight: () => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('crearFoto', { id: idprod, tabla: 2, nombreitem: nombreproducto })}>
                        <MaterialIcons name='photo-camera' size={25} />
                    </TouchableOpacity>
                )

            }
        } catch (error) {
            return {
                headerTitleAlign: 'center',
                title: 'Crear Lugar',
                headerRight: () => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('crearFoto')}>
                        <MaterialIcons name='photo-camera' size={25} />
                    </TouchableOpacity>
                )

            }
        }



    };

    getImagenes() {

        var listaimagenes = [];

        //this.setState({ isLoading: true });
        //console.log("datosi: ", this.state.datosi, ", cant imagenes: ", this.state.cantImagenes);
        for (var i = 0; i < this.state.cantImagenes; i++) {
            //console.log('id: ', this.state.datosi[i].id);
            listaimagenes[i] = {
                id: this.state.datosi[i].id,
                url: this.state.datosi[i].url,
                nombre: this.state.datosi[i].nombre,
                detalle: 1,

            }
            //console.log('bucle imagenes: ', listaimagenes[i]);
        }
        if (listaimagenes.length > 1) {
            listaimagenes.splice(0, 1);
        }
        //   console.log('listaimageneslugar: ', listaimagenes);
        //this.setState({ isLoading: false });
        return (
            listaimagenes
        );
    }
    setCheckedLugar(id) {
        if (id == undefined) {
            return;
        }
        // var c = false;
        // var idg = 0;
        var listaaux = [];
        for (var j = 0; j < this.state.listalugares.length; j++) {

            //if (!checked) {
            var idlugar = this.state.listalugares[j][0];
            var nombrelugar = this.state.listalugares[j][1];
            var ubiaccion = this.state.listalugares[j][2];
            var checked = this.state.listalugares[j][3];
            //checked = this.state.listalugares[j][3];
            //  console.log('idlugar: ', idlugar);
            //   console.log('nombrelugar: ', nombrelugar);
            //  console.log('ubiaccion: ', ubiaccion);
            // console.log('checked: ', checked);
            listaaux[j] = [
                idlugar, nombrelugar, ubiaccion, checked
            ];
            // }
        }
        for (var i = 0; i < listaaux.length; i++) {
            if (id == listaaux[i][0]) {

                listaaux[i][3] = !listaaux[i][3];
                // c = listaaux[i][3];
                // if (c == true) {
                //     idg = id;
                // } else {
                //     idg = 0;
                // }
            } else {
                //listaaux[i].checked = false;
            }
        }
        //console.log('listaaux: ', listaaux);
        this.setState({
            //listalugares: listaaux
            listalugares: listaaux
            //, idlugar: idg
        });
        // return c;
    }

    getCheckedLugar(id) {
        for (var i = 0; i < this.state.listalugares.length; i++) {
            if (id == this.state.listalugares[i][0]) {
                return this.state.listalugares[i][3];
            }
        }
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



    getImagen = async (idimagen) => {
        //  console.log('getImagen////////////////////////');
        // console.log('imagen visible: ', this.state.imagenvisible);
        // console.log('id de la imagen: ', idimagen);
        await fetch(GET_IMAGEN_PRODUCTO, {
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
                nombreprod: this.state.nombre,
                nombrelugar: this.state.nombrelugar,
                ubicacion: this.state.ubicacion,
                url: this.state.datosib[0].url,
                idproducto: this.state.datosib[0].idproducto,
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
        //console.log('setVisible.item: ', item);
        this.setState({ imagenvisible: true, idimagen: item });
        //var v = this.state.imagenvisible;
        //console.log('imagen visible: ', v, ', item: ', item.id);

        //  console.log('setVisible.if');
        this.getImagen(item);



    }
    cerrar = () => {
        this.setState({ imagenvisible: !this.state.imagenvisible });
    }

    borrarfoto = async (id, nombre) => {
        this.setState({ isLoading: true });
        let subir = borrarimagenarchivo(id, nombre, "imagenp");
        if (subir === "error") {
            this.setState({ isLoading: false });
            alert('error al eliminar la foto');

        } else {
            console.log('entro a borrar foto imagen borrada');
            var cantim = this.state.cantImagenes - 1;
            this.setState({ cantImagenes: cantim, imagenborrada: true, isLoading: true });


            this.rerender();
            alert('se elimino la foto');
        }

        this.cerrar();

    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator
                    />
                </View>
            );
        }
        return (

            <FlatList
                ListHeaderComponent={
                    <>
                        <NavigationEvents
                            onDidFocus={this.rerender.bind(this)}
                        />
                        <CardSection>

                            <ResultsList
                                results={this.getImagenes()}
                                presionar={{ visible: this.setVisible.bind(this) }}
                            />


                        </CardSection>



                        <CardSection>
                            <InfoBox label='Tipo' value={this.state.nombretipo}>

                            </InfoBox>
                        </CardSection>

                        <CardSection>
                            <Input
                                label="Nombre"
                                placeholder="Torta de Chocolate"
                                onChangeText={(texto) => this.setState({ nombre: texto })}
                                value={this.state.nombre}
                            />
                        </CardSection>

                        <CardSection>
                            <Input
                                label="Etiqueta"
                                placeholder="chocolate"
                                onChangeText={(texto) => this.setState({ etiqueta: texto })}
                                value={this.state.etiqueta}
                            />
                        </CardSection>

                        <CardSection>
                            <Input
                                label="Precio"
                                placeholder="150"
                                onChangeText={(texto) => this.setState({ precio: texto })}
                                value={this.state.precio.toString()}
                            />
                        </CardSection>


                        <CardSection style={styles.MainContainer}>
                            <Text >
                                {this.props.navigation.state.params.editar == true ?
                                    'Cambia el lugar' :
                                    'Escoge un lugar'}
                            </Text>

                        </CardSection>
                        {this.state.imagenvisible ?
                            <BorrarImagen
                                visible={this.state.imagenvisible}
                                cerrar={this.cerrar.bind(this)}
                                results={this.state.datosimagen}
                                borrarbtn={this.state.cantImagenes > 1}
                                borrar={{ borrar: this.borrarfoto.bind(this) }}
                            >

                            </BorrarImagen> : null}
                    </>
                }
                data={this.state.datose}
                renderItem={({ item: rowData }) => this.renderRowLugar(rowData)}
                ListFooterComponent={
                    < CardSection >
                        <Button
                            onPress={this.guardar}
                        >
                            {this.state.nombreBoton}
                        </Button>
                    </CardSection >
                }


            />
        );
    }
}



const styles = StyleSheet.create({
    containerStyle: {
        //backgroundColor: 'rgba(0,0,0,0.75)',
        //position: 'relative',
        justifyContent: 'center',
        flexGrow: 1
        //flex: 1
    },
    MainContainer:
    {
        justifyContent: 'center',
        flex: 1,
        margin: 10

    }
});



export default CrearProductoScreen;