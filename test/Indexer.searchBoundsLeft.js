
var test = require( 'tape' );

var searchBounds = require( '../indexers/util/searchBounds' );
var horizontalLayout10x100 	= require( './util/horizontalLayout10x100' );

var Bounds = require( 'jux-bounds' );
var Proxy  = require( 'jux-bounds-proxy' );

test( 'Search Bounds Left.', function( t ){

	var layout = horizontalLayout10x100(); // each item's width is 100
	var proxy  = new Proxy();
	var viewport = new Bounds();
	var objects = layout.objects;

	viewport.set( 0,0,100,0 );
	t.equals( searchBounds.geLeft( objects, viewport, proxy ), 0 );

	viewport.set( 50,0,100,0 );
	t.equals( searchBounds.geLeft( objects, viewport, proxy ), 0 );

	viewport.set( 100,0,100,0 );
	t.equals( searchBounds.geLeft( objects, viewport, proxy ), 1 );

	viewport.set( 101,0,100,0 );
	t.equals( searchBounds.geLeft( objects, viewport, proxy ), 1 );

	viewport.set( 200,0,100,0 );
	t.equals( searchBounds.geLeft( objects, viewport, proxy ), 2 );

	viewport.set( 300,0,100,0 );
	t.equals( searchBounds.geLeft( objects, viewport, proxy ), 3 );

	viewport.set( 400,0,100,0 );
	t.equals( searchBounds.geLeft( objects, viewport, proxy ), 4 );

	viewport.set( 900,0,100,0 );
	t.equals( searchBounds.geLeft( objects, viewport, proxy ), 9 );

	viewport.set( 950,0,100,0 );
	t.equals( searchBounds.geLeft( objects, viewport, proxy ), 9 );

	viewport.set( 1000,0,100,0 );
	t.equals( searchBounds.geLeft( objects, viewport, proxy ), -1 );

	viewport.set( 1001,0,100,0 );
	t.equals( searchBounds.geLeft( objects, viewport, proxy ), -1 );

	t.end();

});