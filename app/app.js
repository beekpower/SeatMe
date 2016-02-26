(function ()
{
    var SeatMe = angular.module("seatMe", ['ngRoute','services', 'controllers']);
    SeatMe.config(["$routeProvider", function ($routeProvider)
    {
        $routeProvider.when("/", {
            controller: "peopleController",
            templateUrl: "partials/people.html"
        }).when("/generator", {
            controller: "geneticAlgorithm",
            templateUrl: "partials/genetic.html"
        }).otherwise({
            redirectTo: "/"
        });
    }]);
})();
