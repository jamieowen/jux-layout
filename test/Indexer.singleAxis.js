
var test = require( 'tape' );

var horizontalLayout = require( './util/horizontalLayout' );

var Layout 		= require( '../Layout' );
var horizontal 	= require( '../layouts/horizontal' );
var getActual 	= require( './util/getActual' );

var Bounds 		= require( 'jux-bounds' );

test( 'Indexer Single Axis.', function( t ){

	var data = [0,1,2,3,4,5,6,7,8,9].map( function(i){
		return { num: i };
	});

	// Test layout
	var layout = new Layout( data, {
		layout:horizontal,
		layoutOpts:{
			itemWidth: 100,
			itemHeight: 30,
			itemSpacing: 0
		}
	} );

	layout.update();

	var viewport = new Bounds();
	viewport.set( 330, 0, 200, 30 );
	//viewport.set( 0, 0, 200, 30 );
	//viewport.set( layout.bounds.right + 100, 0, 200, 30 ); // far right
	//viewport.set( layout.bounds.left - 500, 0, 200, 30 ); // far left

	console.log( 'BOUNDS RIGHT : ', layout.bounds.right );
	console.log( JSON.stringify( getActual( layout) ) );

	var results = layout.find( viewport );
	console.log( 'RESULTS : ', results );



	t.end();
} );