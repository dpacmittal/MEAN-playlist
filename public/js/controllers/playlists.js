mean.controller('PlayListController', function($scope, PlayListFactory, YoutubeFactory, DragDropFactory, gapiFactory){
	$scope.playlists = PlayListFactory.getAll();
	
	$scope.add = function() {
		PlayListFactory.add($scope.new_playlist_name, Math.floor((Math.random()*100000)+1), true, []) 
	};
	$scope.videoInfo = function()  { 
		YoutubeFactory.refreshVideoInfo([$scope.new_playlist_name])
		.success(function(data, status, headers, config){ 
			console.log(data);
		});
	};
	$scope.dragEnd = function(e) {
		var video = DragDropFactory.getData();
		video = video.data;
		DragDropFactory.clearData();
		PlayListFactory.addSong(this.playlist.name, video);
	}
	$scope.setNowPlaying = function(id){
		PlayListFactory.setNowPlaying(id);
	}

	$scope.$on('gapi:LoggedIn', function() {
		gapiFactory.getAllPlaylists().execute(function(data){
			console.log(data);
			angular.forEach(data.items, function(value, key) {
				$scope.$apply(function(){
					var final_song_list = [];
					gapiFactory.getSongsFromPlaylist(value.id).execute(function(songs_list){
						var songs = [];
						angular.forEach(songs_list.items, function(value, key){
							songs.push(value.contentDetails.videoId);
						});

						YoutubeFactory.refreshVideoInfo(songs).success(function(songs_with_info){
							angular.forEach(songs_with_info.items, function(value, key){
								YoutubeFactory.fixDateOnSong(value);
								final_song_list.push(value);
							});
							PlayListFactory.add(value.snippet.title, value.id, false, final_song_list);
						});
					});
				});
			});
			//data.
		});
	});

	$scope.$on
});