import {combineReducers} from 'redux';
import restaurant from './restaurant';
import appState from './appState'

export default combineReducers({
    restaurant,
    appState
});