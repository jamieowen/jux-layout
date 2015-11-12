
var getActual = function( layout ){

	var data = [];
	var sizes = [];
	var positions = [];

	var bounds = {};
	var point = {};

	var proxy = layout._proxy;
	var obj,dat;

	for( var i = 0; i<layout.objects.length; i++ ){

		obj = layout.objects[i];

		dat = proxy.data_get( obj );
		proxy.position_get( obj, point );
		proxy.size_get( obj, bounds );

		data.push( dat );
		positions.push( point.x, point.y );
		sizes.push( bounds.width, bounds.height );
	}

	return {
		data: data,
		positions: positions,
		sizes: sizes
	}
};

module.exports = getActual;