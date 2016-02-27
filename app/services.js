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
  
  this.init = function(input, isUniform, conf) {
    config = conf;
    isUniform = isUniform || true;
    pr = input;
    genetic = Genetic.create();
    genetic.optimize = Genetic.Optimize.Maximize;
    genetic.select1 = Genetic.Select1.Tournament2;
    genetic.select2 = Genetic.Select2.Tournament2;

    genetic.seed = function() {
      return this.userData["data"];
    }

    var uniform = function(mother, father) {
      var fatherCut = [];
      var motherCut = [];
      var daughter;
      var son;
      var index = mother.length / 2;
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

    var otherOne = uniform;
    genetic.crossover = (isUniform) ? uniform : otherOne;

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

    genetic.fitness = function(chromosome) {
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
        "-1": { type: "Enemies", color: "#ff0000" },
        "1": { type: "Aquantences", color: "#777" },
        "2": { type: "Besties", color: "#444"},
        "3": { type: "Lovers", color: "#111" }
  };

  this.getRelationships = function() {
    return relationships;
  }

  this.getRelationship = function(input) {
    return relationships[input].type;
  }
});
})();
