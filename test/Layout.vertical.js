
var test = require( 'tape' );

var Layout = require( '../Layout' );

var vertical = require( '../layouts/vertical' );
var getExpected = require( './util/getExpected' );
var getActual = require( './util/getActual' );


test( 'Layout Vertical.', function( t ){

	var data = [0,1,2,3,4,5,6,7,8,9].map( function(i){
		return { num: i };
	});

	// Test layout
	var layout = new Layout( data, vertical );
	var defaultOpts = vertical.defaultOpts;
	var w = defaultOpts.itemWidth;
	var h = defaultOpts.itemHeight;
	var s = defaultOpts.itemSpacing;

	// Prepare expected results
	var expected = getExpected( vertical, data );
	var expectedBounds = [
		0,0,w, ( data.length * h ) + ( s * (data.length-1) )
	];

	// Update & Test.

	t.equals( layout.needsLayoutUpdate, true, 'Layout is invalidated.' );
	layout.update();
	t.equals( layout.needsLayoutUpdate, false, 'Layout is validated.' );

	var b = layout.bounds;
	t.deepEquals( [b.x, b.y, b.width, b.height],expectedBounds, 'Layout bounds are set.' );
	t.equals( layout.objects.length, data.length, 'Layout objects are correct length.' );

	var actual = getActual( layout );

	t.deepEquals( actual.data, expected.data, 'Layout data is set.' );
	t.deepEquals( actual.positions, expected.positions, 'Layout positions are set.' );
	t.deepEquals( actual.sizes, expected.sizes, 'Layout sizes are set.' );

	t.end();
} );