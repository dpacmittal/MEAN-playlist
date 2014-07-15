mean.factory('DragDropFactory', function(){
	var factory = {};
	var data;
	var type;
	factory.setData = function(d, t) {
		data = d;
		type = t;
	}
	factory.clearData = function() {
		data = '';
		type = '';
	}
	factory.getData = function() {
		return {data: data, type: type};
	}
	return factory;
});