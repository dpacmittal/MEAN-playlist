angular.module('gapi', ['ng']).run(function () {
    var tag = document.createElement('script');
    tag.src = "https://apis.google.com/js/client.js?onload=gapiLoaded";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}).
factory('gapiFactory', function($rootScope, $window, PLIST_CONFIG, $rootScope) {
	var service = {};
	var api_key = PLIST_CONFIG.api_key;
	var retry = true;
	$window.gapiLoaded = function() {
		service.loaded = true;
		gapi.client.setApiKey(api_key);
	}

	service.auth = function(immediate, try_no) {
		if(!retry)
			return;

		if(typeof try_no === 'undefined')
			try_no = 1;

		if(try_no == 2)
			retry = false;

		if(typeof immediate === 'undefined')
			immediate = false;

		gapi.auth.authorize({
				client_id: PLIST_CONFIG.client_id, 
				scope: PLIST_CONFIG.oauth_scopes, 
				immediate: immediate
			}, 
			handleAuthResult
		);
	}

	$window.handleAuthResult = function(authData) {
		
		if( Object.prototype.hasOwnProperty.call(authData, 'access_token') ) {
			service.authData = authData;
			$rootScope.$broadcast('gapi:LoggedIn');
		}
		else
			service.auth(false, 2);
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