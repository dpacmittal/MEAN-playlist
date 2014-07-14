mean.controller('PlayListController', function($scope, PlayListFactory, YoutubeFactory){
	$scope.playlists = PlayListFactory.getAll();
	$scope.add = function() {PlayListFactory.add($scope.new_playlist_name, '1234', []) };
	$scope.videoInfo = function()  { 
		YoutubeFactory.refreshVideoInfo([$scope.new_playlist_name])
		.success(function(data, status, headers, config){ 
			console.log(data);
		});
	};
});