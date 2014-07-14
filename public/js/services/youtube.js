mean.factory('YoutubeFactory', function($http, $rootScope){
	var factory = this;
	var api_url = 'https://www.googleapis.com/youtube/v3/';
	var api_key = 'AIzaSyCVp1fFQKQT0_GbxMVbEs42VRbbSZkovb8';
	factory.refreshVideoInfo = function(ids) {
		return $http.get(api_url + 'videos?id=' + ids.join(',') + '&key=' + api_key + '&part=snippet,contentDetails,statistics,status');
	}
	factory.search = function(query) {
		return $http.get(api_url + 'search?maxResults=5&part=snippet&q=' + encodeURI(query) + '&key=' + api_key + '&type=video')
		.success(function(data){ 
			factory.search_results = data; 
			$rootScope.$broadcast('searchResultRetrieved');
		});
	}

	factory.getSearchResults = function(){
		return factory.search_results;
	}

	return factory;
})