
var Layout 		= require( '../../Layout' );
var vertical 	= require( '../../layouts/vertical' );

module.exports = function verticalLayout(){

	var data = [0,1,2,3,4,5,6,7,8,9].map( function(i){
		return { num: i };
	});

	// Test layout
	var layout = new Layout( data, {
		layout:vertical,
		layoutOpts:{
			itemWidth: 100,
			itemHeight: 100,
			itemSpacing: 0
		}
	} );

	layout.update();

	return layout;

};
