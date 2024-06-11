/* eslint-disable prettier/prettier */
import * as actionTypes from '../Constants/Types'

const initialState = {
    pokemonList: [],
    pokemonSpecies: [],
    pokemonDetail: [],
    pokemonSpinner: false,
    errorModal: false
}

export const PokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    // ============= GET_ALL_POKEMON ===================
    case actionTypes.GET_ALL_POKEMON_REQUEST:
        return {
            ...state,
            pokemonSpinner: true,
            errorModal: false
        };
    case actionTypes.GET_ALL_POKEMON_SUCCESS:
        return {
            ...state,
            pokemonList: action.payload,
            pokemonSpinner: false,
            errorModal: false
        };
    case actionTypes.GET_ALL_POKEMON_FAILED:
        return {
            ...state,
            pokemonSpinner: false,
            errorModal: true
        };
    // ============= GET_POKEMON_SPECIES ===================
    case actionTypes.GET_POKEMON_SPECIES_REQUEST:
        return {
            ...state,
            pokemonSpinner: true,
            errorModal: false
        };
    case actionTypes.GET_POKEMON_SPECIES_SUCCESS:
        return {
            ...state,
            pokemonSpecies: action.payload,
            pokemonSpinner: false,
            errorModal: false
        };
    case actionTypes.GET_POKEMON_SPECIES_FAILED:
        return {
            ...state,
            pokemonSpinner: false,
            errorModal: true
        };
    // ============= GET_POKEMON_DETAIL ===================
    case actionTypes.GET_POKEMON_DETAIL_REQUEST:
        return {
            ...state,
            pokemonSpinner: true,
            errorModal: false
        };
    case actionTypes.GET_POKEMON_DETAIL_SUCCESS:
        return {
            ...state,
            pokemonDetail: action.payload,
            pokemonSpinner: false,
            errorModal: false
        };
    case actionTypes.GET_POKEMON_DETAIL_FAILED:
        return {
            ...state,
            pokemonSpinner: false,
            errorModal: true
        };
    default:
      return state;
  }
};