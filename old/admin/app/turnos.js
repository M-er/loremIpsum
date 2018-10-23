var app = angular.module('turnoApp', ['ngMaterial', 'ngMessages']);
app.controller('turnoCtrl', function($scope, $timeout, $q, $log, $http, $mdToast) {
  $scope.turno = {};
  this.myDate = new Date();
  this.minDate = new Date(this.myDate.getFullYear(),this.myDate.getMonth() - 2,this.myDate.getDate()  );
  this.maxDate = new Date(this.myDate.getFullYear(),this.myDate.getMonth() + 2,this.myDate.getDate());
  this.restriccionesFecha = function(date) {
    var day = date.getDay();
    return day != 0 || day != 6;
  };


  $scope.clean = function(){
    $scope.turno = {};
  }
  $scope.guardar = function(){
    console.log("guardando: ");
    console.dir($scope.turno);
    $scope.tostado("Turno guardado, anda a entrenar", "success");
  }
  $scope.init = function() {
    console.log("Turnero APP");
    // var deferred;
    // deferred = $q.defer();
    // $http.get('api/productos/all').then( function(data){
    // 	var response = data['data'];
    // 	$scope.productos = response;
    // }).catch(function(resultado){
    // 	deferred.reject(resultado);
    // });
    // return deferred.promise;
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
