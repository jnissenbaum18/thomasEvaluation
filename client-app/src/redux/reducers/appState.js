import {SET_HOME_VIEW, SET_RESULTS_VIEW} from '../actions/actions';

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