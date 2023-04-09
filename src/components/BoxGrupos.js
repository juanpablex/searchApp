import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { CheckBox } from 'react-native-elements';

const BoxGrupos = ({ results, l, e, p, g, v, c }) => {
    //console.log('resultadosJp: ', results[0].detalle);
    //const [cant, setCant] = useState(0);
    if (!results.length) {
        return null;
    }

    const setChecked = (id) => {
        switch(id){
            case 1:
                l=true;
                
        }
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

                    <CheckBox
                        title={item.nombregrupo}
                        checked={setChecked(item.idgrupo)}
                    />

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
export { BoxGrupos };