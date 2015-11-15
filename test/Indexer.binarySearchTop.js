
var test 		= require( 'tape' );

var Bounds 		= require( 'jux-bounds' );

var verticalLayout10x100 	= require( './util/verticalLayout10x100' );

test( 'Indexer Binary Search Top', function( t ){

	var layout = verticalLayout10x100();
	var viewport = new Bounds(0,0,100,200);

	var getIndices = function( results ){
		return results.map( function( obj ){
			return layout.objects.indexOf( obj );
		});
	};

	viewport.y = -200;
	t.deepEquals( getIndices( layout.find( viewport ) ), [] );

	viewport.y = -100;
	t.deepEquals( getIndices( layout.find( viewport ) ), [0] );

	viewport.y = 0;
	t.deepEquals( getIndices( layout.find( viewport ) ), [0,1] );

	viewport.y = 100;
	t.deepEquals( getIndices( layout.find( viewport ) ), [1,2] );

	viewport.y = 200;
	t.deepEquals( getIndices( layout.find( viewport ) ), [2,3] );

	viewport.y = 800;
	t.deepEquals( getIndices( layout.find( viewport ) ), [8,9] );

	viewport.y = 900;
	t.deepEquals( getIndices( layout.find( viewport ) ), [9] );

	viewport.y = 1000;
	t.deepEquals( getIndices( layout.find( viewport ) ), [] );


	viewport.height = 500;
	viewport.y = 0;
	t.deepEquals( getIndices( layout.find( viewport ) ), [0,1,2,3,4] );

	viewport.y = -100;
	t.deepEquals( getIndices( layout.find( viewport ) ), [0,1,2,3] );

	viewport.y = 400;
	t.deepEquals( getIndices( layout.find( viewport ) ), [4,5,6,7,8] );

	viewport.y = 800;
	t.deepEquals( getIndices( layout.find( viewport ) ), [8,9] );

	t.end();
} );