
var test = require( 'tape' );

var searchBounds = require( '../indexers/util/searchBounds' );
var horizontalLayout10x100 	= require( './util/horizontalLayout10x100' );

var Bounds = require( 'jux-bounds' );
var Proxy  = require( 'jux-bounds-proxy' );

test( 'Search Bounds Left.', function( t ){

	var layout = horizontalLayout10x100(); // each item's width is 100
	var proxy  = new Proxy();
	var viewport = new Bounds(0,0,100,100);
	var objects = layout.objects;

	viewport.x = -100;
	t.equals( searchBounds.geLeft( objects, viewport, proxy ), -1 );

	viewport.x = 0;
	t.equals( searchBounds.geLeft( objects, viewport, proxy ), 0 );

	viewport.x = 50;
	t.equals( searchBounds.geLeft( objects, viewport, proxy ), 0 );

	viewport.x = 100;
	t.equals( searchBounds.geLeft( objects, viewport, proxy ), 1 );

	viewport.x = 101;
	t.equals( searchBounds.geLeft( objects, viewport, proxy ), 1 );

	viewport.x = 200;
	t.equals( searchBounds.geLeft( objects, viewport, proxy ), 2 );

	viewport.x = 300;
	t.equals( searchBounds.geLeft( objects, viewport, proxy ), 3 );

	viewport.x = 400;
	t.equals( searchBounds.geLeft( objects, viewport, proxy ), 4 );

	viewport.x = 900;
	t.equals( searchBounds.geLeft( objects, viewport, proxy ), 9 );

	viewport.x = 950;
	t.equals( searchBounds.geLeft( objects, viewport, proxy ), 9 );

	viewport.x = 1000;
	t.equals( searchBounds.geLeft( objects, viewport, proxy ), -1 );

	viewport.x = 1001;
	t.equals( searchBounds.geLeft( objects, viewport, proxy ), -1 );

	t.end();

});