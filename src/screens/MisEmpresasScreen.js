import React, { Component } from 'react';
import {
    View, Text, StyleSheet,
    FlatList, TouchableOpacity,
    ActivityIndicator, AsyncStorage
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
    LISTA_EMPRESAS_X_USUARIO,
    LISTA_EMPRESAS_X_USUARIO_X_BUSCAR
} from '../php/consultas';
import ElementoLista from '../components/ElementoLista';
import SearchBar from '../components/common/SearchBar';
import { navigate } from '../navigationRef';
import { NavigationEvents } from 'react-navigation';

class MisEmpresasScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datos: null,
            isLoading: true,
            idusuario: 0,
            idempresa: 0,
            term: '',
            busqueda: false
        }
    }

    abrirDetalles(data) {
        //console.log('props navigation: ', this.props.navigation)
        //this.props.navigation.navigate('crearLugar', { ClickItemHolder: id });
        this.props.navigation.navigate('editarEmpresa', { editar: true, id: data.id });
    }

    async getTokens() {

    }

    async componentDidMount() {
        //this.getTokens();
        this.setState({
            idusuario: (await AsyncStorage.getItem('elytoken')).split('|')[0],
            idempresa: (await AsyncStorage.getItem('elytoken')).split('|')[7]
        });
       // console.log('estoy en mis empresas: idusuario=', this.state.idusuario,
           // ', idempresa=', this.state.idempresa);
        try {
            const response = await fetch(LISTA_EMPRESAS_X_USUARIO, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idusuario: this.state.idusuario,

                })
            });
            const responseJson = await response.json();
            this.setState({
                isLoading: false,
                datos: responseJson,
            });
            // console.log('lugares');
       //     console.log('cant tipo de productos: ', this.state.datos);
        }
        catch (error) {
            //console.error(error, ' datos: ', this.state.datos);
            this.setState({ isLoading: false });
        }
    }

    // onPressIcon(id) {
    //     //console.log('prueba elemento lista');
    //     //this.props.navigation.navigate('detalleLugar', { lugar: id });
    //     this.props.navigation.navigate('misProductosLugar', { idlugar: id });
    // }

    setLogueado = (id) => {
      //  console.log('idempresa: ', this.state.idempresa);
        for (var a = 0; a < this.state.datos.length; a++) {
         //   console.log('setLogueado: ', this.state.datos[a].id);
            if (id == this.state.idempresa) {
                return true;
            }
        }
        return false;
    }

    renderRow = (rowData) => {
        return (
            // <Text style={styles.rowViewContainer}
            //     onPress={this.abrirDetalles.bind(this, rowData.id)}>
            //     {rowData.id + ' '}
            //     {rowData.nombre + ' '}
            //     {rowData.ubicacion}

            // </Text>

            <ElementoLista
                label={rowData.nombre}
                onPressText={this.abrirDetalles.bind(this, rowData)}
                //onPressIcon={this.onPressIcon.bind(this, rowData.idlugar)}
                logueado={this.setLogueado(rowData.id)}
                editor={false}
            >

            </ElementoLista>


        );
    }

    renderRefreshControl = async () => {
        try {
            const response = await fetch(LISTA_EMPRESAS_X_USUARIO, {
                method: 'POST',
                headres: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idusuario: this.state.idusuario,
                    //idempresa: this.state.idempresa
                    //tabla: 'lugares',
                })
            });
            const responseJson = await response.json();
            this.setState({
                isLoading: false,
                datos: responseJson,
                term: ''
            });
            // console.log('lugares');
          //  console.log('cant tipo de productos: ', this.state.datos);
        }
        catch (error) {
            //console.error(error, ' datos: ', this.state.datos);
            this.setState({ isLoading: false });
        }
    }

    static navigationOptions = ({ navigation }) => {
        try {
            return {
                headerTitleAlign: 'center',
                title: 'Mis Empresas',
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

    async buscar() {
        this.setState({ isLoading: true });
        try {
            const response = await fetch(LISTA_EMPRESAS_X_USUARIO_X_BUSCAR, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idusuario: this.state.idusuario,
                    //idempresa: this.state.idempresa,
                    nombre: this.state.term
                    //tabla: 'lugares',
                })
            });
            const responseJson = await response.json();
            this.setState({
                isLoading: false,
                datos: responseJson,
            });
            // console.log('lugares');
         //   console.log('cant tipo de productos: ', this.state.datos);
        }
        catch (error) {
            //console.error(error, ' datos: ', this.state.datos);
            this.setState({ isLoading: false, busqueda: false });
        }
    }

    async recargar() {
        this.setState({ isLoading: true })
        try {
            const response = await fetch(LISTA_EMPRESAS_X_USUARIO, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idusuario: this.state.idusuario,
                    //idempresa: this.state.idempresa
                    //tabla: 'lugares',
                })
            });
            const responseJson = await response.json();
            this.setState({
                isLoading: false,
                datos: responseJson,
                term: ''
            });
            // console.log('lugares');
         //   console.log('cant tipo de productos: ', this.state.datos);
        }
        catch (error) {
            //console.error(error, ' datos: ', this.state.datos);
            this.setState({ isLoading: false });
        }
    }

    async rerender() {
        try {
            const response = await fetch(LISTA_EMPRESAS_X_USUARIO, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idusuario: this.state.idusuario,

                })
            });
            const responseJson = await response.json();
            this.setState({
                isLoading: false,
                datos: responseJson,
            });
            // console.log('lugares');
        //    console.log('cant tipo de productos: ', this.state.datos);
        }
        catch (error) {
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
                            onTermChange={(texto) => this.setState({ term: texto, datos: null, busqueda: true })}
                            onTermSubmit={() => this.buscar()}
                        //clearSearch={() => this.clearSearch()}
                        />
                        <FlatList
                            data={this.state.datos}
                            renderItem={({ item: rowData }) => this.renderRow(rowData)}
                            onRefresh={() => this.renderRefreshControl()}
                            refreshing={this.state.isLoading}
                            keyExtractor={(item, index) => item.id}

                        />
                    </View>


                </>
            );
        }
    }

}


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
export default MisEmpresasScreen;