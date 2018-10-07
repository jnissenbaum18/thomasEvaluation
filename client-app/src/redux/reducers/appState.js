import {SET_HOME_VIEW, SET_RESULTS_VIEW} from '../actions/actions';

/* Reducer to hold the application state.
view : String - String to key off of in the <App/> component to render the app body. Possible values: "Home", "Results".
*/

const appState = (
    state={
        view: "Home"
    }, action
) => {
    switch(action.type) {
        case SET_HOME_VIEW: {
            return {
                ...state,
                view: "Home"
            }
        }
        case SET_RESULTS_VIEW: {
            return {
                ...state,
                view: "Results"
            }
        }
        default: 
            return state
    }
}

export default appState;