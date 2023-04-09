import {
    AsyncStorage
} from 'react-native';
import { SUBIR_FOTOL, SUBIR_FOTOP, urllocal, urllocal2 } from '../php/consultas';
export async function subirImagenAmazon(uri, cantidad, id, tabla) {

    var c = parseInt(cantidad);
    var nombre = id + '-' + c + '.jpg';
    //console.log('nombre adentro', nombre);
    let match = /\.(\w+)$/.exec(nombre);

    const file = {
        uri: uri,
        name: nombre,
        //type: 'image/png'
        type: match ? `image/${match[1]}` : `image`
    }
   
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
    //console.log('urls:', urls, nombre);
    return `${urls}|${nombre}`;
}