// Export the controller
var myApp = angular.module('myApp', []);

// Defining wrapper Routes for our API
myApp.controller('appCtrl', function ($scope) {
	$scope.$on('event:google-plus-signin-success', function (event, authResult) {
		// User successfully authorized the G+ App!
		console.log('Signed in!');
	});
	$scope.$on('event:google-plus-signin-failure', function (event, authResult) {
		// User has not authorized the G+ App!
		console.log('Not signed into Google Plus.');
	});
});
