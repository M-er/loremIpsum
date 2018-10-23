var app = angular.module('misTurnosApp', ['ngMaterial', 'ngMessages']);
app.controller('misTurnosCtrl', function($scope, $timeout, $q, $log, $http, $mdToast) {
  $scope.turnos = [];
  $scope.init = function() {
    console.log("Turnero APP");
    var deferred;
    deferred = $q.defer();
    $http.get('api/turnos/propios').then( function(data){
      // $scope.tostado("Turnos traidos", "danger");
      var response = data['data']['actividades'];
    	$scope.turnos = response;
    }).catch(function(resultado){
    	deferred.reject(resultado);
    });
    return deferred.promise;
  };
  $scope.closeToast = function() {
    $mdToast.hide();
  };
  $scope.tostado = function(texto,tipo) {
    $mdToast.show(
      $mdToast.simple()
      .toastClass('md-toast-'+tipo)
      .textContent(texto)
      .position('bottom left')
      .hideDelay(3000)
    );
  };
});

$(document).ready(function() {
  console.log("Inicializando turnero");

});
