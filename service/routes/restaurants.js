var express = require('express');
var router = express.Router();

var restaurant = require('../db/models/restaurant');

/* GET route for the restaurant endpoint. The route takes in a search string, filtering and paging parameters, 
* parses those parameters and then executes a db query. The query result as well as the result count is returned
* to the front end in a json object.
*
* input searchText : String - A string to be parsed and queried into the database
* input pageNumber : Number - The current page of results to return
* input pageSize : Number - The number of results to return for the current page. Defaulted to 12.
* input gradeFilter : String - A string that will be matched directly to the "grade" field to filter results.
*
* output restaurants : Array of objects - Array of restaurant db documents returned as json objects.
* output count : Number - The number of total documents that match the query without paging.
*/
router.get('/', async (req, res, next) => {

	const queryParams = parseParams(req.query);
	const query = constructQuery(queryParams);

	try {
		
		if (queryParams.searchText) {
			//Only execute a query if there is text to search for. Wait for both queryDatabase and getQueryCount to resolve
			//before sending the result.
			const queryResult = Promise.all([queryDatabase(query, queryParams), getQueryCount(query, queryParams)])
			.then((result)=>{
				const sendResult = {
					restaurants: result[0],
					count: result[1]
				}
				console.log(`Search results count: ${sendResult.count}`)
				res.status(200).json(JSON.stringify(sendResult));
			})
		} else {
			
		}
		
	} catch (e) {
		console.error(e);
		return res.status(500).send(e);
	}

});

//Check for the existance of the required params and if empty, initialize them to default values.
function parseParams(params){
	let searchParams = {}

	if (params.pageNumber) {
		searchParams.pageNumber = Number(params.pageNumber);
	} else {
		searchParams.pageNumber = 1;
	}

	if (params.pageSize) {
		searchParams.pageSize = Number(params.pageSize);
	} else {
		searchParams.pageSize = 12;
	}

	if (params.gradeFilter && params.gradeFilter != "All") {
		searchParams.gradeFilter = params.gradeFilter;
	} else {
		searchParams.gradeFilter = false;
	}

	if (params.searchText) {
		//Modify the searchText string to enable multiword queries.
		const queryString = '\"' + params.searchText.split(' ').join('\" \"') + '\"'; 
		searchParams.searchText = queryString;
	}

	console.log(`Query DB, \nsearchText: ${searchParams.searchText}, \npageNumber: ${searchParams.pageNumber}, \npageSize: ${searchParams.pageSize}, \ngradeFilter: ${searchParams.gradeFilter}`)

	return searchParams
}

//Construct the mongo query. Only include gradeFilter if a specific grade is provided.
function constructQuery(queryParams){
	let query = {
		$text: { 
			$search: queryParams.searchText
		}
	}

	if (queryParams.gradeFilter) {
		query.grade = {
			$eq: queryParams.gradeFilter
		}
	}

	return query
}

//Get the total number of documents that match the query without returning the full results.
async function getQueryCount(query, queryParams){
	return await restaurant.find(query).countDocuments();
}

//Query db only for the specific page requested.
async function queryDatabase(query, queryParams){
	return await restaurant.find(query)
	.limit(queryParams.pageSize)
	.skip((queryParams.pageNumber - 1) * queryParams.pageSize);
}

module.exports = router;
