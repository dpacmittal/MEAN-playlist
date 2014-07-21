mean.factory('YoutubeFactory', function($http, $rootScope, $filter, PLIST_CONFIG, gapiFactory){
	var factory = this;
	var api_url = 'https://www.googleapis.com/youtube/v3/';
	var api_key = PLIST_CONFIG.api_key;
	var number_results = 20;
	factory.refreshVideoInfo = function(ids) {
		return $http.get(api_url + 'videos?id=' + ids.join(',') + '&key=' + api_key + '&part=snippet,contentDetails,statistics,status');
	}
	factory.search = function(query) {
		return $http.get(api_url + 'search?maxResults='+ number_results +'&part=snippet&q=' + encodeURI(query) + '&key=' + api_key + '&type=video')
		.success(function(data){
			var ids = [];
			 

			//Create an array of IDs so we can retrieve duration, likes, dislikes, comments for all search results
			angular.forEach(data.items, function(value, key){
				ids.push(value.id.videoId);
			});

			//For each video details that we get, we insert the details object for that video in the main search_results.
			var search_results = {}
			factory.refreshVideoInfo(ids).success(function(video_details){
				angular.forEach(video_details.items, function(value, key){
					factory.fixDateOnSong(value);
				})
			});
			factory.search_results = data;
			$rootScope.$broadcast('searchResultRetrieved');
		});
	}

	factory.getSearchResults = function(){
		return factory.search_results;
	}

	factory.fixDateOnSong = function(song) {
		song.contentDetails.formattedDuration = factory.formatDateYoutube(song.contentDetails.duration);
	}

	factory.formatDateYoutube = function(date) {
		var h = date.match(/(\d+)H/)
		h = parseInt((h===null)?0:h);
		var m = date.match(/(\d+)M/);
		m = parseInt((m===null)?0:m);
		var s = date.match(/(\d+)S/);
		s = parseInt((s===null)?0:s);
		time_arr = [];
		if(h>0){
			time_arr.push('' + h);
		}
		if(m>0){
			if(m<10)
				time_arr.push('0'+m);
			else
				time_arr.push(m);
		}
		if(s>0){
			if(s<10)
				time_arr.push('0'+s);
			else
				time_arr.push(s);
		}
		var d = time_arr.join(':');
		return d;
	}

	return factory;
});