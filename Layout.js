
var defaultStrategy = require( './horizontal' );
var defaultProxy  	= require( './LayoutObjectProxy' );
var defaultIndexer  = require( './DefaultIndexer' );

/**
 *
 * Layout.
 *
 * @constructor
 */

var Layout = function( data, strategy, proxy, indexer ){

	this.data = null;
	this.strategy = null; // set via setMethod

	data = data || null;
	strategy = strategy || defaultStrategy;

	this.proxy = proxy || defaultProxy;
	this.indexer = indexer || new defaultIndexer( this.proxy );

	this.opts = {};
	this.needsUpdate = false;

	this.setStrategy( strategy );
	this.setData( data );
};


module.exports = Layout;


Layout.prototype = {

	setStrategy: function( strategy ){

		if( this.strategy === strategy ){
			return;
		}

		this.strategy = strategy;
		this.needsUpdate = true;
	},

	setData: function( data ){

		if( this.data === data ){
			return;
		}

		this.data = data;
		this.needsUpdate = true;
	},

	update: function(){

		if( this.needsUpdate ){

			this.needsUpdate = false;

			if( this.data ){

				var layout = this.strategy;
				var proxy = this.proxy;
				var layoutObj,data;
				var opts = this.opts;

				var indexer = this.indexer;

				for( var i = 0; i<this.data.length; i++ ){
					data = this.data[i];

					// pass in data to create()
					// data can be used to alter renderer type
					layoutObj = proxy.create( data );

					// data object not set above.
					// but at this point.. ??
					proxy.data( layoutObj, data );

					// layout with the strategy function
					layout( i, data, layoutObj, proxy, opts );

					// add to index ( array, spatial index, etc )
					indexer.add( layoutObj );
				}
			}

		}
	},

	find: function( viewBounds, results ){

		var results = results || [];
		return this.indexer.find( viewBounds, results );

	}

};