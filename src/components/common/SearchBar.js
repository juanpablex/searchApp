import React from 'react';
import { View, Tet, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';

const SearchBar = ({ term, onTermChange, onTermSubmit }) => {
    return (
        <View style={styles.backgroundStyle}>
            <Feather name="search" style={styles.iconStyle} />
            <TextInput style={styles.inputStyle}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Buscar"
                value={term}
                onChangeText={newTerm => onTermChange(newTerm)}
                onEndEditing={() => onTermSubmit()}

            />
            {/* <TouchableOpacity
                onPress={() => clearSearch()}
            >
                <MaterialIcons name="clear" style={styles.iconStyle} />
            </TouchableOpacity> */}

        </View>
    );
};

const styles = StyleSheet.create({
    backgroundStyle: {
        backgroundColor: '#F0EEEE',
        height: 20,
        borderRadius: 5,
        marginHorizontal: 10,
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 10

    },
    inputStyle: {
        //borderColor: 'black',
        //borderWidth: 1,
        flex: 1,
        fontSize: 18//14 es el default
    },
    iconStyle: {
        fontSize: 25,
        alignSelf: 'center',
        marginHorizontal: 15
    }
});

export default SearchBar;
