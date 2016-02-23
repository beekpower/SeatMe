angular.module('services', [])
.service('Genetic', function() {
  var genetic;
  var ratings;
  var people;

  this.init = function(p, r) {
    ratings = r;
    people = p;

    genetic = Genetic.create();
    genetic.optimize = Genetic.Optimize.Maximize;
    genetic.select1 = Genetic.Select1.Tournament2;
    genetic.select2 = Genetic.Select2.Tournament2;

    genetic.seed = function() {

    }

    genetic.fitness = function(chromosome) {
      var fitness = 0;

      for (var i=1; i<chromosome.length; i++) {
        if (ratings[chromosome[i]]) {

        }
        fitness += rati
      }
    }
  }
});
