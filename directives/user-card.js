angular.module("gitChallenge")
.directive("userCard", function() {
    return {
        restrict: "E",
        templateUrl: "templates/card-directive.html"
    };
});
