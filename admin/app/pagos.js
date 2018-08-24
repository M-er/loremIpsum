angular.module('pagosApp', ['ngMaterial'])

.config(['$mdThemingProvider', function ($mdThemingProvider) {
  'use strict';
  $mdThemingProvider.theme('default')
  .primaryPalette('blue');
}])
.controller('pagosCtrl', function($scope,$q, $log, $http){
  $scope.init = function(){
    console.log("Inicializado pagos")
  }
});
$(document).ready(function() {
  init();
});

function init() {
  $(".active").removeClass('active');

}
