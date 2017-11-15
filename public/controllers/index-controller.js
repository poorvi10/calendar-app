// Export the controller
var app = angular.module('calendar-app',[]);

// Defining wrapper Routes for our API
app.controller('index-controller', function ($scope, $http, $timeout, $location, $window) {
	$scope.signin = {
		username: "",
		email: "",
		g_image: ""
	}

	$scope.onGoogleLogin = function() {
		var params = {
			"clientid": "1078031504858-hkj464s7kmq3kbku9bn1pjcteehatkui.apps.googleusercontent.com",
			"cookiepolicy": "single_host_origin",
			"callback": function(result) {
				if(result['status']['signed_in']) {
					var request = gapi.client.plus.people.get(
						{
							'userId': 'me'
						}
					);
					request.execute(function(resp) {
						$scope.$apply(function() {
							$scope.signin.username = resp.displayName;
							$scope.signin.email = resp.emails[0].value;
							$scope.g_image  = resp.image.url;
							$http.post('/login', {'username':$scope.signin.username,
								'email':$scope.signin.email})
							.success(function(data) {
								console.log(data);
							})
							.error(function(data) {
								console.log(data);
							});
						});
					})
				}
			},
			"approvalprompt": "force",
			"scope": "https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read"
		}
		gapi.auth.signIn(params);
	}
});