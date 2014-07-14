mean.factory('PlayListFactory', function(){
	var factory = this;
	var playlists = [];
	this.getAll = function(){ return playlists;}
	this.add = function(name, id, songs){
		playlists.push({name: name, id: id, songs: songs});
	}
	this.refreshData = function(playlist_id){

	}
	return factory;
});