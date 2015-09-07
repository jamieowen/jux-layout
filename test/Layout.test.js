
var test = require( 'tape' );

var Layout 	= require( '../Layout' );
var proxy 	= require( '../LayoutObjectProxy' );


test( 'Layout test.', function( t ){

	var data = [ 0,1,2,3,4,5,6,7,8,9 ];

	var layout = new Layout( data, function( i, data, obj, proxy, opts ){

		proxy.position( obj, 0, i * 10 );
		proxy.size( obj, 100, 10 );

	});

	t.equals( layout.indexer.count, 0, 'Layout objects not added.' );
	t.equals( layout.needsUpdate, true, 'Layout needs update.' );

	layout.update();

	t.equals( layout.needsUpdate, false, 'Layout is updated.' );
	t.equals( layout.indexer.count, 10, 'Layout objects added.' );

	var assignedData = layout.indexer.objects.map( function( obj ){

		return proxy.get.data( obj );

	});

	t.deepEquals( assignedData, [ 0,1,2,3,4,5,6,7,8,9 ], 'Data ids set on layout objects.' );;

	var assignedY = layout.indexer.objects.map( function(obj){
		return proxy.get.y( obj );
	});

	t.deepEquals( assignedY, [ 0,10,20,30,40,50,60,70,80,90 ], 'y positions set.' );

	t.end();

} );