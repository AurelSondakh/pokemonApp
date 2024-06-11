import {combineReducers} from "redux"
import { PokemonReducer } from "./Pokemon";

const rootReducer = combineReducers({
    pokemon: PokemonReducer
});


export default rootReducer;