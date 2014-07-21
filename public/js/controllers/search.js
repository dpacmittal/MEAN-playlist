mean.controller('SearchController', function($scope, $timeout, YoutubeFactory, DragDropFactory){
	$scope.search = function(){
		YoutubeFactory.search($scope.query);
	}
	$scope.$on('searchResultRetrieved', function(){
		$scope.results = YoutubeFactory.getSearchResults().items;
	});
	$scope.dragStart = function(e) {
		DragDropFactory.setData(this.video, 'video');
	}
});