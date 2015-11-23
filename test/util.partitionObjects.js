
var test = require( 'tape' );

var partitionObjects 	= require( '../indexers/util/partitionObjects' );
var gridLayout100x100 	= require( './util/gridLayout100x100' );

var Bounds = require( 'jux-bounds' );
var Proxy  = require( 'jux-bounds-proxy' );

test( 'Partition Objects.', function( t ){

	var layout = gridLayout100x100(); // each item's width is 100
	var proxy  = new Proxy();
	var objects = layout.objects;

	var results = partitionObjects( objects, layout.bounds, proxy, {
		calcPartitionSizes: true
	} );
	
	var toArray = function( partObject ){
		return [ partObject.px, partObject.py, partObject.pxy ];
	};

	var res = results[0];
	t.equals( res.info.partitionWidth, 100, 'Calc partition sizes ok' );

	t.equals( res.info.partitionHeight, 100, 'Calc partition sizes ok' );

	t.equals( res.info.partitionX, 3, 'Calc partition sizes ok' );

	t.equals( res.info.partitionY, 4, 'Calc partition sizes ok' );

	t.equals( results.length, 10, 'Results length ok' );


	var m = 'Partition assigned correctly.';

	t.deepEquals( toArray( results[0] ), [ 0,0,0 ], m );

	t.deepEquals( toArray( results[1] ), [ 1,0,1 ], m );

	t.deepEquals( toArray( results[2] ), [ 2,0,2 ], m );

	t.deepEquals( toArray( results[3] ), [ 0,1,3 ], m );

	t.deepEquals( toArray( results[4] ), [ 1,1,4 ], m );

	t.deepEquals( toArray( results[5] ), [ 2,1,5 ], m );

	t.deepEquals( toArray( results[6] ), [ 0,2,6 ], m );

	t.deepEquals( toArray( results[7] ), [ 1,2,7 ], m );

	t.deepEquals( toArray( results[8] ), [ 2,2,8 ], m );

	t.deepEquals( toArray( results[9] ), [ 0,3,9 ], m );

	t.end();

});