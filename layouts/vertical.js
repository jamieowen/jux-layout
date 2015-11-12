
var defaultOpts = {
	itemWidth: 960,
	itemHeight: 88,
	itemSpacing: 2
};

var vertical = function( i, data, obj, prevObj, proxy, opts ){

	proxy.position_set( obj, 0 , i * opts.itemHeight + ( i * opts.itemSpacing ) );
	proxy.size_set( obj, opts.itemWidth, opts.itemHeight );

};

vertical.defaultOpts = defaultOpts;

module.exports = vertical;