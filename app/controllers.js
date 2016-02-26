angular.module('controllers', [])
.controller("geneticAlgorithm", function ($scope, Genetic) {
  /*var chartData ={
    keys: {
      "mean": 0,
      "maximum":1,
      "minimum":2,
      "stdev":3
    },
    array: [['mean'],
      ['maximum'],
      ["minimum"],
      ["stdev"]
    ]
  } 
    
  var chart = c3.generate({
    bindto: '#chart',
    data: {
      columns: chartData.array
    }
  });*/

  var chartData = {
    labels: [0],
    datasets: [
        {
            label: "maximum",
            color: "rgba(255,0,0,0.2)",
            fillColor: "rgba(255,0,0,0.2)",
            strokeColor: "rgba(255,0,0,1)",
            pointColor: "rgba(255,0,0,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(255,0,0,1)",
            data: []
        },
        {
            label: "minimum",
            color: "rgba(151,187,205,1)",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: []
        },
        {
            label: "mean",
            color: "rgba(220,220,220,1)",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: []
        },
        {
            label: "stdev",
            color: "rgba(200, 200, 200,1)",
            fillColor: "rgba(200, 200, 200,0.2)",
            strokeColor: "rgba(200, 200, 200,1)",
            pointColor: "rgba(200, 200, 200,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(200, 200, 200,1)",
            data: []
        }
    ]
};

  var ctx = document.getElementById("chart").getContext("2d");
  var chart = new Chart(ctx).Line(chartData,{responsive: true,  datasetFill : false,
      legendTemplate : '<ul>'
                  +'<% for (var i=0; i<datasets.length; i++) { %>'
                    +'<li>'
                    +'<span style=\"background-color:<%=datasets[i].strokeColor%>\"></span>'
                    +'<% if (datasets[i].label) { %><%= datasets[i].label %><% } %>'
                  +'</li>'
                +'<% } %>'
              +'</ul>'
});
  document.getElementById("chartLegend").innerHTML = chart.generateLegend();
  $scope.best = Genetic.getPeople();
  
  Genetic.notify(function (best, gen, stats, isFinished)
  {
    var data = [];
    for(var i in stats)
      data.push(stats[i]);
    chart.addData(data, gen);
    $scope.best = best.entity;
    
  });

  Genetic.evolve();
}).controller("peopleController", function ($scope, Genetic, Relationships) {
  $scope.relationship = { source: "", target: "", relation: ""};
  $scope.people = ["Nick", "Tyler", "Zach"];

  $scope.relationships = [
    { source: "Nick", target: "Tyler", relation: 2},
    { source: "Nick", target: "Zach", relation: 2}
  ];

  $scope.algorithm = true;
  $scope.relationshipCodes = Relationships.getRelationships();
  $scope.getRelationship = Relationships.getRelationship;

  $scope.config = {
        "iterations": 200
        , "size": 250
        , "crossover": 0.3
        , "mutation": 0.3
        , "skip": 10
      };
  $scope.add = function(name) {
    $scope.name = "";
    $scope.people.push(name);
  }

  $scope.remove = function(index) {
    $scope.people.splice(index, 1);
  }

  $scope.addRelationship = function(relationship) {
    relationship.relation = parseInt(relationship.relation);
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

    Genetic.init(pr, $scope.algorithm, $scope.config);
    window.location.hash = "/generator";
  }
});
