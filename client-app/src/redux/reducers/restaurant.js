import {REQUEST_RESTAURANTS, RECEIVE_RESTAURANTS, SET_QUERY_PARAMS} from '../actions/actions';

const restaurants = (
    state = {
        isFetching: false,
        list: [],
        count: 0,
        searchText: "",
        pageNumber: 1,
        pageSize: 12,
        gradeFilter: "All",
        moneyFilter: "All"
    }, action
) => {
    switch (action.type) {
        case REQUEST_RESTAURANTS: {
            return {
                ...state,
                isFetching: true
            }
        }
        case RECEIVE_RESTAURANTS: {
            return {
                ...state,
                isFetching: false,
                list: action.list,
                count: action.count
            }
        }
        case SET_QUERY_PARAMS: {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state
    }
};

export default restaurants;