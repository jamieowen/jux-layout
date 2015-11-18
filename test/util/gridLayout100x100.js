
var Layout 		= require( '../../Layout' );
var grid 		= require( '../../layouts/grid' );

module.exports = function gridLayout(){

	var data = [0,1,2,3,4,5,6,7,8,9].map( function(i){
		return { num: i };
	});

	// Test layout
	var layout = new Layout( data, {
		layout:grid,
		layoutOpts:{
			gridX: 3,
			gridY: 3,
			gridDirection: 'vertical',
			itemWidth: 100,
			itemHeight: 100,
			ySpacing: 0,
			xSpacing: 0
		}
	} );

	layout.indexer.axis = 0;

	layout.update();

	return layout;

};
