angular.module('services', [])
.service('Genetic', function() {
  var genetic;
  var people;

  this.init = function(pr) {
    genetic = Genetic.create();
    genetic.optimize = Genetic.Optimize.Maximize;
    genetic.select1 = Genetic.Select1.Tournament2;
    genetic.select2 = Genetic.Select2.Tournament2;

    genetic.seed = function() {
      return pr;
    }

    genetic.crossover = function(mother, father) {
      var fatherCut = [];
      var motherCut;
      var index = mother.length / 2;
      index = index.toFixed();

      motherCut = mother.splice(index, mother.length - index);

      for (var i=0; i < motherCut.length; i++) {
        for (var j=0; j < father.length; i++) {
          if (father[j] == motherCut[i]) {
            fatherCut.push(father.splice(j, 1));
          }
        }
        daughter = fatherCut.push(mother);
        son = father.push(motherCut);
      }

      return [son, daughter];
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
	    Console.log(JSON.strinify(pop[0].entity));
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
  }

  this.evolve = function() {
    genetic.evolve();
  }
})
.factory('GroupMember', function ()
{
  return function (name)
  {
      this.name = name;

      // Takes left and
      this.getPersonalFitness = function (memberOnRight)
      {
          if(memberOnRight)
              return relationships[this.relations[memberOnRight]];

          return 0;
      };

      this.relations = {};

      this.addRelation = function (level, member)
      {
          this.relations[member] = level;
      };
  };
})
.factory("Relationships", function ()
{
  var relationships = {
    "no relation": 0,
    "enemies": -1,
    "besties": 2,
    "aquantences": 1,
    "lovers": 3
  };
  return relationships;
});
