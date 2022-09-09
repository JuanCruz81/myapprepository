import { combineReducers } from 'redux';

const SET_POKEMON = 'SET_POKEMON';

export function setPokemonSelection(pokemon) {
    return {
        type: 'SET_POKEMON',
        pokemon,
    }
}

const defaultPokemon = [
    {
        activePokemonSelection: 'test pokemon',
    }
];

function pokemonSelection(state=defaultPokemon, action) {
    switch (action.type) {
        case SET_POKEMON:
            return [
                ...state,
                {
                    activePokemonSelection: action.pokemon
                }
            ];
        default:
            return state;
    }
}

const pokemonApp = combineReducers({
    pokemonSelection
});

export default pokemonApp;