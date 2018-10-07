import * as actions from './actions';

function requestRestaurants () {
    return { 
        type: actions.REQUEST_RESTAURANTS
    }
};

function receiveRestaurants (restaurants, count) {
    return {
        type: actions.RECEIVE_RESTAURANTS,
        list: restaurants,
        count: count
    }
}

//Function to execute get request to server to query for restaurants. Dispatch actions to set isFetching 
//to signal for the state of the request.
export function fetchRestaurants (queryParams) {
    return dispatch => {
        dispatch(requestRestaurants());
        const url = `/restaurants?searchText="${queryParams.searchText}"&pageNumber=${queryParams.pageNumber}&pageSize=${queryParams.pageSize}&gradeFilter=${queryParams.gradeFilter}`
        return fetch(url)
            .then(res => res.json())
            .then((data) => {
                const parsedData = JSON.parse(data) 
                dispatch(receiveRestaurants(parsedData.restaurants, parsedData.count));
                dispatch(setResultsView());
            })
            .catch(error => console.error(error));
    }
};

function setQueryParams (queryParams) {
    return {
        type: actions.SET_QUERY_PARAMS,
        payload: queryParams
    }
}

//Check for parameter existance for the queryParams object and send those through to the restaurants reducer if defined
export function updateQueryParams (queryParams) {
    let updateQuery = {};
    if (queryParams[0].searchText) {
        updateQuery.searchText = queryParams[0].searchText;
    } else if (Object.keys(queryParams[0]).indexOf("searchText") != -1) {
        updateQuery.searchText = ""
    }
    if (queryParams[0].pageNumber) {
        updateQuery.pageNumber = queryParams[0].pageNumber;
    }
    if (queryParams[0].pageSize) {
        updateQuery.pageSize = queryParams[0].pageSize;
    }
    if (queryParams[0].gradeFilter) {
        updateQuery.gradeFilter = queryParams[0].gradeFilter;
    }
    if (queryParams[0].moneyFilter) {
        updateQuery.moneyFilter = queryParams[0].moneyFilter;
    }
    return dispatch => {
        dispatch(setQueryParams(updateQuery))
    }
}

export function setHomeView () {
    return { 
        type: actions.SET_HOME_VIEW
    }
};

export function setResultsView () {
    return {
        type: actions.SET_RESULTS_VIEW
    }
}