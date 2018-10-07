import {REQUEST_RESTAURANTS, RECEIVE_RESTAURANTS, SET_QUERY_PARAMS} from '../actions/actions';

/* Reducer to hold the restaurants data. 
isFetching : boolean - State of the request for restaurant objects. True for waiting for server response, false otherwise. 
list : Array of objects - List of restaurant objects returned from the database query.
searchText : String - String of terms to be parsed and queried against for results in the database.
count : Number - The number of total results that match the searchText query. 
    This is NOT the actual number of results returned from the server, see pageSize.
pageNumber : Number - Current page number of results to return from the query.
pageSize : Number - Number of results to return in the query.
gradeFilter : String - The restaurant grade to filter results off of. Values include: "All", "A", "B", "C", "Not Yet Graded".
moneyFilter : Number - The number of money rating to filter off of. Currently unused.
*/
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