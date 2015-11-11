
var test = require( 'tape' );

var Layout 	= require( '../Layout' );


test( 'Layout basics.', function( t ){

	var data = [0,1,2,3,4,5,6,7,8,9].map( function(i){
		return { num: i };
	});

	var w = 200;
	var h = 55;
	var s = 10;

	// Test layout with inline layout method.

	var layout = new Layout( data, {
		layoutOpts: {
			itemWidth: w,
			itemHeight: h,
			itemSpacing: s
		},
		layout: function( i, data, obj, prevObj, proxy, lopts ){

			var x = 0;
			var y = i * lopts.itemHeight + ( i * lopts.itemSpacing );

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

	t.end();
} );