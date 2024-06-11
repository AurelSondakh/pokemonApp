import { URL_POKEMON_SPECIES } from "../../../Configs/GlobalUrl";
import * as ActionTypes from '../../Constants/Types';

export const GetPokemonSpecies = (pokemonId) => {
    return async (dispatch) => {
        dispatch({
            type: ActionTypes.GET_POKEMON_SPECIES_REQUEST
        });
        const controller = new AbortController();
        const { signal } = controller;
        const timeoutId = setTimeout(() => {
            controller.abort();
        }, 8000);
        try {
            const response = await fetch(`${URL_POKEMON_SPECIES}/${pokemonId}`, {
                method: "GET",
                redirect: "follow",
                signal
            });

            clearTimeout(timeoutId);
            console.log(response)

            if (!response.ok) {
                dispatch({
                    type: ActionTypes.GET_POKEMON_SPECIES_FAILED,
                    payload: responseData
                });
            }

            const responseData = await response.json();

            dispatch({
                type: ActionTypes.GET_POKEMON_SPECIES_SUCCESS,
                payload: responseData
            });
        } catch (error) {
            console.error("ERROR", error.message);
            dispatch({
                type: ActionTypes.GET_POKEMON_SPECIES_FAILED,
                error: error.message,
            });
        }
    }
}


