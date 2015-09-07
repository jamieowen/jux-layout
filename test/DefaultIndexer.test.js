
var test = require( 'tape' );

var DefaultIndexer 	= require( '../DefaultIndexer' );
var proxy 			= require( '../LayoutObjectProxy' );
var Rect 	   		= require( 'jux-bounds/Rect' );

test( 'default indexer', function(t){


	var indexer = new DefaultIndexer( proxy );

	var obj;
	for( var i = 0; i<10; i++ ){

		obj = proxy.create();

		proxy.data( obj, i );
		proxy.size( obj, 100, 10 );
		proxy.position( obj, 0, i * 10 );

		indexer.add( obj );

	}

	t.equals( indexer.count, 10, 'Indexer count is updated.' );

	var viewBounds = new Rect();
	viewBounds.size( 0,0,100,40 );

	// fetch first items
	var results = [];
	indexer.find( viewBounds, results );
	t.equals( results.length, 4, 'Result count is correct.' );

	var expectedIds = [ 0,1,2,3 ];
	var resultIds = results.map( function(obj){
		return proxy.get.data( obj );
	});
	t.deepEquals( resultIds, expectedIds, 'Result ids of 4 first items are matched.' );

	results.splice(0);
	viewBounds.size( 0,59.5,100,40 ); // offset to include an extra item

	indexer.find( viewBounds, results );
	t.equals( results.length, 5, 'Result count is correct.' );

	expectedIds = [ 5,6,7,8,9 ];
	resultIds = results.map( function(obj){
		return proxy.get.data( obj );
	});
	t.deepEquals( resultIds, expectedIds, 'Result ids of 5 last items are matched.' );

	// TODO : Update, Remove, etc, tests...
	// Probably apply same tests to each Indexer.

	t.end();





});