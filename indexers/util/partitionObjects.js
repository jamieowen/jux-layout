
/**
 *
 * Generate a flat 1d array indexing the 2d objects by partition index.
 * This can then be searched with a binary search.
 *
 * @param objects
 * @param bounds
 * @param opts
 */
module.exports = function partitionObjects( objects, bounds, proxy, opts ){

	opts = opts || {};

	var partitionWidth = 64 || opts.partitionWidth;
	var partitionHeight = 64 || opts.partitionHeight;

	var i,object,entry;
	var size = { width: 0, height: 0 };

	if( opts.calcPartitionSizes ){

		var avgWidth = 0;
		var avgHeight = 0;

		for( var i = 0; i<objects.length; i++ ){
			object = objects[i];
			proxy.size_get( object,size );
			avgWidth += size.width;
			avgHeight += size.height;
		}

		partitionWidth = avgWidth / objects.length;
		partitionHeight = avgHeight / objects.length;

	}

	var partitionX = Math.floor( bounds.width / partitionWidth );
	var partitionY = Math.floor( bounds.height / partitionHeight );

	var info = {
		partitionWidth: partitionWidth,
		partitionHeight: partitionHeight,
		partitionX: partitionX,
		partitionY: partitionY
	};

	var tl = { x: 0, y: 0 };
	var br = { x: 0, y: 0 };
	var tlPart = { px: 0, py: 0, pxy:0 };
	var brPart = { px: 0, py: 0, pxy:0 };

	var results = [];

	console.log( 'INFO', info );

	var px,py,pxy;

	for( i = 0; i<objects.length; i++ ){

		object = objects[i];

		proxy.position_get( object, tl );
		proxy.size_get( object, size );

		br.x = tl.x + size.width;
		br.y = tl.y + size.height;

		calcPartition( tl, tlPart, info );
		calcPartition( br, brPart, info );

		// build x partition entries ( as objects can overlap partitions )
		px = tlPart.px;
		py = tlPart.py;
		pxy = tlPart.pxy;

		// TODO : CHECCK LESS THAN OR EQUALS

		console.log( 'CHECK : ', i, px , py, brPart.px, tlPart.py );
		for( px = 0; px < brPart.px - tlPart.px; px++ ){
			for( py = 0; py < brPart.py - tlPart.py; py++ ){

				entry = {
					idx: i,
					info: info,
					object: object,
					px: tlPart.px + px,
					py: tlPart.py + py,
					pxy: null
				};

				entry.pxy = entry.px + ( entry.py * info.partitionX );

				results.push( entry );

			}

		};

	}

	return results;

};

var calcPartition = function( point, to, info ){

	to.px  = Math.floor( point.x / info.partitionWidth ),
	to.py  = Math.floor( point.y / info.partitionHeight ),
	to.pxy = to.px + ( to.py * info.partitionX );

};