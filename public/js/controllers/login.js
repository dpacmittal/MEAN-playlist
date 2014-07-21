mean.controller('LoginController', function($scope, gapiFactory){
	$scope.status = {
		logged: false,
		loaded: true
	};
	$scope.gapi = gapiFactory;
	$scope.$on('gapi:LoggedIn', function(){
		$scope.$apply(function(){
			$scope.status.logged = true;
		});
	});

	$scope.$on('gapi:LoggedOut', function(){
//		$scope.$apply(function(){
			$scope.status.logged = false;
//		});
	});
	/*$scope.auth = function() {
		gapiFactory.auth();
	}*/
	/*$scope.getChannels = function() {
		gapiFactory.getChannels();
		console.log(gapiFactory);
	}*/
});