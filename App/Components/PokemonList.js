import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from "@react-navigation/native";

const PokemonList = ({ item, index }) => {
    const navigation = useNavigation()

    const capitalizeFirstLetter = (str) => {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
    };

    return (
        <TouchableOpacity
            style={styles.pokemonContainer}
            onPress={() => navigation.navigate('PokemonDetailPage', { item, index })}
        >
            <View style={styles.row}>
                <View>
                    <Image
                        source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png` }}
                        style={styles.image}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{capitalizeFirstLetter(item?.name)}</Text>
                </View>
                <View style={styles.iconContainer}>
                    <FontAwesome5 name={'chevron-right'} size={8} color={'#FFF'} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    pokemonContainer: {
        borderWidth: 1,
        borderColor: '#CACEDD',
        borderRadius: 6,
        marginBottom: 14
    },
    row: {
        marginVertical: 10,
        marginHorizontal: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    image: {
        width: 58,
        height: 58,
        borderRadius: 25,
    },
    textContainer: {
        marginLeft: 12,
        flex: 1,
    },
    name: {
        fontSize: 14,
        fontFamily: 'Poppins-Bold',
        color: '#000'
    },
    iconContainer: {
        width: 16,
        height: 16,
        borderRadius: 12,
        backgroundColor: '#FFCC03',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default PokemonList;
