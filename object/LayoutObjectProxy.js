
var LayoutObject = require( './LayoutObject' );

var LayoutObjectProxy = function(){

};

LayoutObjectProxy.extend = function( newProps ){

	var ExtendedLayoutProxy = function(){
		ExtendedLayoutProxy.call( LayoutObjectProxy.prototype );
	};

	ExtendedLayoutProxy.prototype = Object.create( ExtendedLayoutProxy.prototype );
	ExtendedLayoutProxy.prototype.constructor = ExtendedLayoutProxy;
	for( var prop in newProps ){
		ExtendedLayoutProxy.prototype = newProps[prop];
	}
	return new ExtendedLayoutProxy();
};

module.exports = LayoutObjectProxy;

LayoutObjectProxy.prototype = {

	create: function( data ){
		return new LayoutObject();
	},

	data: {
		get: function( obj ){
			return obj.data;
		},

		set: function(){

		}
	},

	bounds: {
		get: function( obj, bounds ){
			bounds.left = obj.left;
			bounds.right = obj.right;
			bounds.top = obj.top;
			bounds.bottom = obj.bottom
		},

		set: function( obj, left, top, right, bottom ){
			obj.left = left;
			obj.right = right;
			obj.top = top;
			obj.bottom = bottom
		}
	},

	position: {
		get: function( obj, point ){
			point.x = obj.left;
			point.y = obj.top;
		},

		set: function( obj, x, y ){
			obj.left = x;
			obj.top = y;
		}
	},

	size: {
		get: function( obj, rect ){
			rect.width = obj.width;
			rect.height = obj.height;
		},

		set: function( obj, width, height ){
			obj.width = width;
			obj.height = height;
		}
	}

	// x,
	// y,
	// width,
	// height
	// rotation

};