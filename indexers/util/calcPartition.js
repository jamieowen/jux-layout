
module.exports = function calcPartition( point, to, info ){

	to.px  = Math.floor( point.x / info.partitionWidth );
	to.py  = Math.floor( point.y / info.partitionHeight );
	to.pxy = to.px + ( to.py * info.partitionX );

};