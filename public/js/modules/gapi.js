angular.module('gapi', ['ng']).run(function () {
    var tag = document.createElement('script');
    tag.src = "https://apis.google.com/js/client.js?onload=gapiLoaded";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}).
factory('gapiFactory', function($rootScope, $window, PLIST_CONFIG, $rootScope) {
	var service = {};
	var api_key = PLIST_CONFIG.api_key;
	$window.gapiLoaded = function() {
		service.loaded = true;
	}

	service.auth = function(immediate) {
		if(typeof immediate === 'undefined')
			immediate = false;

		gapi.client.setApiKey(api_key);
		//debugger;
		gapi.auth.authorize({
				client_id: PLIST_CONFIG.client_id, 
				scope: PLIST_CONFIG.oauth_scopes, 
				immediate: immediate
			}, 
			handleAuthResult
		);
	}

	$window.handleAuthResult = function(authData) {
		//debugger;
		if( Object.prototype.hasOwnProperty.call(authData, 'access_token') ) {
			console.log("Logged in");
			console.log(authData);
			service.authData = authData;
			//Not required, doesn't work also. Token is automatically set by gapi
			//gapi.auth.setToken(authData.access_token);
			
			$rootScope.$broadcast('gapi:LoggedIn');
		}
		else
			service.auth(false);
		
	}

	service.getAllPlaylists = function() {

		return gapi.client.request({
			path: 'youtube/v3/playlists',
			params: {
			    //channelId: 'UCmE5rSeUppEi1_DOJz72hjA',
			    'mine': true,
			    part: 'contentDetails,snippet',
			    maxResults: 50
			}
		  });
	}

	service.getSongsFromPlaylist = function(id) {
		return gapi.client.request({
			path: 'youtube/v3/playlistItems',
			params: {
			    playlistId: id,
			    part: 'contentDetails,snippet',
			    maxResults: 50
			}
	  	});
	}

	service.logout = function() {
		gapi.auth.signOut();
		$rootScope.$broadcast('gapi:LoggedOut');
	}


	return service;
});