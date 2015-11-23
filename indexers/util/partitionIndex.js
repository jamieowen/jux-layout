/**
 * Create a partition index to store the first index of each partition.
 *
 * @param partitionedObjects
 */
module.exports = function partitionIndexed( partitionedObjects, sort ){

	var index = [];
	var partition;

	if( sort ){
		partitionedObjects.objects.sort( sortMethod );
	}

	for( var i = 0; i<partitionedObjects.objects.length; i++ ){
		partition = partitionedObjects.objects[i];
		if( index[ partition.pxy ] === undefined ){
			index[ partition.pxy ] = i;
		}
	}

	return index;
};

var sortMethod = module.exports.sortMethod = function( a,b ){
	return a.pxy - b.pxy;
};