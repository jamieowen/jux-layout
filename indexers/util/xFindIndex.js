
// Perform a binary search on a sorted by x list of objects.

module.exports = function xFindIndex( objects, start, end, vl, vr, proxy ){

	var mid,object,left,right;

	while( start <= end ){

		mid = start + Math.floor( ( end - start ) * 0.5 );
		object = objects[mid];
		left = proxy.x_get( object );
		right = left + proxy.width_get( object );

		if( vl >= left && vl < right ){
			console.log( 'FOUND : [',left,':',right,'] :', vl );
			return mid;
		}else
		if( left < vl ){
			start = mid+1;
		}else{
			end = mid-1;
		}

	}

	console.log( 'NOT FOUND : [',left,':',right,'] :', vl );
	return -1;

};