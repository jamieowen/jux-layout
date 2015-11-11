
var Signal 		   = require( 'signals' );

var Bounds 		   = require( 'jux-bounds');

var DefaultProxy   = require( 'jux-bounds-proxy' );
var DefaultLayout  = require( './layouts/horizontal' );
var DefaultIndexer = require( './indexers/default' );

var defaultOpts = {
	layout: DefaultLayout,
	layoutOpts: DefaultLayout.defaultOpts,
	proxy: new DefaultProxy(),
	indexer: new DefaultIndexer(),
	dataIsRenderer: false
};

var boundsHelper = new Bounds();

var Layout = function( data, opts ){

	opts = opts || defaultOpts;

	this.onLayoutUpdated = new Signal();

	this._data = data;
	this._layout = null;
	this._indexer = null;
	this._results = [];

	this.bounds = new Bounds();
	this.objects = [];

	this.layout = opts.layout || defaultOpts.layout;
	this.indexer = opts.indexer || defaultOpts.indexer;
	this._proxy = opts.proxy || defaultOpts.proxy;

	opts.dataIsRenderer === undefined ? defaultOpts.dataIsRenderer : opts.dataIsRenderer;

	this.needsLayoutUpdate = true;
	this.needsIndexerUpdate = true;

	this._opts = opts;
};


module.exports = Layout;


Layout.prototype = {

	update: function(){

		if( this.needsLayoutUpdate ){
			this.needsLayoutUpdate = false;
			this.needsIndexerUpdate = true;

			this.objects.splice(0);
			this.bounds.set(0,0,0,0);

			var data,i,obj;
			var prevObj = null;
			var bounds = boundsHelper;

			for( i = 0; i<this._data.length; i++ ){
				data = this._data[i];
				if( this._opts.dataIsRenderer ){
					obj = data;
				}else{
					obj = this._proxy.create( data );
					this._proxy.data.set( obj, data );
				}

				this._layout( i, data, obj, prevObj, this._proxy, this._opts.layoutOpts );

				this._proxy.bounds.get( obj, bounds );

				// bounds expand() ?
				this.bounds.x = Math.min( bounds.left, this.bounds.left );
				this.bounds.y = Math.min( bounds.top, this.bounds.top );
				this.bounds.width = Math.max( bounds.right, this.bounds.right );
				this.bounds.height = Math.max( bounds.bottom, this.bounds.bottom );

				this.objects.push( obj );

				prevObj = obj;
			}

		}

		if( this.needsIndexerUpdate ){
			this.needsIndexerUpdate = false;
			this._indexer.index( this.objects, this._proxy )
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