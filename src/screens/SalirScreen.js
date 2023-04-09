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
import { CardSection, Button } from '../components/common';
import { MaterialIcons } from '@expo/vector-icons';
import { navigate } from '../navigationRef';
class SalirScreen extends Component {
    async salir() {
        await AsyncStorage.removeItem('elytoken');
        navigate('login');
    }
    render() {
        return (
            <View style={styles.MainContainer}>
                <CardSection>
                    <Button onPress={() => this.salir()}>
                        Cerrar Sesión
                </Button>
                </CardSection>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    MainContainer:
    {
        justifyContent: 'center',
        flex: 1,
        margin: 10

    },

});

// SalirScreen.navigationOptions = ({ navigation }) => {
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

export default SalirScreen;