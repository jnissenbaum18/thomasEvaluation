Thomas Evaluation readme.
Hours spent: 33

Project requirements and status:

## Basic Requirements

#### Search Service

* Use NodeJS, Express and Mongoose to implement a basic REST service to return restaurant search results. This can be satisfied by a single endpoint.
Complete.

* The search endpoint should take 1 search parameter and perform a full text search against the ‘searchText’ property of the restaurants collection in the MongoDB. The search results array length should be limited to the page size you wish to display in the client.
Complete.

* Use the provided Mongoose RestaurantSchema and Restaurant model (defined in restaurantModel.js.txt) for your search data model.
Complete.

* Any/All dependent NPM packages must be listed in package.json.
Complete.

#### Search Client App

* Create a single page app which enables users to enter search terms and view paged lists of restaurant results based on the query result
Complete.

* Use Bootstrap 4.x to create a pixel-perfect, responsive layout which matches the given design.
Partially complete, see [Front end styling notes](#Front-end-styling-notes)   

* Use either React or Angular 2+ to implement a performant search which satisfies the search features shown in the search results page design (prefer ng-cli or react-scripts to enable quicker/easier code sharing and setup).
Complete.

* Any/All dependent NPM packages must be listed in package.json.
Complete.

## Nice-To-Haves

#### Search Service

* Implement simple paging logic in the search endpoint (skip/take)
Complete.

* Make a more advanced filter that enables multi-word queries to be submitted against the ‘searchText’ field as multiple ‘and’ filter clauses (ie the query ‘queens mexican’ would be parsed and interpreted against the db as ‘searchText contains ‘queens’ and searhText contains ‘mexican’)
Complete.

* Submit written (not coded) suggestions for improving the performance of the search.
See [Search suggestions](#Search-suggestions)

#### Search Client App

* Implement the restaurant detail view modal for users browsing from a computer.
Complete.

* Implement the restaurant detail view in a mobile-friendly manner for mobile browsers.
Incomplete.

* If using Angular, use RxJS with the Angular Http service to demonstrate Observable search results.
N/A.

* If using React, use Redux (or alternative) to manage the data / app state.
Complete.

* Enable the users to share a specific page of search results with a friend by simply sending them the url for those search results.
Incomplete.

## Front end styling notes

Matching the front end styling to the provided mock ups in a pixel perfect manner proved to be difficult for several reasons. The main reason is that I simply ran out of time. I wanted to focus my attention towards working out the functionality of the app rather than focus on creating an exact pixel perfect match of the mock ups. Given more time and some more information, I could have matched the mock ups more closely. As an example, I styled the home page to be as close to the home page mock up as I could possibly get it. The other pages can be styled to be more accurate as well if I had more time to work on them for a few days. 

There was also a lack of information that prevented me from getting the styling exactly right or implementing a feature. These include:

1. There is no money field in the database entries for restaurant to filter off of, even though the filter button is included in the mock up. I've left the money filter drop down on the page, but it does not perform any function.
2. The line height of the words "grade pending" in the grade pending image is different than the mock up.
3. The color of the ny seal image is different in the mock up.
4. The font of the home page title "NYC Restaurants" is not documented. I tried to match the style as close as I could. 
5. No designs for responsiveness were provided.
6. While the evaluation documentation said to use Bootstrap 4.x, I could not find bootstrap components that matched the mockup versions of the text input field dropdown (on the home page search bar) and the filter dropdowns. I overrode the styles on the home page to match the mockup as best as I could. But if I were to actually implement this for a client, I would either ask where they got the components from, or I would create the components myself from scratch which would take some time to implement.

Regarding responsive design, again I simply ran out of time. If this were a real project, reworking my css and adding breakpoints to make the pages more mobile friendly would be my highest priority as the core app functionality is now working. 

## Search suggestions

The performance of the search in terms of the amount of data being retrieved and sent is decently performant already. I am only retrieving the results for the specific page, size and grade that I want. This amounts to about 12 restaurants per request, which is relatively small. If I were to further refine the search here is what I would do:

1. I want the front end to be smarter in its query in that it will only need to retrieve any restaurant it does not already have. So every time the database needs to be queried for more restaurants, it would loop through the restaurants it already has to see if it can fill out the part of results and then explicitly tell the server to omit those entries. For example, if we started out with a query for restaurants with any grade, but then switched the filter to "B" grade, then we may already have a restaurant with a "B" grade in our results. The front end would take the id of that restaurant and send it back to the server to omit that entry from the query. The server would then return pageSize - n results, where n is the number of results the front end already has.
2. For each query, the front end should send back a list of data fields it needs for that page and the server should only query for those fields. So for the results page, the front end would ask the server to only send back the fields: title, cuisine, street, zip, boro, building and phone number. But when a modal is to be displayed, a second endpoint would be hit on the server that would provide the inspections data for that specific restaurant only.
3. Right now, Mongo is interpreting the multiword query as match any of the words to the database and return total results. This becomes a problem with trying to find restaurants with ubiqutous words in them such as "chinese restaurant". In this case, the search would return any restaurant with the words "chinese" or "restaurant" in the title, as well as any other entry that contains the words "chinese" or "restaurant". The query should be refined so it's smart enough to try and match names, or addresses first before doing a general match for text.

## Known Bugs and Issues

1. Components are not mobile-friendly.
2. Phone numbers for the modal display are not being parsed as per designs.
3. The restaurant results counter on the results page does not accurately reflect the count if the results is < 12.
4. The paging buttons do not go higher than 8 as a temporary measure for very high result counts. This should be changed to match the mockup, where a ... button is added and when clicked, the buttons component renders the next set of page numbers,e.g. going from displaying pages 1-6 to 6-11. 
5. Money filter does not have any functionality.
6. The redux integration could be streamlined a little better, there are some redundancies that could be worked out with a refactor.
7. Front end styling tested for chrome only.