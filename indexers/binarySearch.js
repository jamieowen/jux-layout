
var Bounds 		 = require( 'jux-bounds' );
var searchBounds = require( './util/searchBounds' );

var BinarySearch = function( axis ){
	this.axis = axis === undefined ? 0 : axis;
};

module.exports = BinarySearch;

BinarySearch.prototype = {

	index: function( objects, proxy ){
		this.clear();
		this.objects = objects;
	},

	find: function( viewBounds, proxy, results ){

		var idx,min,max,obj;
		var objects = this.objects;
		var end = false;

		if( this.axis === 0 ){

			idx = searchBounds.geLeft( this.objects, viewBounds, proxy );

			if( idx === -1 ){
				return results;
			}

			results.push( objects[idx++] ); // first item is already in view
			max = viewBounds.right;

			while( !end && idx < objects.length ){
				obj = objects[idx++];
				min = proxy.x_get(obj);

				if( min < max ){
					results.push( obj );
				}else{
					end = true;
				}
			}

			return results;

		}else
		if( this.axis === 1 ){

		}



	},

	clear: function(){

	},

	dispose: function(){
		this.clear();
		this.objects = null;
	}

};