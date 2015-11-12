
var defaultOpts = {
	itemWidth: 960,
	itemHeight: 88,
	itemSpacing: 0
};

var horizontal = function( i, data, obj, prevObj, proxy, lopts ){

	proxy.position_set( obj, i * lopts.itemWidth + ( i * lopts.itemSpacing ), 0 );
	proxy.size_set( obj, lopts.itemWidth, lopts.itemHeight );

};

horizontal.defaultOpts = defaultOpts;

module.exports = horizontal;