
var Rect 	   = require( 'jux-bounds/Rect' );
var intersects = require( 'jux-bounds/intersects' );

var helperRect = new Rect();

var DefaultIndexer = function(){
};

module.exports = DefaultIndexer;

DefaultIndexer.prototype = {

	// called once
	index: function( objects, proxy ){

		this.clear();
		this.objects = objects;
	},

	// called everyframe when view is updating
	find: function( viewport, results, proxy ){

		var objBounds = helperRect;
		var obj;

		for( var i = 0; i<this.objects.length; i++ ){

			obj = this.objects[ i ];
			this.proxy.get.bounds( obj, objBounds );

			if( intersects( viewport, objBounds ) ){
				results.push( obj );
			}

		}

		return results;
	},

	clear: function(){
		// do nothing here - don't affect the layout array.
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
