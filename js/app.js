(function () {
    angular
        .module('gitChallenge', ['userService'])
        .controller('gcCtrl', function gcCtrl($scope, $http, userService) {
            $scope.getUsers = userService.findUsers($scope.userInput);
            $scope.results = userService.getUsers();
        });
})();
