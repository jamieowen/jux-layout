
//var xFindIndex = require( './util/xFindIndex' );

var pointHelper = { x:0, y:0 };
var sizeHelper = { width: 0, height: 0 };


var SingleAxis = function( axis ){
	this.axis = axis === undefined ? 0 : axis;
};

module.exports = SingleAxis;

SingleAxis.prototype = {

	index: function( objects, proxy ){
		this.clear();
		this.objects = objects;
	},

	find: function( viewport, results, proxy ){

		console.log( 'FIND...' );

		if( this.axis === 0 ){

			var objs = this.objects;

			if( objs.length === 0 ){
				return results;
			}else{

				// Skip searching if the viewport is out of bounds completely.

				if( viewport.right < proxy.x_get( objs[0] ) ){
					console.log( "LEFT MAX" );
					return results;
				}else
				if( viewport.left > proxy.x_get( objs[ objs.length-1 ] ) ){
					console.log( "RIGHT MAX" );
					return results;
				}
			}

			var startIndex = xFindIndex(
				this.objects,
				viewport.left, viewport.right,
				0, this.objects.length,
				5, proxy );

			console.log( 'START INDEX : ', startIndex );

			var notEnd = true;

			while( notEnd ){

				notEnd = false;
			}

			return results;


		}else{

		}

	},

	clear: function(){

	},

	dispose: function(){
		this.clear();
		this.objects = null;
	}

};