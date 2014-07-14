mean.controller('SearchController', function($scope, $timeout, YoutubeFactory){
	$scope.search = function(){
		YoutubeFactory.search($scope.query);
	}
	$scope.$on('searchResultRetrieved', function(){
		//console.log(YoutubeFactory.getSearchResults());
		$scope.results = YoutubeFactory.getSearchResults().items;
		console.log($scope);
	});
});