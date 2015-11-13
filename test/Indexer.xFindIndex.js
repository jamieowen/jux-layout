
var test = require( 'tape' );

var xFindIndex 				= require( '../indexers/util/xFindIndex' );
var buildHorizontalLayout 	= require( './util/horizontalLayout' );

var Bounds = require( 'jux-bounds' );
var Proxy  = require( 'jux-bounds-proxy' );

test( 'X Find Index.', function( t ){

	var layout = buildHorizontalLayout();
	var proxy  = new Proxy();
	var viewport = new Bounds();

	console.log( layout.bounds );

	var startIndex,expected;

	// Given that the layout is 10 items horizontally,
	// at width 100, the total width will be 1000.
	// Iterate the viewport x 20 times moving 50 pixels each time.

	for( var i = 0; i<24; i++ ){

		viewport.set( i * 50 - 100, 0, 200, 30 );

		/**startIndex = xFindIndex(
			layout.objects,
			viewport.left, viewport.right,
			0, layout.objects.length,
			3, proxy );**/

		//console.log( '\nstart...' );
		startIndex = xFindIndex(
			layout.objects,
			0, layout.objects.length-1,
			viewport.left, viewport.right,
			proxy );

		console.log( 'i :', i, startIndex );
		//var expected = i < 2 || i > 21 ? -1 : Math.floor( (i-2) / 2 );

		//t.equals( startIndex, expected, 'Returns correct start index for viewport X at : ' + startIndex + ' ' +  i + ', ' + viewport.x );

	}

	t.end();




});