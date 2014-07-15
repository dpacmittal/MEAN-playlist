mean.controller('SearchController', function($scope, $timeout, YoutubeFactory, DragDropFactory){
	$scope.search = function(){
		YoutubeFactory.search($scope.query);
	}
	$scope.$on('searchResultRetrieved', function(){
		//console.log(YoutubeFactory.getSearchResults());
		$scope.results = YoutubeFactory.getSearchResults().items;
		console.log($scope);
	});
	$scope.dragStart = function(e) {
		DragDropFactory.setData(this.video, 'video');
	}
});