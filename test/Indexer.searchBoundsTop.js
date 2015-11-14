
var test = require( 'tape' );

var searchBounds = require( '../indexers/util/searchBounds' );
var verticalLayout10x100 	= require( './util/verticalLayout10x100' );

var Bounds = require( 'jux-bounds' );
var Proxy  = require( 'jux-bounds-proxy' );

test( 'Search Bounds Top.', function( t ){

	var layout = verticalLayout10x100(); // each item's height is 100
	var proxy  = new Proxy();
	var viewport = new Bounds();
	var objects = layout.objects;

	viewport.set( 0,0,100,0 );
	t.equals( searchBounds.geTop( objects, viewport, proxy ), 0 );

	viewport.set( 0,50,100,0 );
	t.equals( searchBounds.geTop( objects, viewport, proxy ), 0 );

	viewport.set( 0,100,100,0 );
	t.equals( searchBounds.geTop( objects, viewport, proxy ), 1 );

	viewport.set( 0,101,100,0 );
	t.equals( searchBounds.geTop( objects, viewport, proxy ), 1 );

	viewport.set( 0,200,100,0 );
	t.equals( searchBounds.geTop( objects, viewport, proxy ), 2 );

	viewport.set( 0,300,100,0 );
	t.equals( searchBounds.geTop( objects, viewport, proxy ), 3 );

	viewport.set( 0,400,100,0 );
	t.equals( searchBounds.geTop( objects, viewport, proxy ), 4 );

	viewport.set( 0,900,100,0 );
	t.equals( searchBounds.geTop( objects, viewport, proxy ), 9 );

	viewport.set( 0,950,100,0 );
	t.equals( searchBounds.geTop( objects, viewport, proxy ), 9 );

	viewport.set( 0,1000,100,0 );
	t.equals( searchBounds.geTop( objects, viewport, proxy ), -1 );

	viewport.set( 0,1001,100,0 );
	t.equals( searchBounds.geTop( objects, viewport, proxy ), -1 );

	t.end();

});