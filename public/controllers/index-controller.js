// Export the controller
var app = angular.module('calendar-app',["ngRoute"]).config(configApp);

configApp.$inject = ['$routeProvider', '$locationProvider'];
function configApp($routeProvider, $locationProvider) {
	$routeProvider
	.when('/home', {
		templateUrl: 'home.html',
		controller: 'HomeController'
	});
	$locationProvider.html5Mode(true);
}

// Defining wrapper Routes for our API
app.controller('index-controller', function ($scope, $http, $timeout, $location, $window) {

	$scope.signin = {
		username: "",
		email: ""
	}

	document.getElementById("content").innerHTML = ""; 
	
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
							.then(function(data) {
								//$location.path('/home').search({username:data.data.username, email:data.data.email});
								document.getElementById('googlebutton').style.display = 'none';
								document.getElementById('authorize-button').style.display = 'block';
								document.getElementById('greeting').style.display = 'block';
							})
							.catch(function(data) {
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