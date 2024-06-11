import { URL_POKEMON } from "../../../Configs/GlobalUrl";
import * as ActionTypes from '../../Constants/Types';

export const GetAllPokemon = () => {
    return dispatch => {
        dispatch({
            type: ActionTypes.GET_ALL_POKEMON_REQUEST
        });
        const controller = new AbortController();
        const { signal } = controller;
        const timeoutId = setTimeout(() => {
            controller.abort();
        }, 8000);

        fetch(`${URL_POKEMON}`, {
            method: "GET",
            redirect: "follow",
            signal
        })
        .then(response => {
            clearTimeout(timeoutId);
            return response.json();
        })
        .then(data => {
            console.log("GET_ALL_POKEMON: ", data);
            dispatch({
                type: ActionTypes.GET_ALL_POKEMON_SUCCESS,
                payload: data
            });
        })
        .catch(error => {
            console.error("ERROR", error.message);
            dispatch({
                type: ActionTypes.GET_ALL_POKEMON_FAILED,
                error: error.message,
            });
        });
    };
};
