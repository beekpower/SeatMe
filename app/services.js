angular.module('services', [])
.service('Genetic', function() {
  var genetic = Genetic.create();
  genetic.optimize = Genetic.Optimize.Maximize;
  genetic.select1 = Genetic.Select1.Tournament2;
  genetic.select2 = Genetic.Select2.Tournament2;

  this.init = function() {

  }
});
