
var test = require( 'tape' );
var Proxy = require( '../object/LayoutObjectProxy' );
var LayoutObject = require( '../object/LayoutObject' );
var Rect = require( 'jux-bounds' );

test( 'ok', function( t ){

	console.log( 'OK' );
	var obj = new LayoutObject();
	obj.set( 10,10,100,100 );

	var bounds = new Rect();
	bounds.set( 50,50,500,500 );

	Proxy.bounds.set( obj, bounds.left, bounds.top, bounds.right, bounds.bottom );

	console.log( 'set bounds: ', obj );



	t.end();
});
