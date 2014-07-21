mean.controller('NowPlayingController', function($scope, PlayListFactory, $youtube, gapiFactory){
	$scope.nowPlaying = {};
	$scope.current_song = '';
	$scope.current_song_index = '';
	$scope.currentVideoId = '';
	$scope.$on('nowPlayingChanged', function(){
		$scope.nowPlaying = PlayListFactory.getNowPlaying();
		$scope.current_song_index = $scope.nowPlaying.current_song_index;
	});
	$scope.$watch('current_song_index', function(newVal){
		if(newVal!=='' && !isNaN(newVal)) {
			$scope.current_song = $scope.nowPlaying.songs[$scope.current_song_index];
			$scope.currentVideoId = $scope.nowPlaying.songs[$scope.current_song_index].id;
		}
	});
	$scope.$on('youtube.player.ready', function(){
		$youtube.player.playVideo();
	});
	$scope.$on('youtube.player.ended', function(){
		$scope.nowPlaying.current_song_index++;
	});
	
});