import { URL_POKEMON } from "../../../Configs/GlobalUrl";
import * as ActionTypes from '../../Constants/Types';

export const GetPokemonDetail = (pokemonId) => {
    return async (dispatch) => {
        dispatch({
            type: ActionTypes.GET_POKEMON_DETAIL_REQUEST
        });
        const controller = new AbortController();
        const { signal } = controller;
        const timeoutId = setTimeout(() => {
            controller.abort();
        }, 8000);
        try {
            const response = await fetch(`${URL_POKEMON}/${pokemonId}`, {
                method: "GET",
                redirect: "follow",
                signal
            });

            clearTimeout(timeoutId);
            console.log(response, 'pokemonDetail')

            if (!response.ok) {
                dispatch({
                    type: ActionTypes.GET_POKEMON_DETAIL_FAILED,
                    payload: responseData
                });
            }

            const responseData = await response.json();

            dispatch({
                type: ActionTypes.GET_POKEMON_DETAIL_SUCCESS,
                payload: responseData
            });
        } catch (error) {
            console.error("ERROR", error.message);
            dispatch({
                type: ActionTypes.GET_POKEMON_DETAIL_FAILED,
                error: error.message,
            });
        }
    }
}


