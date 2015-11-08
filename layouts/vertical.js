
var defaultOpts = {
	itemWidth: 960,
	itemHeight: 88,
	ySpacing: 0
};

var vertical = function( i, data, obj, proxy, opts ){

	proxy.position.set( obj, 0 , i * opts.itemHeight + ( i * opts.ySpacing ) );
	proxy.size.set( obj, opts.itemWidth, opts.itemHeight );

};

vertical.defaultOpts = defaultOpts;

module.exports = vertical;