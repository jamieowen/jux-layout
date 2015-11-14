
var test = require( 'tape' );

var searchBounds = require( '../indexers/util/searchBounds' );
var buildHorizontalLayout 	= require( './util/horizontalLayout' );

var Bounds = require( 'jux-bounds' );
var Proxy  = require( 'jux-bounds-proxy' );

test( 'X Find Index.', function( t ){

	var layout = buildHorizontalLayout(); // each item's width is 100
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

	viewport.set( 1000,0,100,0 );
	t.equals( searchBounds.geLeft( objects, viewport, proxy ), -1 );

	viewport.set( 1001,0,100,0 );
	t.equals( searchBounds.geLeft( objects, viewport, proxy ), -1 );

	/**
	for( var i = 0; i<24; i++ ){

		viewport.set( i * 50 - 100, 0, 100, 30 );
		index = searchBounds.geLeft( objects, viewport, proxy );

		expected = i < 2 || i > 21 ? -1 : Math.floor( (i-2) / 2 );

		obj = objects[index];

		console.log( 'index : ', index );
		console.log( 'RETURNED : [ ' + proxy.x_get(obj) + ':' + proxy.width_get(obj) + ' ] - ' + viewport.left );

		if( index !== undefined ){

			//t.equals( index, expected, 'Returns correct start index for values : [ ' + proxy.x_get(obj) + ':' + proxy.width_get(obj) + ' ] - ' + viewport.left );
		}else{
			//t.equals( index, expected, 'Returns correct for out of bounds : ' + index + ' - ' + viewport.left );
		}
	}**/

	t.end();




});