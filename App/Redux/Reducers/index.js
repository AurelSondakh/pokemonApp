import {combineReducers} from "redux"
import { PokemonReducer } from "./Pokemon";
import favoritesReducer from './Favorites';

const rootReducer = combineReducers({
    pokemon: PokemonReducer,
    favorites: favoritesReducer
});


export default rootReducer;