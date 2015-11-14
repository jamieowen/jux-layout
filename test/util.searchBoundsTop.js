
var test = require( 'tape' );

var searchBounds = require( '../indexers/util/searchBounds' );
var verticalLayout10x100 	= require( './util/verticalLayout10x100' );

var Bounds = require( 'jux-bounds' );
var Proxy  = require( 'jux-bounds-proxy' );

test( 'Search Bounds Top.', function( t ){

	var layout = verticalLayout10x100(); // each item's height is 100
	var proxy  = new Proxy();
	var viewport = new Bounds(0,0,100,100);
	var objects = layout.objects;

	viewport.y = -100;
	t.equals( searchBounds.geTop( objects, viewport, proxy ), -1 );

	viewport.y = 0;
	t.equals( searchBounds.geTop( objects, viewport, proxy ), 0 );

	viewport.y = 50;
	t.equals( searchBounds.geTop( objects, viewport, proxy ), 0 );

	viewport.y = 100;
	t.equals( searchBounds.geTop( objects, viewport, proxy ), 1 );

	viewport.y = 101;
	t.equals( searchBounds.geTop( objects, viewport, proxy ), 1 );

	viewport.y = 200;
	t.equals( searchBounds.geTop( objects, viewport, proxy ), 2 );

	viewport.y = 300;
	t.equals( searchBounds.geTop( objects, viewport, proxy ), 3 );

	viewport.y = 400;
	t.equals( searchBounds.geTop( objects, viewport, proxy ), 4 );

	viewport.y = 900;
	t.equals( searchBounds.geTop( objects, viewport, proxy ), 9 );

	viewport.y = 950;
	t.equals( searchBounds.geTop( objects, viewport, proxy ), 9 );

	viewport.y = 1000;
	t.equals( searchBounds.geTop( objects, viewport, proxy ), -1 );

	viewport.y = 1001;
	t.equals( searchBounds.geTop( objects, viewport, proxy ), -1 );

	t.end();

});