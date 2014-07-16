mean.controller('NowPlayingController', function($scope, PlayListFactory, $youtube){
	$scope.nowPlaying = {};
	$scope.current_song = '';
	$scope.current_song_index = '';
	$scope.currentVideoId = '';
	$scope.$on('nowPlayingChanged', function(){
		$scope.nowPlaying = PlayListFactory.getNowPlaying();
		$scope.current_song_index = 0;
	});
	$scope.$watch('current_song_index', function(newVal){
		if(!isNaN(newVal)) {
			$scope.current_song = $scope.nowPlaying.songs[$scope.current_song_index];
			$scope.currentVideoId = $scope.nowPlaying.songs[$scope.current_song_index].id.videoId;
		}
	});
	$scope.$on('youtube.player.ready', function(){
		$youtube.player.playVideo();
	});
	$scope.$on('youtube.player.ended', function(){
		$scope.current_song_index++;
	})
});