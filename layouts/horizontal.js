
var defaultOpts = {
	itemWidth: 960,
	itemHeight: 88,
	xSpacing: 0
};

var horizontal = function( i, data, obj, proxy, opts ){

	proxy.position.set( obj, i * opts.itemWidth + ( i * opts.xSpacing ), 0 );
	proxy.size.set( obj, opts.itemWidth, opts.itemHeight );

};

horizontal.defaultOpts = defaultOpts;

module.exports = horizontal;