

var defaultOpts = {
	gridX: 5,
	gridY: 5,
	gridDirection: 'vertical',
	itemWidth: 960,
	itemHeight: 88,
	ySpacing: 0,
	xSpacing: 0
};

var grid = function( i, data, obj, proxy, opts ){

	if( opts.gridDirection === 'vertical' ){
		var gx = i % opts.gridX;
		var gy = i / opts.gridX;
	}else
	if( opts.gridDirection === 'horizontal' ){
		var gx = i % opts.gridY;
		var gy = i / opts.gridY;
	}

	var x = gx * opts.itemWidth + ( gx * opts.xSpacing );
	var y = gy * opts.itemHeight + ( gy * opts.ySpacing );

	proxy.position.set( obj, x, y );
	proxy.size.set( obj, opts.itemWidth, opts.itemHeight );


};

grid.defaultOpts = defaultOpts;

module.exports = grid;