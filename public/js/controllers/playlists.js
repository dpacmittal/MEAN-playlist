mean.controller('PlayListController', function($scope, PlayListFactory, YoutubeFactory, DragDropFactory){
	$scope.playlists = PlayListFactory.getAll();
	$scope.add = function() {PlayListFactory.add($scope.new_playlist_name, '1234', []) };
	$scope.videoInfo = function()  { 
		YoutubeFactory.refreshVideoInfo([$scope.new_playlist_name])
		.success(function(data, status, headers, config){ 
			console.log(data);
		});
	};
	$scope.dragEnd = function(e) {
		console.log(this);
		var video = DragDropFactory.getData();
		video = video.data;
		DragDropFactory.clearData();
		PlayListFactory.addSong(this.playlist.name, video);
	}
	$scope.setNowPlaying = function(id){
		console.log("Playlist ID: " , id);
		PlayListFactory.setNowPlaying(id);
	}
});