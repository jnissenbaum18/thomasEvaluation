var express = require('express');
var router = express.Router();

var restaurant = require('../db/models/restaurant');

/* GET restaurant listing. */
router.get('/', async (req, res, next) => {

	const queryParams = parseParams(req.query);
	const query = constructQuery(queryParams);

	try {
		
		if (queryParams.searchText) {
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
		const queryString = '\"' + params.searchText.split(' ').join('\" \"') + '\"'; 
		searchParams.searchText = queryString;
	}

	console.log(`Query DB, \nsearchText: ${searchParams.searchText}, \npageNumber: ${searchParams.pageNumber}, \npageSize: ${searchParams.pageSize}, \ngradeFilter: ${searchParams.gradeFilter}`)

	return searchParams
}

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

async function getQueryCount(query, queryParams){
	return await restaurant.find(query).countDocuments();
}

async function queryDatabase(query, queryParams){
	return await restaurant.find(query)
	.limit(queryParams.pageSize)
	.skip((queryParams.pageNumber - 1) * queryParams.pageSize);
}

module.exports = router;
