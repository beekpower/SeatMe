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

      for (var i=0; i<chromosome.length; i++) {

        
      }
    }
  }
});
