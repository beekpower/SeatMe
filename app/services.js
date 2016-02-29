(function ()
{
angular.module('services', [])
.service('Genetic', function() {
  var genetic;
  var pr;
  var config;

  this.getPeople = function ()
  {
    return pr;
  };

  this.init = function(input, algorithm, conf, fitnessAlg) {
    config = conf;
    pr = input;
    genetic = Genetic.create();
    genetic.optimize = Genetic.Optimize.Maximize;
    genetic.select1 = Genetic.Select1.Tournament2;
    genetic.select2 = Genetic.Select2.Tournament2;

    genetic.seed = function() {
      return this.userData["data"];
    }

    var fitnessTwo = function (chromosome)
    {
        var fitness = 0;
        for (var i=0; i < chromosome.length -1; i++)
        {
           for (var person in chromosome[i].relationships)
           {
              if (person == chromosome[i+1].name) {
                fitness += chromosome[i].relationships[person] * 2;
              }

              if (i < chromosome.length -2){
                if (person == chromosome[i+2].name) {
                  fitness += chromosome[i].relationships[person];
                }
              }

           }
        }
        return fitness;
    };

    var fitnessOne = function(chromosome) {
      var fitness = 0;
      for (var i=0; i<chromosome.length - 1; i++) {
        for (var person in chromosome[i].relationships) {
          if (person == chromosome[i+1].name) {
            fitness += chromosome[i].relationships[person];
            break;
          }
        }
      }
      return fitness;
    }

    var singlePoint = function(mother, father) {
      var fatherCut = [];
      var motherCut = [];
      var daughter;
      var son;
      var index = (Math.random() * (mother.length - 1)) + 1;
      index = parseInt(index);
      motherCut = mother.splice(index, mother.length - index + 1);
      for (var i=0; i < motherCut.length; i++) {
        for (var j=0; j < father.length; j++) {
          if (father[j].name == motherCut[i].name) {
            fatherCut = fatherCut.concat(father.splice(j, 1));
          }
        }
        daughter = fatherCut.concat(mother);
        son = father.concat(motherCut);
      }

      return [son, daughter];
    }

    var uniform = function(mother, father) {
      var son = [];
      var daughter = [];

      while (father.length > 0) {
        var slicePoint = (Math.random() * (father.length - 1)) + 1;
        var slicedGenes = father.splice(0, slicePoint);

        daughter = slicedGenes.concat(daughter);

        for (var i=0; i < slicedGenes.length; i++) {
          for (var j=0; j < mother.length; j++) {
            if (mother[j].name == slicedGenes[i].name) {
              son = son.concat(mother.splice(j, 1));
            }
          }
        }
      }
      return [son, daughter];
    }

    if (algorithm == 0) {
      genetic.crossover = singlePoint;
    } else {
      genetic.crossover = uniform;
    }

    if (fitnessAlg == 0) {
      genetic.fitness = fitnessOne;
    } else {
      genetic.fitness = fitnessTwo;
    }

    genetic.mutate = function(chromosome) {
      var first = Math.floor(Math.random() * chromosome.length);
      var second = Math.floor(Math.random() * chromosome.length);


      while (first == second) {
        second = Math.floor(Math.random() * chromosome.length);
      }

      var temp = chromosome[first];
      chromosome[first] = chromosome[second];
      chromosome[second] = temp;

      return chromosome;
    }

    genetic.generation = function(pop, generation, stats) {
      // stop running once we've reached the solution
      return true;
    };






  };





  this.evolve = function() {

      var userData = {
      	"data": pr
      };
      genetic.evolve(config, userData);
  }

  this.notify = function (callback)
  {
    genetic.notification = function(pop, generation, stats, isFinished) {
      var best = pop[0];
      return callback(best, generation, stats, isFinished);
    };
  }
})
.service("Relationships", function() {
  var relationships = {
        "-1": { type: "Enemies", color: "red" },
        "1": { type: "Aquantences", color: "#ffe366" },
        "2": { type: "Friends", color: "blue" },
        "3": { type: "Besties", color: "green"},
        "4": { type: "Lovers", color: "#ff00c8" }
  };

  this.getRelationships = function() {
    return relationships;
  }

  this.getRelationship = function(input) {
    return relationships[input].type;
  }

  this.getColor = function(input) {
    return relationships[input].color;
  }
});
})();
