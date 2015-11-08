
var Rect = require( 'jux-bounds');
var Signal = require( 'signals' );

var defaultOpts = {
	layout: require( './layouts/horizontal' ),
	proxy: require( './object/LayoutObjectProxy' ),
	indexer: require( './indexers/default' ),
	dataIsRenderer: false
};

var defaultLayoutOpts = {
	itemWidth: 0,
	itemHeight: 0,
	xSpacing: 0,
	ySpacing: 0
};

var boundsHelper = new Rect();

var Layout = function( data, layoutOpts, opts ){

	opts = opts || defaultOpts;

	this._data = null;
	this._layout = null;
	this._indexer = null;
	this._bounds = new Rect();
	this._layoutObjects = [];
	this._results = [];

	this.data = data;

	this.layout = opts.layout || defaultOpts.layout;
	this.indexer = opts.indexer || defaultOpts.indexer;
	this._proxy = opts.proxy || defaultOpts.proxy;

	opts.dataIsRenderer === undefined ? defaultOpts.dataIsRenderer : opts.dataIsRenderer;

	this.needsLayoutUpdate = true;
	this.needsIndexerUpdate = true;

	this._opts = opts;
	this._layoutOpts = layoutOpts || defaultLayoutOpts;

	this.onLayoutUpdated = new Signal();

};


module.exports = Layout;


Layout.prototype = {

	update: function(){

		if( this.needsLayoutUpdate ){
			this.needsLayoutUpdate = false;
			this.needsIndexerUpdate = true;

			this._layoutObjects.splice(0);

			var data,i,obj;
			var bounds = boundsHelper;

			for( i = 0; i<this._data.length; i++ ){
				data = this._data[i];
				if( this._opts.dataIsRenderer ){
					obj = data;
				}else{
					obj = this._proxy.create( data );
					this._proxy.data.set( obj, data );
				}
				this._layout( i, data, obj, this._proxy, this._layoutOpts );

				this._proxy.bounds.get( obj, bounds );

				// bounds expand() ?
				this._bounds.left = Math.min( bounds.left, this._bounds.left );
				this._bounds.top = Math.min( bounds.top, this._bounds.top );
				this._bounds.right = Math.max( bounds.right, this._bounds.right );
				this._bounds.bottom = Math.max( bounds.bottom, this._bounds.bottom );
			}

		}

		if( this.needsIndexerUpdate ){
			this.needsIndexerUpdate = false;
			this._indexer.index( this._layoutObjects, this._proxy )
		}

	},

	find: function( viewBounds, results ){

		if( results ){
			return this._indexer.find( viewBounds, results );
		}else{
			this._results.splice(0);
			return this._indexer.find( viewBounds, this._results );
		}

	}

};

Object.defineProperties( Layout.prototype, {

	data: {
		get: function(){
			return this._data;
		},

		set: function( data ){
			if( this._data === data ){
				return;
			}

			this._data = data;

			this.needsLayoutUpdate = true;
			this.onLayoutUpdated.dispatch();

		}
	},

	layout: {
		get: function(){
			return this._layout;
		},

		set: function( layout ){
			if( this._layout === layout ){
				return;
			}

			this._layout = layout;

			this.needsLayoutUpdate = true;
			this.onLayoutUpdated.dispatch();
		}
	},

	indexer: {
		get: function(){
			return this._indexer;
		},

		set: function( indexer ){
			if( this._indexer === indexer ){
				return;
			}

			this._indexer = indexer;

			this.needsIndexerUpdate = true;

		}
	}

});