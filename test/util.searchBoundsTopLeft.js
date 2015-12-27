
var test = require( 'tape' );

var searchBounds 		= require( '../indexers/util/searchBounds' );
var partitionObjects 	= require( '../indexers/util/partitionObjects' );
var partitionIndex 		= require( '../indexers/util/partitionIndex' );
var gridLayout100x100 	= require( './util/gridLayout100x100' );

var Bounds = require( 'jux-bounds' );
var Proxy  = require( 'jux-bounds-proxy' );

test( 'Search Bounds Top Left.', function( t ){

	var layout = gridLayout100x100(); // each item's width is 100
	var proxy  = new Proxy();
	var viewport = new Bounds(0,0,100,100);
	var objects = layout.objects;

	var partitioned = partitionObjects( objects, layout.bounds, proxy, {
		calcPartitionSizes: true
	} );

	var partitionedIndex = partitionIndex( partitioned );

	console.log( 'PARTITIONED: ', partitioned );
	console.log( 'PARTITION INDEX : ', partitionedIndex );

	viewport.x = -1;
	viewport.y = -1;

	t.equals( searchBounds.geTopLeft( partitioned,partitionIndex, viewport, proxy ), -1 );


	t.end();

});