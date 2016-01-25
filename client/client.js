var app = angular.module('routeApp', ['ngRoute']);

//Global variables for testing purposes


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

        if (id != null) {

            $http.get('/api/pullUserAddresses/' + id).success(function(response){
                $scope.userAddresses = response;

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

app.controller('OrderLookup', ['$scope', '$http', function($scope, $http){
    $scope.allUsers = [];
    $scope.userOrders = [];
    $scope.minDate = {
        value: new Date(2015, 0, 1)
    };
    $scope.maxDate = {};
    $scope.orderTotal = 0;
    var id = null;
    var startDate = null;
    var endDate = null;

    //testing purposes
    console.log('OrderLookup Controller initiated...');

    getUsers();

    $scope.getUserOrders = function() {

        var id = $scope.allUsers.id;

        //testing purposes
        startDate = $scope.minDate.value.toISOString();
        endDate = $scope.maxDate.value.toISOString();

        if (id != null) {

            $http.get('/api/pullUserOrders/' + id + '/' + startDate + '/' + endDate).success(function(response){
                $scope.userOrders = response;

                for (var i = 0; i < response.length; i++){
                    $scope.orderTotal += parseFloat(response[i].amount);
                }

                //testing purposes
                console.log('User Orders: ', $scope.userOrders);
                console.log('User Orders Grand Total: ', $scope.orderTotal);
            });
        }else{
            alert('No user was selected.  Please select a user to continue.');
        }
    }

    function getUsers(){

        $http.get('/api/pullAllUsers').success(function(response){

            $scope.allUsers = response;

        });
    };
}]);