// Here is the controller were we call our service to populate the user array
(function () {
    angular
        .module('gitChallenge')
        .controller('gcCtrl', ['$scope', '$http', 'userService', function($scope, $http, userService) {
            $scope.getUsers = function(){
                // Here we make the first call which passes the input from the user to the service
                userService.findUsers($scope.userInput);
                // With this function we retrieve the array which was populated by the previous call and give it to scope for use in populating the DOM
                $scope.results = userService.getUsers();
            };
        }]);
})();
