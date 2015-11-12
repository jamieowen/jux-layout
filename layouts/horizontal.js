
var defaultOpts = {
	itemWidth: 960,
	itemHeight: 88,
	xSpacing: 0
};

var horizontal = function( i, data, obj, prevObj, proxy, lopts ){

	proxy.position.set( obj, i * lopts.itemWidth + ( i * lopts.xSpacing ), 0 );
	proxy.size.set( obj, lopts.itemWidth, lopts.itemHeight );

};

horizontal.defaultOpts = defaultOpts;

module.exports = horizontal;