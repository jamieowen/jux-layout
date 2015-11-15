
var test 		= require( 'tape' );

var Bounds 		= require( 'jux-bounds' );

var horizontalLayout10x100 	= require( './util/horizontalLayout10x100' );

test( 'Indexer Binary Search Left', function( t ){

	var layout = horizontalLayout10x100();
	var viewport = new Bounds(0,0,200,100);

	var getIndices = function( results ){
		return results.map( function( obj ){
			return layout.objects.indexOf( obj );
		});
	};

	viewport.x = -200;
	t.deepEquals( getIndices( layout.find( viewport ) ), [] );

	viewport.x = -100;
	t.deepEquals( getIndices( layout.find( viewport ) ), [0] );

	viewport.x = 0;
	t.deepEquals( getIndices( layout.find( viewport ) ), [0,1] );

	viewport.x = 100;
	t.deepEquals( getIndices( layout.find( viewport ) ), [1,2] );

	viewport.x = 200;
	t.deepEquals( getIndices( layout.find( viewport ) ), [2,3] );

	viewport.x = 800;
	t.deepEquals( getIndices( layout.find( viewport ) ), [8,9] );

	viewport.x = 900;
	t.deepEquals( getIndices( layout.find( viewport ) ), [9] );

	viewport.x = 1000;
	t.deepEquals( getIndices( layout.find( viewport ) ), [] );


	viewport.width = 500;
	viewport.x = 0;
	t.deepEquals( getIndices( layout.find( viewport ) ), [0,1,2,3,4] );

	viewport.x = -100;
	t.deepEquals( getIndices( layout.find( viewport ) ), [0,1,2,3] );

	viewport.x = 400;
	t.deepEquals( getIndices( layout.find( viewport ) ), [4,5,6,7,8] );

	viewport.x = 800;
	t.deepEquals( getIndices( layout.find( viewport ) ), [8,9] );


	t.end();
} );