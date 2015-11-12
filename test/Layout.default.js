
var test = require( 'tape' );

var Layout 	= require( '../Layout' );


test( 'Layout Defaults.', function( t ){

	var data = [0,1,2,3,4,5,6,7,8,9].map( function(i){
		return { num: i };
	});

	// Untyped objects for points and bounds queries
	var point = {};
	var bounds = {};

	// test default ( vertical )
	var layout = new Layout( data );

	// Update.

	// Test invalidation.
	t.equals( layout.needsLayoutUpdate, true, 'Layout is invalidated.' );
	layout.update();
	t.equals( layout.needsLayoutUpdate, false, 'Layout is validated.' );

	// Test Bounds.
	var expectedBounds = [
		0,0,w, ( data.length * h ) + ( s * (data.length-1) )
	];

	var b = layout.bounds;
	t.deepEquals( [b.x, b.y, b.width, b.height],expectedBounds, 'Layout bounds are set.' );

	// Test object count.
	t.equals( layout.objects.length, data.length, 'Layout objects are correct length.' );

	// Test size and position
	var expectedPositions = [];
	var expectedSizes = [];
	for( var i = 0; i<data.length; i++ ){
		expectedPositions[ i*2 ]   = 0;
		expectedPositions[ i*2+1 ] = i * h + ( i * s );
		expectedSizes[ i*2 ] 	   = w;
		expectedSizes[ i*2+1 ] 	   = h;
	}

	var actualPositions = [];
	var actualSizes     = [];
	for( var i = 0; i<data.length; i++ ){
		layout._proxy.position.get( layout.objects[i], point );
		layout._proxy.size.get( layout.objects[i], bounds );
		actualPositions[ i*2 ] 	    = point.x;
		actualPositions[ i*2+1 ] 	= point.y;
		actualSizes[ i*2 ] 	    	= bounds.width;
		actualSizes[ i*2+1 ] 		= bounds.height;
	}

	t.deepEquals( actualPositions, expectedPositions, 'Layout positions are set.' );
	t.deepEquals( actualSizes, expectedSizes, 'Layout sizes are set.' );

	t.end();
} );