
var Rect 	   = require( 'jux-bounds/Rect' );
var intersects = require( 'jux-bounds/intersects' );

var helperRect = new Rect();

/**
 * Basic Array store implementing a standard Indexer interface.
 * No spatial indexing. Just an array with bounds checking on all objects.
 *
 * @param proxy
 * @constructor
 */
var DefaultIndexer = function( proxy ){

	if( typeof proxy === 'undefined' ){
		throw new Error( 'Specify a proxy for indexed objects.' );
	}
	this.proxy = proxy;
	this.objects = [];

};

module.exports = DefaultIndexer;

DefaultIndexer.prototype = {

	add: function( object ){

		this.objects.push( object );
		this.count = this.objects.length;
	},

	remove: function( object ){

		var idx = this.objects.indexOf( object );
		this.objects.splice( idx, 1 );
	},

	update: function( object ){

	},

	find: function( viewBounds, results ){

		var objBounds = helperRect;
		var obj;
		var proxy = this.proxy;

		for( var i = 0; i<this.objects.length; i++ ){

			obj = this.objects[ i ];
			proxy.get.bounds( obj, objBounds );

			if( intersects( viewBounds, objBounds ) ){
				results.push( obj );
			}

		}

		return results;
	},

	clear: function(){

		this.objects.splice(0);
	},

	dispose: function(){

		this.clear();
		this.objects = null;
	}

};

Object.defineProperties( DefaultIndexer.prototype, {

	count: {
		get: function(){
			return this.objects.length;
		}
	}

});
