
var test 		= require( 'tape' );

var Bounds 		= require( 'jux-bounds' );

var verticalLayout10x100 	= require( './util/verticalLayout10x100' );

test( 'Find Binary Search.', function( t ){

	var layout = verticalLayout10x100();
	var viewport = new Bounds();

	var getIndices = function( results ){
		return results.map( function( obj ){
			return layout.objects.indexOf( obj );
		});
	};

	/**
	viewport.set( -200, 0, 200, 30 );
	t.deepEquals( getIndices( layout.find( viewport ) ), [] );

	viewport.set( -100, 0, 200, 30 );
	t.deepEquals( getIndices( layout.find( viewport ) ), [0] );

	viewport.set( 0, 0, 200, 30 );
	t.deepEquals( getIndices( layout.find( viewport ) ), [0,1] );

	viewport.set( 100, 0, 200, 30 );
	t.deepEquals( getIndices( layout.find( viewport ) ), [1,2] );

	viewport.set( 200, 0, 200, 30 );
	t.deepEquals( getIndices( layout.find( viewport ) ), [2,3] );

	viewport.set( 400, 0, 300, 30 );
	t.deepEquals( getIndices( layout.find( viewport ) ), [4,5,6] );

	viewport.set( 800, 0, 200, 30 );
	t.deepEquals( getIndices( layout.find( viewport ) ), [8,9] );

	viewport.set( 900, 0, 200, 30 );
	t.deepEquals( getIndices( layout.find( viewport ) ), [9] );

	viewport.set( 1000, 0, 200, 30 );
	t.deepEquals( getIndices( layout.find( viewport ) ), [] );

	viewport.set( 0, 0, 500, 30 );
	t.deepEquals( getIndices( layout.find( viewport ) ), [0,1,2,3,4] );

	viewport.set( -100, 0, 500, 30 );
	t.deepEquals( getIndices( layout.find( viewport ) ), [0,1,2,3] );

	viewport.set( 800, 0, 500, 30 );
	t.deepEquals( getIndices( layout.find( viewport ) ), [8,9] );
	**/

	t.end();
} );