angular.module('dashApp', ['ngMaterial'])

.config(['$mdThemingProvider', function ($mdThemingProvider) {
  'use strict';
  $mdThemingProvider.theme('default')
  .primaryPalette('blue');
}])
.controller('dashCtrl', function($scope,$q, $log, $http){
  $scope.init = function(){
    console.log("Inicializado dash")
  }
});
$(document).ready(function() {
  init();
});

function init() {
  $(".active").removeClass('active');

}
