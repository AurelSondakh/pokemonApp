import React, { useEffect } from "react";
import { View, Text, StatusBar, TouchableOpacity, Image, Dimensions, ScrollView, FlatList } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import PokeColor from "../Styles/Colors/PokeColor";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import ErrorModal from "../Components/ErrorModal";
import { ActionPokemon } from "../Redux/Actions/Pokemon";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { toggleFavorite } from "../Redux/Reducers/Favorites";

const width = Dimensions.get('screen').width

const PokemonDetailPage = (props) => {
    const navigation = useNavigation()
    const item = props?.route?.params?.item
    const index = props?.route?.params?.pokemonId
    const dispatch = useDispatch();
    const { pokemonSpecies, pokemonDetail, pokemonSpinner, errorModal } = useSelector((state) => state.pokemon);
    const favorites = useSelector((state) => state.favorites);

    const capitalizeFirstLetter = (str) => {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
    };

    const getPokemonSpecies = () => {
        try {
            dispatch(ActionPokemon.GetPokemonSpecies(index));
            dispatch(ActionPokemon.GetPokemonDetail(index));
        } catch (error) {
            console.log('Error Get Pokemon Species: ', error);
        }
    }

    const handleFavoritePress = () => {
        dispatch(toggleFavorite(item));
    };
    const isFavorite = favorites.some(fav => fav.name === item.name);

    console.log(pokemonDetail)

    useEffect(() => {
        getPokemonSpecies()
    }, [])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (Platform.OS === 'android') {
                StatusBar.setBackgroundColor(PokeColor[item?.name]);
            }
            StatusBar.setBarStyle('light-content');
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <ScrollView>
            <View style={{ borderBottomLeftRadius: 220, borderBottomRightRadius: 220, height: 220, backgroundColor: PokeColor[item?.name], flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 10 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name={'chevron-left'} size={28} color={'#FFF'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleFavoritePress}>
                    <MaterialIcons name={isFavorite ? 'favorite' : 'favorite-outline'} size={28} color={'#FFF'} />
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: -200, alignItems: 'center' }}>
                <Image
                    source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index}.png` }}
                    style={{ width: 250, height: 250, borderRadius: 25 }}
                />
            </View>
            <View style={{ marginHorizontal: 20 }}>
                <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#000', fontSize: 24 }}>{capitalizeFirstLetter(item?.name)}</Text>
                {(errorModal)
                    ? <ErrorModal method={getPokemonSpecies} />
                    : pokemonSpecies && pokemonSpecies?.genera &&
                    <>
                        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 16, marginTop: -10 }}>{pokemonSpecies?.genera[7]?.genus}</Text>
                        <View style={{ flexDirection: 'row', marginVertical: 25 }}>
                            {pokemonDetail?.types?.map((item, index) => {
                                return (
                                    <View key={index} style={{ alignItems: 'center', flexDirection: 'row', marginRight: 10, backgroundColor: PokeColor[item?.type?.name], paddingHorizontal: 10, paddingVertical: 8, borderRadius: 20 }}>
                                        <View style={{ marginRight: 5, padding: 5, borderRadius: width / 2, backgroundColor: '#FFF' }}>
                                            <FontAwesome name="star" size={18} color={PokeColor[item?.type?.name]} />
                                        </View>
                                        <Text style={{ fontFamily: 'Poppins-Medium', color: '#000' }}>{capitalizeFirstLetter(item?.type?.name)}</Text>
                                    </View>
                                );
                            })}
                        </View>
                        <Text style={{ fontFamily: 'Poppins-Regular', paddingBottom: 25, borderBottomWidth: 1, borderColor: '#B2B2B2' }}>{pokemonSpecies?.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text.replace(/\n/g, ' ')}</Text>
                        <View style={{ paddingBottom: 25, borderBottomWidth: 1, borderColor: '#B2B2B2' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>
                                <View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5 }}>
                                        <FontAwesome5 name="weight-hanging" size={12} />
                                        <Text style={{ fontFamily: 'Poppins-SemiBold', marginLeft: 5, fontSize: 12 }}>Weight</Text>
                                    </View>
                                    <View style={{ paddingHorizontal: 15, borderWidth: 1, paddingVertical: 7, borderRadius: 20, borderColor: '#B2B2B2', width: 170 }}>
                                        <Text style={{ fontFamily: 'Poppins-Medium', color: '#000' }}>{pokemonDetail?.weight} kg</Text>
                                    </View>
                                </View>
                                <View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5 }}>
                                        <FontAwesome5 name="long-arrow-alt-up" size={15} />
                                        <Text style={{ fontFamily: 'Poppins-SemiBold', marginLeft: 5, fontSize: 12 }}>Height</Text>
                                    </View>
                                    <View style={{ paddingHorizontal: 15, borderWidth: 1, paddingVertical: 7, borderRadius: 20, borderColor: '#B2B2B2', width: 170 }}>
                                        <Text style={{ fontFamily: 'Poppins-Medium', color: '#000' }}>{pokemonDetail?.height} m</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>
                                <View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5 }}>
                                        <FontAwesome5 name="weight-hanging" size={12} />
                                        <Text style={{ fontFamily: 'Poppins-SemiBold', marginLeft: 5, fontSize: 12 }}>Habitat</Text>
                                    </View>
                                    <View style={{ paddingHorizontal: 15, borderWidth: 1, paddingVertical: 7, borderRadius: 20, borderColor: '#B2B2B2', width: 170 }}>
                                        <Text style={{ fontFamily: 'Poppins-Medium', color: '#000' }}>{capitalizeFirstLetter(pokemonSpecies?.habitat?.name)}</Text>
                                    </View>
                                </View>
                                <View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5 }}>
                                        <FontAwesome5 name="long-arrow-alt-up" size={15} />
                                        <Text style={{ fontFamily: 'Poppins-SemiBold', marginLeft: 5, fontSize: 12 }}>Shape</Text>
                                    </View>
                                    <View style={{ paddingHorizontal: 15, borderWidth: 1, paddingVertical: 7, borderRadius: 20, borderColor: '#B2B2B2', width: 170 }}>
                                        <Text style={{ fontFamily: 'Poppins-Medium', color: '#000' }}>{capitalizeFirstLetter(pokemonSpecies?.shape?.name)}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ marginVertical: 25 }}>
                            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16, marginLeft: 5 }}>Ability</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
                                <FlatList
                                    data={pokemonDetail?.abilities}
                                    keyExtractor={(item, index) => index.toString()}
                                    numColumns={2}
                                    renderItem={({ item }) => (
                                        <View style={{ flex: 1, margin: 5 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5 }}>
                                                <FontAwesome5 name="bolt" size={12} />
                                                <Text style={{ fontFamily: 'Poppins-SemiBold', marginLeft: 5, fontSize: 12 }}>Ability</Text>
                                            </View>
                                            <View style={{ paddingHorizontal: 15, borderWidth: 1, paddingVertical: 7, borderRadius: 20, borderColor: '#B2B2B2', width: '100%' }}>
                                                <Text style={{ fontFamily: 'Poppins-Medium', color: '#000' }}>{capitalizeFirstLetter(item?.ability?.name)}</Text>
                                            </View>
                                        </View>
                                    )}
                                />
                            </View>
                        </View>
                    </>
                }

            </View>
            <Spinner
                testID="spinner"
                visible={pokemonSpinner}
                textContent={'Loading...'}
                textStyle={{ color: '#273D71' }}
            />
        </ScrollView>
    )
}

export default PokemonDetailPage