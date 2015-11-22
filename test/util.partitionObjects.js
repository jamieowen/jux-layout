
var test = require( 'tape' );

var partitionObjects 	= require( '../indexers/util/partitionObjects' );
var gridLayout100x100 	= require( './util/gridLayout100x100' );

var Bounds = require( 'jux-bounds' );
var Proxy  = require( 'jux-bounds-proxy' );

test( 'Parition Objects.', function( t ){

	var layout = gridLayout100x100(); // each item's width is 100
	var proxy  = new Proxy();
	var objects = layout.objects;

	var results = partitionObjects( objects, layout.bounds, proxy, {
		calcPartitionSizes: false,
		partitionWidth: 100,
		partitionHeight: 100
	} );

	var res;
	for( var i = 0; i<results.length; i++ ){
		res = results[i];
		console.log( 'RESULTS : (', res.idx, ')', 'px:', res.px, 'py:', res.py, ' < pxy:', res.pxy, '>', '{',res.object.width + ',' + res.object.height + ' }' );
	}

	t.end();

});