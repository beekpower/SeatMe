(function ()
{
    var SeatMe = angular.module("seatMe", ['ngRoute','services', 'controllers']);
    SeatMe.config(["$routeProvider", function ($routeProvider)
    {        
        $routeProvider.when("/", {
            controller: "groupSelect",
            templateUrl: "partials/groupSelect.html"
        }).when("/people", {
            controller: "peopleController",
            templateUrl: "partials/people.html"
        }).when("/genetic", {
            controller: "geneticAlgorithm",
            templateUrl: "partials/genetic.html"
        }).otherwise({
            redirectTo: "/"
        });
    }]);
})();
