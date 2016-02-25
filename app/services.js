angular.module('services', [])
.service('Genetic', function() {
  var genetic;
  var people;

  this.init = function(p) {
    people = p;

    genetic = Genetic.create();
    genetic.optimize = Genetic.Optimize.Maximize;
    genetic.select1 = Genetic.Select1.Tournament2;
    genetic.select2 = Genetic.Select2.Tournament2;

    genetic.seed = function() {
      return people;
    }

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
