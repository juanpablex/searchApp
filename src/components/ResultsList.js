import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import ResultsDetail from './ResultsDetail';
import BorrarImagen from './BorrarImagen';
import { navigate } from '../navigationRef';


const ResultsList = ({ title, results, grande, presionar }) => {
    //console.log('resultadosJp: ', results[0].detalle);
   //console.log('grandeee: ', { grande }, ', title: ', { title }, ', results: ', results);
    if (results == null) {
        return null;
    }
    if (!results.length) {
        return null;
    }
    // console.log('resultlist: ', results);
    // if (results == undefined) {
    //     return null;
    // }
    const borrarImagen = () => {
        if (grande == true) {
            alert('mostrarImagen')
        }

    }
    const visible = (item) => {
        presionar.visible(item.id)
    }
    function detalles(item) {
        navigate(`${item.navegar}`,
            {
                id: item.id,
                nombrelugar: item.nombrelugar,
                ubicacion: item.ubicacion,
                editar: item.editar,
                idlugar: item.idlugar,
                nombretipo: item.nombretipo
            })
    }
    return <View style={styles.container}>

        {/*<Text>ResultList</Text>*/}
        <Text style={styles.title}>{title}</Text>
        {/*<Text>Results:{results.length}</Text>*/}
        
        {results[0].detalle != null ?
            <FlatList
                style={{ marginTop: 10 }}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={results}
                keyExtractor={result => result.id}
                //onRefresh={() => this.renderRefreshControl()}
                //refreshing={isLoading}
                renderItem={({ item }) => {
                    //return <Text>{item.name}</Text>

                    return (

                        <TouchableOpacity

                            onPress={() =>
                                //borrarImagen()//navigate('detalleProducto', { id: item.id })
                                visible(item)
                            }
                        >
                            <ResultsDetail result={item} grande={grande} />
                        </TouchableOpacity>
                    )
                }}
            />
            :
            <FlatList
                style={{ marginTop: 10 }}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={results}
                keyExtractor={result => result.id}
                //onRefresh={() => this.renderRefreshControl()}
                //refreshing={isLoading}
                renderItem={({ item }) => {
                    //return <Text>{item.name}</Text>
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                detalles(item);
                                //visible(item);
                            }
                                //presionar.visible(item.id),



                            }
                        >
                            <ResultsDetail result={item} grande={grande} />
                        </TouchableOpacity>
                    )
                }}
            />

        }


    </View>
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 2,
        marginRight: 10,
        marginTop: -25
    },
    title: {
        //fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 15,
        //marginBottom: 5
    }
});

//export default withNavigation(ResultsList);
export { ResultsList };