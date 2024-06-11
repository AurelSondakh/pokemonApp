import React, { useEffect } from "react";
import { View, Text, FlatList } from 'react-native'
import { useDispatch, useSelector, Flatlist } from 'react-redux';
import { ActionPokemon } from "../Redux/Actions/Pokemon";
import PokemonList from "./PokemonList";

const ExploreScreen = () => {
    const dispatch = useDispatch();
    const { pokemonList, pokemonSpinner, errorModal } = useSelector((state) => state.pokemon);

    useEffect(() => {
        const getAllPokemon = () => {
            try {
                dispatch(
                    ActionPokemon.GetAllPokemon(),
                );
            } catch (error) {
                console.log('Error Get All Pokemon: ', error);
            }
        }
        getAllPokemon()
    }, [])

    console.log(pokemonList)

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                style={{ marginTop: 15, marginHorizontal: 15 }}
                nestedScrollEnabled
                data={pokemonList?.results}
                renderItem={({ index, item }) => <PokemonList item={item} index={index} />}
                keyExtractor={(item) => `${item.name}`}
                testID="contact-list"
            />
        </View>
    );
}

export default ExploreScreen;
