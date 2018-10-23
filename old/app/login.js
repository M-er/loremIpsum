var app = angular.module('loginApp', ['ngMaterial']);
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
})

app.controller('loginCtrl', function($scope, $mdToast, $timeout, $q, $log, $http, $window) {
  $scope.doLogin = function(usuario) {
    var deferred;
    deferred = $q.defer();
    $http.post('./admin/api/login/', usuario).then( function(data){
      var resul = data['data'];
      $scope.tostado(resul['message'], resul['status']);
      if(resul['status'] == 'success'){
        setTimeout(function(){
          $window.location.href = './admin/index.html';}, 1500);
        }
        deferred.resolve(data);
      }).catch(function(resultado){
        deferred.reject(resultado);
      });
      return deferred.promise;
    };
    $scope.clean = function(){
      $scope.login.username = "";
      $scope.login.password = "";
    }
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
    $('#password').keypress(function(e){
      if(e.keyCode==13) $('#btnLogin').click();
    });
    init();
  });
  function init(){
    console.log("login.html");
  }
