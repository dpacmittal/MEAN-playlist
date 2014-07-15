mean.controller('NowPlayingController', function($scope, PlayListFactory){
	$scope.nowPlaying = {};
	$scope.$on('nowPlayingChanged', function(){
		$scope.nowPlaying = PlayListFactory.getNowPlaying();
	});
});