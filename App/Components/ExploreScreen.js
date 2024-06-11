import React, { useEffect } from "react";
import { View, Text, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { ActionPokemon } from "../Redux/Actions/Pokemon";
import PokemonList from "./PokemonList";
import Spinner from 'react-native-loading-spinner-overlay';
import ErrorModal from "./ErrorModal";

const ExploreScreen = () => {
    const dispatch = useDispatch();
    const { pokemonList, pokemonSpinner, errorModal } = useSelector((state) => state.pokemon);

    const getAllPokemon = () => {
        try {
            dispatch(
                ActionPokemon.GetAllPokemon(),
            );
        } catch (error) {
            console.log('Error Get All Pokemon: ', error);
        }
    }

    useEffect(() => {
        getAllPokemon()
    }, [])

    console.log(pokemonList)

    return (
        <View style={{ flex: 1 }}>
            {errorModal
                ? <ErrorModal method={getAllPokemon} />
                : <FlatList
                style={{ marginTop: 15, marginHorizontal: 15 }}
                nestedScrollEnabled
                data={pokemonList?.results}
                renderItem={({ index, item }) => <PokemonList item={item} index={index} />}
                keyExtractor={(item) => `${item.name}`}
                testID="contact-list"
            />
            }
            <Spinner
                testID="spinner"
                visible={pokemonSpinner}
                textContent={'Loading...'}
                textStyle={{ color: '#273D71' }}
            />
        </View>
    );
}

export default ExploreScreen;
