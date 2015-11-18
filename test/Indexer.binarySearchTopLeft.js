
var test = require( 'tape' );
var searchBounds = require( '../indexers/util/searchBounds' );
var gridLayout100x100 	= require( './util/gridLayout100x100' );

test( 'Idea for 2d bounds search', function(){

	var layout = gridLayout100x100();

	console.log( layout.objects );

	// store objects but allocate a new index to each one
	// based on its position in the bounds of the
	// layout


});