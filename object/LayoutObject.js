
var Rect = require( 'jux-bounds' );

var LayoutObject = function(){
	Rect.call( this );
	this.data = null;
};

LayoutObject.prototype = Object.create( Rect.prototype );

module.exports = LayoutObject;