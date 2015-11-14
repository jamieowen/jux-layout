
var binarySearch = require( 'binary-search-bounds' );
var gt = binarySearch.gt;

var argHelper = {
	value: 0,
	proxy: null
};

var compareRight = function( obj, arg ){
	return ( arg.proxy.x_get( obj ) + arg.proxy.width_get( obj ) ) - arg.value;
};

var compareBottom = function( obj, arg ){
	return arg.proxy.y_get( obj ) - arg.value;
};

module.exports = {

	binarySearch: binarySearch,

	geLeft: function( objects, bounds, proxy, start, end ){

		if( objects.length === 0 ){
			return -1;
		}

		var first = objects[0];
		var last = objects[ objects.length-1 ];

		if( bounds.right < proxy.x_get( first ) ){
			return -1;
		}else
		if( bounds.left > proxy.x_get( last ) + proxy.width_get( last ) ){
			return -1;
		}

		argHelper.proxy = proxy;
		argHelper.value = bounds.left;

		var res = gt( objects, argHelper, compareRight, start, end );
		return res >= objects.length ? -1 : res;
	},

	geTop: function( objects, top, proxy, start, end ){

		argHelper.proxy = proxy;
		argHelper.value = top;

		return gt( objects, argHelper, compareBottom, start, end );
	}

};