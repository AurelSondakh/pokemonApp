import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import PokemonList from './PokemonList';

const FavoritesScreen = () => {
  const favorites = useSelector((state) => state.favorites);

  return (
    <View>
      <FlatList
        style={{ marginTop: 15, marginHorizontal: 15 }}
        nestedScrollEnabled
        data={favorites}
        renderItem={({ index, item }) => <PokemonList item={item} index={index} />}
        keyExtractor={(item) => `${item.name}`}
      />
    </View>
  );
};

export default FavoritesScreen;
