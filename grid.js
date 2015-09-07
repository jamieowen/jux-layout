
var grid = function( i, object, opts, factory ){

	var gx = i % opts.gridX;
	var gy = i / opts.gridX;

	var x = gx * opts.gridWidth;
	var y = gy * opts.gridHeight;

	factory.position( object, x, y );

};