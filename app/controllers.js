angular.module('controllers', [])
.controller('test', function($scope, Genetic) {
  var people = [{ name: "Nick", ratings: { Zach: 2, Tyler: 2 } },
                { name: "Zach", ratings: {} },
                { name: "Tyler", ratings: {} }];
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
    
}).controller("geneticAlgorithm", function ($scope)
{

});
