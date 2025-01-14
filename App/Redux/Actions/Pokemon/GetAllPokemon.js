import { URL_POKEMON } from "../../../Configs/GlobalUrl";
import * as ActionTypes from '../../Constants/Types';

export const GetAllPokemon = () => {
    return async (dispatch) => {
        dispatch({
            type: ActionTypes.GET_ALL_POKEMON_REQUEST
        });
        const controller = new AbortController();
        const { signal } = controller;
        const timeoutId = setTimeout(() => {
            controller.abort();
        }, 8000);
        try {
            const response = await fetch(`${URL_POKEMON}`, {
                method: "GET",
                redirect: "follow",
                signal
            });

            clearTimeout(timeoutId);
            console.log(response)

            if (!response.ok) {
                dispatch({
                    type: ActionTypes.GET_ALL_POKEMON_FAILED,
                    payload: responseData
                });
            }

            const responseData = await response.json();

            dispatch({
                type: ActionTypes.GET_ALL_POKEMON_SUCCESS,
                payload: responseData
            });
        } catch (error) {
            console.error("ERROR", error.message);
            dispatch({
                type: ActionTypes.GET_ALL_POKEMON_FAILED,
                error: error.message,
            });
        }
    }
}


