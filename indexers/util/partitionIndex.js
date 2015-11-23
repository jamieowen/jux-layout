/**
 * Create a partition index to store the first index of each partition.
 *
 * @param partitionObjects
 */
module.exports = function partitionIndexed( partitionObjects, sort ){

	var index = [];
	var partition;

	if( sort ){
		partitionObjects.objects.sort( sortMethod );
	}

	for( var i = 0; i<partitionObjects.objects.length; i++ ){
		partition = partitionObjects.objects[i];
		if( index[ partition.pxy ] === undefined ){
			index[ partition.pxy ] = i;
		}
	}

	return index;
};

var sortMethod = module.exports.sortMethod = function( a,b ){
	return a.pxy - b.pxy;
};