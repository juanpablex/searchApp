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
import { CardSection, InfoBox } from '../components/common';
import { MaterialIcons } from '@expo/vector-icons';
import KeyboarSpacer from 'react-native-keyboard-spacer';
import { navigate } from '../navigationRef';
import { ResultsList } from '../components/ResultsList';
import CrearLugarScreen from './CrearLugarScreen';
import {
    LISTA_IMAGENES_PRODUCTO,
    LISTA_PRODUCTOS_X_ID
} from '../php/consultas';

class DetalleProductoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datos: null,
            datosi: null,
            id: 0,
            idtipoproducto: 0,
            idusuario: 0,
            nombre: '',
            precio: 0.0,
            etiqueta: '',
            fecha: '',
            nombretipoproducto: '',
            nombrei: '',
            url: '',
            fechai: '',
            idimagen: 0,
            cantImagenes: 0,
            isLoading: true
        }
    }
    async componentDidMount() {

        var a = this.props.navigation.state.params.id;

        this.setState({
            id: a,
            idusuario: (await AsyncStorage.getItem('elytoken')).split('|')[0]
        });
      //  console.log('idproducto:  ', this.state.id);
        await fetch(LISTA_PRODUCTOS_X_ID, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: a
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    datos: responseJson,
                    idtipoproducto: responseJson[0].idtipoproducto,
                    nombre: responseJson[0].nombre,
                    precio: responseJson[0].precio,
                    etiqueta: responseJson[0].etiqueta,
                    fecha: responseJson[0].fecha,
                    nombretipoproducto: responseJson[0].nombretipoproducto
                });
                this.props.navigation.setParams({ title: this.state.nombre });
        //        console.log('datos: ', this.state.datos);

            })
            .catch((error) => {
                console.error(error);
                this.setState({ isLoading: false });
            });

        ////////////////lista imagenes lugar

        const response2 = await fetch(LISTA_IMAGENES_PRODUCTO, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: a
            })
        });
        const responseJson2 = await response2.json();
        this.setState({
            datosi: responseJson2,
            isLoading: false,
            //busqueda: false
        });
        this.setState({ cantImagenes: this.state.datosi.length });
      //  console.log('cant imagenes del lugar: ', this.state.datosi.length);



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
      //      console.log('bucle imagenes: ', listaimagenes[i]);
        }
      //  console.log('listaimageneslugar: ', listaimagenes);
        return (
            listaimagenes
        );
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
            <ScrollView
                contentContainerStyle={styles.containerStyle}
            >
                <View>
                    <CardSection>
                        <ResultsList results={this.getImagenes()}
                        />
                    </CardSection>
                    <CardSection>
                        <InfoBox label='Tipo : ' value={this.state.nombretipoproducto}></InfoBox>
                    </CardSection>

                    <CardSection>
                        <InfoBox label='Nombre : ' value={this.state.nombre}></InfoBox>
                    </CardSection>

                    <CardSection>

                    </CardSection>

                    <CardSection>

                    </CardSection>


                </View>
                <KeyboarSpacer />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({

});

// DetalleProductoScreen.navigationOptions = ({ navigation }) => {
//     return {
//         headerTextAlign: 'center',
//         headerRight: () => (
//             <TouchableOpacity
//                 onPress={() => navigation.navigate('crearProducto')}
//             >
//                 <MaterialIcons name='add' size={35} />
//             </TouchableOpacity>
//         )
//     };
// }

export default DetalleProductoScreen;