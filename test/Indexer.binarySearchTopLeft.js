
var test = require( 'tape' );

var partitionObjects 	= require( '../indexers/util/partitionObjects' );
var partitionIndex 		= require( '../indexers/util/partitionIndex' );
var gridLayout100x100 	= require( './util/gridLayout100x100' );

var searchBounds

var Bounds = require( 'jux-bounds' );
var Proxy  = require( 'jux-bounds-proxy' );

test( 'Indexer Binary Search Top Left.', function( t ){

	var layout = gridLayout100x100(); // each item's width is 100
	var proxy  = new Proxy();
	var objects = layout.objects;

	var result = partitionObjects( objects, layout.bounds, proxy, {
		calcPartitionSizes: true
	} );

	// create the index.
	var index = partitionIndex( result, true );



	t.end();
});