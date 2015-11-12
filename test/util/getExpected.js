
// build a list of expected values for a layout method
// just to test things are running through the Layout class correctly.

var Proxy = require( 'jux-bounds-proxy' ); // could poss not require this and create custom..

var getExpected = function( layoutMethod, dataItems ){

	var defaultOpts = layoutMethod.defaultOpts;

	if( !defaultOpts ){
		throw Error( 'No default opts defined on layout method.' );
	}

	var proxy = new Proxy();

	var data = [];
	var sizes = [];
	var positions = [];

	var obj, prevObj, dat;
	var point = {};
	var bounds = {};

	for( var i = 0; i<dataItems.length; i++ ){

		dat = dataItems[i];
		obj = proxy.create();

		layoutMethod( i, dat, obj, prevObj, proxy, defaultOpts );

		proxy.position_get( obj, point );
		proxy.size_get( obj, bounds );

		data.push( dat );
		positions.push( point.x, point.y );
		sizes.push( bounds.width, bounds.height );

		prevObj = obj;
	}

	return {
		data: data,
		positions: positions,
		sizes: sizes
	}

};

module.exports = getExpected;