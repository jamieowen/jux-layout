
var LayoutObject = require( './LayoutObject' );

var LayoutObjectProxy = {

	create: function(){
		return new LayoutObject();
	},

	data: function( layoutObject, data ){

		layoutObject.data = data;

	},

	position: function( layoutObject, x, y ){

		layoutObject.x = x;
		layoutObject.y = y;
	},

	x: function( layoutObject, x ){

		layoutObject.x = x;
	},

	y: function( layoutObject, y ){

		layoutObject.y = y;
	},

	size: function( layoutObject, width, height ){

		layoutObject.width = width;
		layoutObject.height = height;
	},

	width: function( layoutObject, width ){

		layoutObject.width = width;
	},

	height: function( layoutObject, height ){

		layoutObject.height = height;
	},


	get: {

		data: function( layoutObject ){
			return layoutObject.data;
		},

		x: function( layoutObject ){
			return layoutObject.x;
		},

		y: function( layoutObject ){
			return layoutObject.y;
		},

		width: function( layoutObject ){
			return layoutObject.width;
		},

		height: function( layoutObject ){
			return layoutObject.height;
		},		

		bounds: function( layoutObject, rect ){

			rect.left 	= layoutObject.x;
			rect.top 	= layoutObject.y;
			rect.right 	= rect.left + layoutObject.width;
			rect.bottom = rect.top + layoutObject.height;

		}

	}

};

module.exports = LayoutObjectProxy;