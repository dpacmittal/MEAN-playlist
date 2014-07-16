mean.factory('YoutubeFactory', function($http, $rootScope, $filter, PLIST_CONFIG){
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
			formatDateYoutube('PT4H3M8S');
			factory.search_results = data; 

			//Create an array of IDs so we can retrieve duration, likes, dislikes, comments for all search results
			angular.forEach(data.items, function(value, key){
				ids.push(value.id.videoId);
			});

			//For each video details that we get, we insert the details object for that video in the main search_results.
			factory.refreshVideoInfo(ids).success(function(video_details){
				angular.forEach(video_details.items, function(value, key){
					value.contentDetails.formattedDuration = formatDateYoutube(value.contentDetails.duration);
					found = '';
					found = $filter('filter')(data.items, {id: {videoId: value.id} } )[0];
					if(angular.isObject(found))
						found.details = value;
				})
			})
			$rootScope.$broadcast('searchResultRetrieved');
		});
	}

	factory.getSearchResults = function(){
		return factory.search_results;
	}
	function formatDateYoutube(date) {
		var h = date.match(/(\d+)H/)
		h = (h===null)?0:h;
		var m = date.match(/(\d+)M/);
		m = (m===null)?0:m;
		var s = date.match(/(\d+)S/);
		s = (s===null)?0:s;
		var d = new Date(0,0,0, h[1], m[1], s[1], 0);
		return d;
	}

	return factory;
});