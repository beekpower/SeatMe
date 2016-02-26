angular.module('controllers', [])
.controller("geneticAlgorithm", function ($scope, Genetic) {
  Genetic.evolve();
}).controller("peopleController", function ($scope, Genetic, Relationships) {
  $scope.relationship = { source: "", target: "", relation: ""};
  $scope.people = ["Nick", "Tyler", "Zach"];

  $scope.relationships = [
    { source: "Nick", target: "Tyler", relation: 2},
    { source: "Nick", target: "Zach", relation: 2}
  ];

  $scope.relationshipCodes = Relationships.getRelationships();
  $scope.getRelationship = Relationships.getRelationship;

  $scope.add = function(name) {
    $scope.people.push(name);
    $scope.people = "";
  }

  $scope.remove = function(index) {
    $scope.people.splice(index, 1);
  }

  $scope.addRelationship = function(relationship) {
    $scope.relationships.push(relationship);
    $scope.relationship = { source: "", target: "", relation: ""};
  }

  $scope.removeRelationship = function(index) {
    $scope.relationships.splice(index, 1);
  }

  $scope.submit = function() {
    var pr = [];
    for (var i=0; i < $scope.people.length; i++) {
      pr[i] = {};
      pr[i].name = $scope.people[i];
      pr[i].relationships = {};

      //initialize all relationships to 0
      for (var j=0; j < $scope.people.length; j++) {
        if (i != j) {
          pr[i].relationships[$scope.people[j]] = 0;
        }
      }

      //Now set the relationships.
      for (var j=0; j < $scope.relationships.length; j++) {
        if ($scope.relationships[j].source == pr[i].name) {
          pr[i].relationships[$scope.relationships[j].target] = $scope.relationships[j].relation;
        }
        if ($scope.relationships[j].target == pr[i].name) {
          pr[i].relationships[$scope.relationships[j].source] = $scope.relationships[j].relation;
        }
      }
    }

    Genetic.init(pr);
    window.location.hash = "/generator";
  }
});
