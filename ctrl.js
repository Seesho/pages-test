angular.module("app").controller("ctrl", function($scope) {
    $scope.firstName	= "John";
    $scope.lastName= "Doe";
    $scope.goob = "Goob";
});

angular.module("app").controller("tracker", function($scope) {

});

angular.module("app").controller("redirect", function($scope, $location){
    $location.path('/home');
});
