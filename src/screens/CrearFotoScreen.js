import React, { Component } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Clipboard,
    Image,
    Share,
    StatusBar
} from 'react-native';
import { Button, CardSection } from '../components/common';
import { MaterialIcons } from '@expo/vector-icons';
import * as Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import {
    urllocal,
    urllocal2,
    INSERTAR_IMAGENL,
    INSERTAR_IMAGENP,
    CANT_IMAGENES_LUGAR,
    CANT_IMAGENES_PRODUCTO,
    SUBIR_FOTOL,
    SUBIR_FOTOP,

} from '../php/consultas';
class CrearFotoScreen extends Component {

    constructor(props) {
        super(props);
       // console.log('estoy en camara ');
        this.state = {
            image: null,
            uploading: false,
            cantidad: 0,
            id: 0,
            nombre: '',
            url: '',
            fecha: '',
            datos: null,
            tabla: 0,
            nombreitem: ""
        };
    }

    async componentDidMount() {
        var a = this.props.navigation.state.params.id;
        var tabla = this.props.navigation.state.params.tabla;
        var nombreitem = this.props.navigation.state.params.nombreitem;
        //console.log('id: ', a, ', tabla: ', tabla);
        var PHP = '';
        switch (tabla) {
            case 1:
                PHP = CANT_IMAGENES_LUGAR;
                break;
            case 2:
                PHP = CANT_IMAGENES_PRODUCTO;
                break;
        }
        this.setState({ id: a, tabla: tabla, nombreitem: nombreitem });
        //console.log('id: ', a);


        if (a != undefined) {
            //('a: ', a);
            return fetch(PHP, {
                method: 'POST',
                headres: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({

                    id: a

                })
            })
                .then((response) => response.json())
                .then((responseJson) => {

                    this.setState({

                        cantidad: responseJson[0].cantidad


                    });
                    console.log('cantidad:   ', this.state.cantidad);
                    //this.props.navigation.setParams({ title: this.state.titulo, icon: this.state.icono });
                    //console.log('lugaressss');
                    //console.log(this.state.id, " ", this.state.nit);

                })
                .catch((error) => {
                    console.error(error);
                });
        }


    }

    guardarMysql() {
        var TAB = '';
        //console.log('tablaass: ', this.state.tabla);
        switch (this.state.tabla) {
            case 1:
                TAB = INSERTAR_IMAGENL;
                break;
            case 2:
                TAB = INSERTAR_IMAGENP;
                break;
        }
        this.setState(() => {
            fetch(TAB,
                {
                    method: 'post',
                    headers:
                    {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: this.state.id,
                        url: this.state.url,
                        nombre: this.state.nombre
                    })
                })
                .then((response) => response.text())
                .then((responseJsonFromServer) => {
                    alert(responseJsonFromServer);
                })
                .catch((error) => {
                    console.error(error);
                });
        });
    }

    render() {
        let {
            image
        } = this.state;
        return (
            <View style={styles.container}>
                <StatusBar barStyle="default" />

                <Text>
                    {this.state.nombreitem}
                </Text>
                <CardSection >

                    <Button
                        //onPress={this._pickImage}
                        onPress={this._pickImage}
                    >
                        < MaterialIcons name="photo-library" size={20} />
                    </Button>



                    <Button onPress={this._takePhoto} >
                        < MaterialIcons name="photo-camera" size={20} />
                    </Button>
                </CardSection>


                {this._maybeRenderImage()}
                {this._maybeRenderUploadingOverlay()}
            </View>
        );
    }

    _maybeRenderUploadingOverlay = () => {
        if (this.state.uploading) {
            return (
                <View
                    style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
                    <ActivityIndicator color="#fff" size="large" />
                </View>
            );
        }
    };

    _maybeRenderImage = () => {
        let {
            image
        } = this.state;

        if (!image) {
            return;
        }

        return (
            <View
                style={styles.maybeRenderContainer}>
                <View
                    style={styles.maybeRenderImageContainer}>
                    <Image source={{ uri: image }} style={styles.maybeRenderImage} />
                </View>

                <Text
                    onPress={this._share}
                    onLongPress={this._share}
                    style={styles.maybeRenderImageText}>
                    < MaterialIcons name="share" size={20} />
                </Text>
            </View>
        );
    };

    _takePhoto = async () => {
        var cant = parseInt(this.state.cantidad);
        this.setState({ nombre: '', url: '', cantidad: cant, datos: null, image: null });

        const {
            status: cameraPerm
        } = await Permissions.askAsync(Permissions.CAMERA);

        const {
            status: cameraRollPerm
        } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        // only if user allows permission to camera AND camera roll
        if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
            let pickerResult = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });

            this._handleImagePicked(pickerResult);
        }
    };

    _pickImage = async () => {
        var cant = parseInt(this.state.cantidad);
        this.setState({ nombre: '', url: '', cantidad: cant, datos: null, image: null });

        const {
            status: cameraRollPerm
        } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        // only if user allows permission to camera roll

        if (cameraRollPerm === 'granted') {
            let pickerResult = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });
            //console.log('pickerResult esss: ', pickerResult);

            this._handleImagePicked(pickerResult);
        }
    };

    _handleImagePicked = async pickerResult => {
        let uploadResponse, uploadResult;

        try {
            this.setState({
                uploading: true
            });

            if (!pickerResult.cancelled) {
                //uploadResponse = await uploadImageAsync(pickerResult.uri);
                uploadResponse = await subirImagenAmazon(pickerResult.uri, { idlugar: this.state.id, cantidad: this.state.cantidad }, this.state.tabla);

                let u = uploadResponse.split('|');
               // console.log('u:', u);
                let uu = u[0] + u[1];
                this.setState({ url: uu, nombre: u[1] });
               // console.log('imagen a mostrar: ', this.state.url);
                //console.log('nombre a guardar: ', this.state.nombre);
                //uploadResult = await uploadResponse.json();
                //console.log('uploadresult es: ', uploadResult);
                this.guardarMysql();
                var can = this.state.cantidad + 1;
                this.setState({
                    image: uu,
                    cantidad: can
                });
            }
        } catch (e) {
           // console.log({ uu });
            //console.log({ uploadResult });
           // console.log({ e });
            alert('Upload failed, sorry :(');
        } finally {
            this.setState({
                uploading: false
            });
        }
        //////////////////////////////
        //console.log('lugar: ', this.state.idlugar, 'cantidad: ', this.state.cantidad + 1);


    };
    _share = () => {
        Share.share({
            message: this.state.image,
            title: 'Check out this photo',
            url: this.state.image,
        });
    };
    _copyToClipboard = () => {
        Clipboard.setString(this.state.image);
        alert('Copied image URL to clipboard');
    };


}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    exampleText: {
        fontSize: 20,
        marginBottom: 20,
        marginHorizontal: 15,
        textAlign: 'center',
    },
    maybeRenderUploading: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
    },
    maybeRenderContainer: {
        borderRadius: 3,
        elevation: 2,
        marginTop: 30,
        shadowColor: 'rgba(0,0,0,1)',
        shadowOpacity: 0.2,
        shadowOffset: {
            height: 4,
            width: 4,
        },
        shadowRadius: 5,
        width: 250,
        alignItems: 'center'
    },
    maybeRenderImageContainer: {
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        overflow: 'hidden',
    },
    maybeRenderImage: {
        height: 250,
        width: 250,
    },
    maybeRenderImageText: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    }
});

// CrearLugarScreen.navigationOptions = ({ navigation }) => {
//     return {
//         headerRight: () => (
//             <TouchableOpacity
//             // onPress={() => navigation.navigate('crearLugar')}
//             >
//                 <MaterialIcons name='add' size={35} />
//             </TouchableOpacity>
//         )
//     };
// }
async function subirImagenAmazon(uri, parametros, tabla) {

    var c = parseInt(parametros['cantidad']);
    var nombre = parametros['idlugar'] + '-' + c + '.jpg';
    //console.log('nombre adentro', nombre);
    let match = /\.(\w+)$/.exec(nombre);

    const file = {
        uri: uri,
        name: nombre,
        //type: 'image/png'
        type: match ? `image/${match[1]}` : `image`
    }
    //console.log('file es: ', file);
    // const config = {
    //     keyPrefix: 'imagenes/',
    //     bucket: 'whereappbucket',
    //     region: 'us-east-2',
    //     accessKey: 'AKIAYECEPNDC3RRCKQ6D',
    //     secretKey: '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',
    //     successActionStatus: 201
    // }
    // console.log('config es: ', config);
    // let resp = '';
    // RNS3.put(file, config)
    //     .then((response) => {
    //         console.log('response: ', response);
    //         console.log('location: ', response.body.postResponse.location);
    //     });
    const formData = new FormData();

    formData.append('photo', file);
    var subirfoto = '';
    switch (tabla) {
        case 1:
            subirfoto = SUBIR_FOTOL;
            break;
        case 2:
            subirfoto = SUBIR_FOTOP;
            break;
    }
    await fetch(subirfoto, {
        method: 'POST',
        body: formData,
        headers: {
            'content-type': 'multipart/form-data'
        }
    });

    //await guardarMysql(nombre, urlAmazon, parametros['idlugar']);
    //return 'https://whereappbucket.s3.amazonaws.com/imagenes/6-1.jpg';
    var urls = '';
    switch (tabla) {
        case 1:
            urls = urllocal;
            break;
        case 2:
            urls = urllocal2;
            break;
    }
    //console.log('urls: ', urls);
    return `${urls}|${nombre}`;
}
export default CrearFotoScreen;