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
}).controller("groupSelect", function ($scope, GroupMember, Relationships)
{
    $scope.group = [];
    $scope.newMember = '';
    $scope.data = {
        leftMember: "",
        rightMember: "",
        relationship: ""
    };
    $scope.relationships = Relationships;

    $scope.setRelation = function ()
    {
        for (var i = 0; i < $scope.group.length; i++)
        {
            if ($scope.group[i].name === $scope.data.leftMember)
                $scope.group[i].addRelation($scope.data.relationship, $scope.data.rightMember);
            else if ($scope.group[i].name === $scope.data.rightMember)
                $scope.group[i].addRelation($scope.data.relationship, $scope.data.leftMember);
        }
    };

    $scope.addMember = function ()
    {
        var newMember = new GroupMember($scope.newMember);
        for(var i = 0; i < $scope.group.length; i++)
        {
            $scope.group[i].addRelation("no relation", newMember.name);
            newMember.addRelation("no relation", $scope.group[i].name);
        }
        console.log($scope.group);
        $scope.group.push(newMember);
        $scope.newMember = '';
    };

}).controller("geneticAlgorithm", function ($scope) {

}).controller("peopleController", function ($scope) {
  $scope.people = ["Nick", "Tyler", "Zach"];

  $scope.relationships = [
    { source: "Nick", target: "Tyler", relation: 2},
    { source: "Nick", target: "Zach", relation: 2}
  ];

  $scope.relationshipCodes = Relationships;

  $scope.add = function(name) {
    $scope.name = "";
    $scope.people.push(name);
  }

  $scope.remove = function(index) {
    $scope.people.splice(index, 1);
  }


});
