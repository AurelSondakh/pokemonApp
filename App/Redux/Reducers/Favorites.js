import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    toggleFavorite: (state, action) => {
      const pokemon = action.payload;
      console.log(pokemon, 'POKEMON')
      const existingIndex = state.findIndex(item => item.name === pokemon.name);
      if (existingIndex >= 0) {
        return state.filter(item => item.name !== pokemon.name);
      } else {
        state.push(pokemon);
      }
    }
  }
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
