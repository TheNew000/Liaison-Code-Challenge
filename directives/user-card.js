// Here we define the directive as an element and connect the template to the element tag
(function () {
    angular.module("gitChallenge")
    .directive("userCard", function() {
        return {
            restrict: "E",
            templateUrl: "templates/card-directive.html"
        };
    });
})();
