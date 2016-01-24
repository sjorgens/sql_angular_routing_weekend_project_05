var app = angular.module('routeApp', ['ngRoute']);

//Global variables for testing purposes
//var USERID = 1;
//var ARRAYPOSITION = 0;

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
    $scope.userAddresses = [];
    var id = null;

    getUsers();

    $scope.getUserAddresses = function() {

        var id = $scope.allUsers.id;

        //testing purposes
        //console.log('getUserAddresses function started...');

        if (id != null) {
            //testing purposes
            //console.log('User id ' + id + ' selected...');

            $http.get('/api/pullUserAddresses/' + id).success(function(response){
                $scope.userAddresses = response;

                //testing purposes
                //console.log('User Addresses: ', $scope.userAddresses);
            });
        }else{
            alert('No user was selected.  Please select a user to continue.');
        }
    }

    function getUsers(){
        //testing purposes
        //console.log('getUsers function started...');

        $http.get('/api/pullAllUsers').success(function(response){
            //console.log(response);
            $scope.allUsers = response;

            //testing purposes
            //console.log('Username: ', $scope.allUsers[ARRAYPOSITION].name);
            //USERID = $scope.allUsers[ARRAYPOSITION].id;
            //getUserAddresses();
        });
    };
}]);

app.controller('OrderLookup', ['$scope', '$http', function($scope, $http){
    $scope.allUsers = [];
    $scope.userOrders = [];
    var id = null;

    //testing purposes
    console.log('OrderLookup Controller initiated...');

    getUsers();

    $scope.getUserOrders = function() {

        var id = $scope.allUsers.id;

        //testing purposes
        //console.log('getUserOrders function started...');

        if (id != null) {
            //testing purposes
            //console.log('User id ' + id + ' selected...');

            $http.get('/api/pullUserOrders/' + id).success(function(response){
                $scope.userOrders = response;

                //testing purposes
                console.log('User Orders: ', $scope.userOrders);
            });
        }else{
            alert('No user was selected.  Please select a user to continue.');
        }
    }

    function getUsers(){

        $http.get('/api/pullAllUsers').success(function(response){
            //console.log(response);
            $scope.allUsers = response;

        });
    };
}]);