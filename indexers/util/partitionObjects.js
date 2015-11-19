
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

	var p,pxy;

	for( i = 0; i<objects.length; i++ ){

		object = objects[i];

		proxy.position_get( object, tl );
		proxy.size_get( object, size );

		br.x = tl.x + size.width;
		br.y = tl.y + size.height;

		calcPartition( tl, tlPart, info );
		calcPartition( br, brPart, info );

		// build x partition entries ( as objects can overlap partitions )
		p = tlPart.px;
		pxy = tlPart.pxy;

		// TODO : WRONG!!!  NEED TO ITERATE THIS IN A NESTED LOOP!!!!
		while( p <= brPart.px ){

			entry = {
				idx: i,
				info: info,
				object: object,
				px: p++,
				py: tlPart.py,
				pxy: pxy++
			};

			results.push( entry );

		}

		p = tlPart.py + 1; // add one to avoid adding another row
		pxy = tlPart.pxy;

		// THIS BIT SHOULD GO ABOVE..

		while( p <= brPart.py ){

			entry = {
				idx: i,
				info: info,
				object: object,
				px: tlPart.px,
				py: p++,
				pxy: pxy += info.partitionX // add x size to drop a partition row
			};

			results.push( entry );

		}

	}

	return results;

};

var calcPartition = function( point, to, info ){

	to.px  = Math.floor( point.x / info.partitionWidth ),
	to.py  = Math.floor( point.y / info.partitionHeight ),
	to.pxy = to.px + ( to.py * info.partitionX );

};