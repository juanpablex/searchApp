import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
class CrearCompraScreen extends Component {
    render() {
        return (
            <View >
                <Text>Compras</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});

// CrearVentaScreen.navigationOptions = ({ navigation }) => {
//     return {
//         headerRight: () => (
//             <TouchableOpacity
//                 onPress={() => navigation.navigate('crearFoto')}
//             >
//                 <MaterialIcons name='add' size={35} />
//             </TouchableOpacity>
//         )
//     };
// }

export default CrearCompraScreen;