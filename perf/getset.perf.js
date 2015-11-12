

var Benchmark = require( 'benchmark' );

var suite = new Benchmark.Suite;

var position = {
	get: function( obj, points ){
		points.x = obj.x;
		points.y = obj.y;
	},

	set: function( obj, x, y ){
		obj.x = x;
		obj.y = y;
	}

};

var get_position = function( obj, points ){
	points.x = obj.x;
	points.y = obj.y;
};

var set_position = function( obj, x, y ){
	obj.x = x;
	obj.y = y;
};

var Proxy = function(){

};

Proxy.prototype = {

	get_position : function( obj, points ){
		points.x = obj.x;
		points.y = obj.y;
	},

	set_position: function( obj, x, y ){
		obj.x = x;
		obj.y = y;
	}

};

var proxy = new Proxy();

var ProxyNest = function(){

};

ProxyNest.prototype = {

	position: {
		get: function( obj, points ){
			points.x = obj.x;
			points.y = obj.y;
		},

		set: function( obj, x, y ){
			obj.x = x;
			obj.y = y;
		}

	}

};

var proxy = new Proxy();
var proxyNest = new ProxyNest();



// add tests
suite.add('Proxy get / set tests.', function() {
	/o/.test('Hello World!');
})
	.add('Get direct', function() {
		var obj = { x: 0, y:0 };
		var point = { x: 0, y:0 };

		point.x = obj.x;
		point.y = obj.y;
	})
	.add('Set direct', function() {
		var obj = { x: 0, y:0 };
		var point = { x: 0, y:0 };

		obj.x = point.x;
		obj.y = point.y;
	})
	.add('Get indirect nested', function() {
		var obj = { x: 0, y:0 };
		var point = { x: 0, y:0 };

		position.get( obj, point );

	})
	.add('Set indirect nested', function() {
		var obj = { x: 0, y:0 };
		var point = { x: 0, y:0 };

		position.set( obj, point.x, point.y );
	})
	.add('Get indirect loose', function() {
		var obj = { x: 0, y:0 };
		var point = { x: 0, y:0 };

		get_position( obj, point );

	})
	.add('Set indirect loose', function() {
		var obj = { x: 0, y:0 };
		var point = { x: 0, y:0 };

		set_position( obj, point.x, point.y );
	})
	.add('Get indirect class', function() {
		var obj = { x: 0, y:0 };
		var point = { x: 0, y:0 };

		proxy.get_position( obj, point );

	})
	.add('Set indirect class', function() {
		var obj = { x: 0, y:0 };
		var point = { x: 0, y:0 };

		proxy.set_position( obj, point.x, point.y );
	})
	.add('Get indirect class nested', function() {
		var obj = { x: 0, y:0 };
		var point = { x: 0, y:0 };

		proxyNest.position.get( obj, point );

	})
	.add('Set indirect class nested', function() {
		var obj = { x: 0, y:0 };
		var point = { x: 0, y:0 };

		proxyNest.position.set( obj, point.x, point.y );
	})

// add listeners
	.on('cycle', function(event) {
		console.log(String(event.target));
	})
	.on('complete', function() {
		console.log('Fastest is ' + this.filter('fastest').pluck('name'));
	})
// run async
	.run({ 'async': true });