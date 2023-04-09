import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';


const ResultsDetail = ({ result, grande }) => {

    //var urlimagen = `../../imagenes/${result.image_url}`;
    //console.log(urlimagen);
    return <View style={styles.container}>
        {/*<Text>Results Detail</Text>*/}
        {result.nombrelugar != null && result.nm ?
            <Text style={{ alignSelf: 'center' }}>{result.nombrelugar}</Text> :
            null
        }
        {grande == true ?
            <Image style={styles.imagengrande}
                source={{ uri: result.url }}

            //source={require('../../imagenes/descarga1.jpg')}
            />
            :
            <Image style={styles.image}
                source={{ uri: result.url }}

            //source={require('../../imagenes/descarga1.jpg')}
            />
        }

        <Text style=
            {{ alignSelf: 'center' }}
        >
            {result.etiqueta}
        </Text>

        {result.precio != null ? <Text style=
            {{ alignSelf: 'center', fontWeight: 'bold' }}
        >{result.precio + ' Bs'}
        </Text> : null}


        {/* <Text
            style={styles.name}>{result.name}
        </Text>
        <Text>
            {result.rating} Stars, {result.review_count} Reviews
        </Text> */}
    </View>
};

const styles = StyleSheet.create({
    container: {
        marginLeft: 5,
    },
    image: {
        width: 80,//120,//180,
        height: 60,//100,//120,
        borderRadius: 4,
        marginTop: 10
    },
    name: {
        fontWeight: 'bold'
    },
    imagengrande: {
        width: 180,
        height: 120,
        borderRadius: 4,
        marginTop: 10
    }
});

export default ResultsDetail;