
var defaultOpts = {
	gridX: 5,
	gridY: 5,
	gridDirection: 'vertical',
	itemWidth: 960,
	itemHeight: 88,
	ySpacing: 0,
	xSpacing: 0
};

var grid = function( i, data, obj, prevObj, proxy, opts ){

	var gx,gy;

	if( opts.gridDirection === 'vertical' ){
		gx = i % opts.gridX;
		gy = Math.floor( i / opts.gridX );
	}else
	if( opts.gridDirection === 'horizontal' ){
		gx = i % opts.gridY;
		gy = Math.floor( i / opts.gridY );
	}

	var x = gx * opts.itemWidth + ( gx * opts.xSpacing );
	var y = gy * opts.itemHeight + ( gy * opts.ySpacing );

	proxy.position_set( obj, x, y );
	proxy.size_set( obj, opts.itemWidth, opts.itemHeight );

};

grid.defaultOpts = defaultOpts;

module.exports = grid;