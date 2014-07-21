mean.controller('NowPlayingController', function($scope, PlayListFactory, $youtube, gapiFactory){
	$scope.nowPlaying = {};
	$scope.$on('nowPlayingChanged', function(){
		$scope.nowPlaying = PlayListFactory.getNowPlaying();
		$scope.current_song_index = $scope.nowPlaying.current_song_index;
	});
	$scope.$watch('nowPlaying.current_song_index', function(newVal){
		if(newVal!=='' && !isNaN(newVal)) {
			$scope.nowPlaying.currentVideoId = $scope.nowPlaying.songs[$scope.nowPlaying.current_song_index].id;
		}
	});
	$scope.$on('youtube.player.ready', function(){
		$youtube.player.playVideo();
	});
	$scope.$on('youtube.player.ended', function(){
		$scope.nowPlaying.current_song_index++;
	});

	$scope.togglePlay = function() {
		if($youtube.player.getPlayerState() == 1)
			$youtube.player.pauseVideo();
		else if($youtube.player.getPlayerState() == 2)
			$youtube.player.playVideo();
	}

	$scope.next = function() {
		$scope.nowPlaying.current_song_index++;
	}

	$scope.previous = function() {
		$scope.nowPlaying.current_song_index--;
	}
	
});