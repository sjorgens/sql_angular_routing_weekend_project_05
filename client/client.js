var app = angular.module('routeApp', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){   //$locationProvider needed to remove #'s in HTML to access controller links
    $routeProvider
        .when('/addressdisplay', {
            templateUrl: 'views/addressdisplay.html',
            controller: 'AddressDisplay'
        })
        .when('/orderlookup', {
            templateUrl: 'views/orderlookup.html',
            controller: 'OrderLookup'
        })
    $locationProvider.html5Mode(true);     //needed to remove #'s from HTML links to access controllers
}]);

app.controller('AddressDisplay', ['$scope', '$http', function($scope, $http){
    $scope.allUsers = [];

    $scope.getUsers = function(){
        //console.log('getUsers function started...');
        $http.get('/api/pullAllUsers').success(function(response){
            console.log(response);
            $scope.allUsers = response;
        });
    };

}]);

app.controller('OrderLookup', ['$scope', function($scope){

}]);
