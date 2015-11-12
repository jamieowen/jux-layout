
var test = require( 'tape' );

var Layout 	= require( '../Layout' );


test( 'Layout Custom Inline.', function( t ){

	// Data source.
	var data = [0,1,2,3,4,5,6,7,8,9].map( function(i){
		return { num: i };
	});

	// Layout opts.
	var w = 200;
	var h = 55;
	var s = 10;

	// Untyped objects for points and bounds queries
	var point = {};
	var bounds = {};

	// Test layout with inline layout method.

	var layout = new Layout( data, {
		layoutOpts: {
			itemWidth: w,
			itemHeight: h,
			itemSpacing: s
		},
		layout: function( i, data, obj, prevObj, proxy, lopts ){

			var x = 0;
			var y;
			if( i < 5 ){
				y = i * lopts.itemHeight + ( i * lopts.itemSpacing );
			}else{
				// test previous obj access to set position.
				proxy.position.get( prevObj, point );
				proxy.size.get( prevObj, bounds );
				y = point.y + bounds.height + lopts.itemSpacing;
			}

			proxy.position.set( obj, x, y );
			proxy.size.set( obj, lopts.itemWidth, lopts.itemHeight );

		}
	});

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