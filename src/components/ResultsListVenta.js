import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import ResultsDetail from './ResultsDetail';
import { navigate } from '../navigationRef';
import ElementoVenta from '../components/ElementoVenta';

const ResultsListVenta = ({ onPressRemove, onPressAdd, results, cantreturn }) => {
    //console.log('resultadosJp: ', results[0].detalle);
    //const [cant, setCant] = useState(0);
    if (!results.length) {
        return null;
    }
    const cantidad = (item) => {
        //console.log('cant en resultlistventa: ', onPressAdd, ', return: ', item);

        //return cantreturn;
    }

    return <View style={styles.container}>
        {/*<Text>ResultList</Text>*/}
        <Text style={styles.title}></Text>
        {/*<Text>Results:{results.length}</Text>*/}


        <FlatList
            style={{ marginTop: 10 }}
            vertical
            showsHorizontalScrollIndicator={false}
            data={results}
            keyExtractor={result => result.id}
            //onRefresh={() => this.renderRefreshControl()}
            //refreshing={isLoading}
            renderItem={({ item }) => {
                //return <Text>{item.name}</Text>
                return (

                    <ElementoVenta
                        etiqueta={item.etiqueta}
                        precio={item.precio}
                        stock={item.stock}
                        cantidad={item.cantidad}
                        total={item.total}

                        onPressRemoveVenta={(cant) => {
                            onPressRemove.change(
                                item.id,
                                item.nombre,
                                item.precio,
                                item.stock,
                                cant
                            )
                        }}
                        //onPressAdd={() => onPressAdd.change(item.precio)}
                        onPressAddVenta={(cant) => {

                            onPressAdd.change(
                                item.id,
                                item.nombre,
                                item.precio,
                                item.stock,
                                cant
                                //cantreturn
                            )//, cantreturn.cant
                            //, onPressAdd.cant(res)
                        }}

                    //cantreturn={() => cantidad()}

                    //onPressText={this.abrirDetalles.bind(this, rowData.id)}
                    //onPressIcon={this.onPressIcon.bind(this, rowData.id)}
                    //editor={false}
                    >

                    </ElementoVenta>

                )
            }}
        />




    </View>
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 5,
        marginRight: 5,
        marginTop: -20
    },
    title: {
        //fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15,
        //marginBottom: 5
    }
});

//export default withNavigation(ResultsList);
export { ResultsListVenta };