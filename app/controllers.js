angular.module('controllers', [])
.controller('test', function($scope, Genetic) {
  var people = ["Nick", "Tyler", "Zach"];

  var relationships = [
    { source: "Nick", target: "Tyler", relation: 2},
    { source: "Nick", target: "Zach", relation: 2}
  ];

  var pr = [];

  for (var i=0; i < people.length; i++) {
    pr[i] = {};
    pr[i].name = people[i];
    pr[i].relationships = {};

    //initialize all relationships to 0
    for (var j=0; j < people.length; j++) {
      if (i != j) {
        pr[i].relationships[people[j]] = 0;
      }
    }

    //Now set the relationships.
    for (var j=0; j < relationships.length; j++) {
      if (relationships[j].source == pr[i].name) {
        pr[i].relationships[relationships[j].target] = relationships[j].relation;
      }
      if (relationships[j].target == pr[i].name) {
        pr[i].relationships[relationships[j].source] = relationships[j].relation;
      }
    }
  }

  alert(JSON.stringify(pr));

}).controller("geneticAlgorithm", function ($scope) {

}).controller("peopleController", function ($scope, Genetic, GroupMember, Relationships, $interval) {
  $scope.people = [];

  $scope.relationship = {source: "", target: "",relation: ""};
  $scope.relationshipCodes = Relationships;

  $scope.add = function(name) 
  {
    $scope.name = "";
    var newMember = new GroupMember(name);
    for(var i = 0; i < $scope.people.length; i++)
    {
        $scope.people[i].addRelation("no relation", newMember.name);
        newMember.addRelation("no relation", $scope.people[i].name);
    }
    $scope.people.push(newMember);
  }

  $scope.remove = function(index) 
  {
    $scope.people.splice(index, 1);
  }

  $scope.setRelation = function (relationship)
  {
    console.log(relationship)
    for (var i = 0; i < $scope.people.length; i++)
    {
      if ($scope.people[i].name === relationship.source)
          $scope.people[i].addRelation(relationship.relation, relationship.target);
      else if ($scope.people[i].name === relationship.target)
          $scope.people[i].addRelation(relationship.relation, relationship.source);
    }
  };

  $scope.submit = function ()
  {
    Genetic.init($scope.people);
    window.location.hash = "/generator";
  }




});
