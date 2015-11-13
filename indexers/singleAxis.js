

var pointHelper = { x:0, y:0 };
var sizeHelper = { width: 0, height: 0 };

var SingleAxis = function( axis ){
	console.log( 'NEW SINGLE AXIS', axis );
	this.axis = axis === undefined ? 0 : axis;
};

module.exports = SingleAxis;

SingleAxis.prototype = {

	index: function( objects, proxy ){
		this.clear();
		this.objects = objects;
	},

	_xFindIndex: function( objects, vl, vr, left, right, maxDepth, proxy ){

		var mid = Math.floor( ( right - left ) * 0.5 ) + left;
		console.log( 'FIND ( left, right, mid ):', left, right, mid );
		if( mid < 0 || mid >= objects.length ){
			console.log( '----------- NOTHING FOUND' );
			return null;
		}

		var object = objects[mid];
		var x = proxy.x_get( object );
		var w = proxy.width_get( object );
		var r = x + w;

		if( vl > r ){
			return this._xFindIndex( objects, vl, vr, mid, right, maxDepth, proxy );
		}else
		if( vr < x ){
			return this._xFindIndex( objects, vl, vr, left, mid, maxDepth, proxy );
		}else
		if( vl >= x ){
			return mid;
		}else{
			return mid-1;
		}

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

			var startIndex = this._xFindIndex(
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