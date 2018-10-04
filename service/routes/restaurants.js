var express = require('express');
var router = express.Router();

var restaurant = require('../db/models/restaurant');

/* GET restaurant listing. */
router.get('/', async (req, res, next) => {

	const queryParams = constructQuery(req.query);

	try {
		
		if (queryParams.searchText) {
			const queryResult = Promise.all([queryDatabase(queryParams), getQueryCount(queryParams)])
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

function constructQuery(params){
	console.log('params', params)
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

	if (params.searchText) {
		const queryString = '\"' + params.searchText.split(' ').join('\" \"') + '\"'; 
		searchParams.searchText = queryString;
	}

	console.log(`Query DB, searchText: ${searchParams.searchText}, pageNumber: ${searchParams.pageNumber}, pageSize: ${searchParams.pageSize}`)

	return searchParams
}

async function getQueryCount(queryParams){
	return await restaurant.find({ 
		$text: { 
			$search: queryParams.searchText
		} 
	}).countDocuments();
}

async function queryDatabase(queryParams){
	return await restaurant.find({ 
		$text: { 
			$search: queryParams.searchText
		} 
	})
	.limit(queryParams.pageSize)
	.skip((queryParams.pageNumber - 1) * queryParams.pageSize);
}

module.exports = router;
