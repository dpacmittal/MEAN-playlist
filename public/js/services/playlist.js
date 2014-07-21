mean.factory('PlayListFactory', function($filter, $rootScope){
	var factory = this;
	var playlists = [{name: 'abcdef', id:1, local: true, songs:[]}];
	var nowPlaying;
	this.getAll = function(){ return playlists;}
	this.add = function(name, id, local, songs){
		if(!songs.length)
			songs = [];
		playlists.push({name: name, id: id, local: local, songs: songs});
	}
	this.addSong = function(playlist_name, song) {
		var found = $filter('filter')(playlists, {name: playlist_name}, true)[0];
		if(found.songs) {
			//console.log(song);
			var dup = $filter('filter')(found.songs, {etag: song.etag }, true)[0];
			//console.log(dup);
			if(!dup)
				found.songs.push(song);
		}
		
	}
	this.setNowPlaying = function(id){
		ex_nowPlaying = nowPlaying;
		nowPlaying = $filter('filter')(playlists, {id: id}, true)[0];
		if(ex_nowPlaying != nowPlaying)
			$rootScope.$broadcast('nowPlayingChanged');
	}
	this.getNowPlaying = function(){
		return nowPlaying;
	}
	return factory;
});