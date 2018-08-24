var app = angular.module('busquedaApp', ['ngMaterial']);

app.config(['$mdThemingProvider', function ($mdThemingProvider) {
	'use strict';
	$mdThemingProvider.theme('default')
	.primaryPalette('blue');
}])
app.directive('chooseFile', function() {
	return {
		link: function (scope, elem, attrs) {
			var button = (elem.find('#attachButton'));
			var input = angular.element(elem[0].querySelector('input#fileInput'));
			button.bind('click', function() {
				input[0].click();
			});
			input.bind('change', function(e) {
				scope.$apply(function() {
					var files = e.target.files;
					if (files[0]) {
						scope.sube = true;
						scope.fileName = files[0].name;
						scope.theFile = files[0];
					} else {
						scope.fileName = null;
					}
				});
			});
		}
	};
})
/*
app.service('fileUploadService', function ($scope, $http, $q) {

})

*/
app.controller('busquedaCtrl', function ($scope, $mdToast, $timeout, $q, $log, $http) {
  //$scope.loadAll();
  $scope.closeToast = function() {$mdToast.hide();};
  $scope.tostado = function(texto,tipo) {
  	$mdToast.show(
  		$mdToast.simple()
  		.toastClass('md-toast-'+tipo)
  		.textContent(texto)
  		.position('bottom left')
  		.hideDelay(3000)
  		);
  };
  $scope.selectedUser = "";
  $scope.isDisabled = false;
  $scope.querySearch = [];
  //$scope.querySearch = $scope.querySearch;
  $scope.selectedItemChange = [];
  //$scope.selectedItemChange = $scope.selectedItemChange;
  $scope.searchTextChange   = [];
  //$scope.searchTextChange   = $scope.searchTextChange;
  $scope.loadAll = function(){
  	var deferred;
  	deferred = $q.defer();
  	$http.get("http://rubricadigital.ssn.gob.ar/api/api/generics/getcompanias").then( function(resultado){   
  		$scope.companias = resultado['data'];
  		deferred.resolve(resultado);
  	}
  	).catch(function(resultado){
  		deferred.reject(resultado);
  	});
  	return deferred.promise;
  }
  $scope.querySearch = function(query) {
  	var deferred;
  	deferred = $q.defer();

  	$http.get('../api/registros/busca/'+query).then( function(resultado){
  		deferred.resolve( resultado['data']['data'] );
  	}
  	).catch(function(resultado){
  		deferred.reject(resultado);
  	});
  	return deferred.promise;
  }
  $scope.searchTextChange = function(text) {}
  $scope.selectedItemChange = function(item) {
  	if(item && $scope.companias){
  		var quiero = parseInt(item.ciaID);
  		var tengo = "";
  		var sigo = true;
  		for(var j=0; j<$scope.companias.length && sigo; j++){
  			tengo = parseInt($scope.companias[j].CompaniaId);
  			if(tengo == quiero){
  				sigo = false;
  				selectedUser = item;
  				selectedUser.ciaTxt = $scope.companias[j].Denominacion;
  			}
  		}
  	}
  }
})
app.controller('uploadCtrl', function($scope,$q, $mdToast, $log, $http){
	$scope.sube = false;
	$scope.refresh = function(){
		$scope.sube = false;
		$scope.fileName = null;
		$scope.theFile = null;
	}
	$scope.closeToast = function() {$mdToast.hide();};
	$scope.tostado = function(texto,tipo) {
		$mdToast.show(
			$mdToast.simple()
			.toastClass('md-toast-'+tipo)
			.textContent(texto)
			.position('bottom left')
			.hideDelay(3000)
			);
	};

	$scope.upload = function(){
		var fileFormData = new FormData();
		var file = $scope.theFile;
		fileFormData.append('archxml', file);
		var deferred = $q.defer();

		$http.post('../co/cargaxml.php', fileFormData, {transformRequest: angular.identity,headers: {'Content-Type': undefined}})
		.then(function(data) {
      
      var rta = data['data']
      $scope.tostado(rta['message'],rta['status']);
      deferred.resolve(data)
    })
		.catch(function(resultado){
      deferred.reject(resultado);
    });
		return deferred.promise;
	}
});
$(document).ready(function() {
	init();
});

function init() {
	$(".active").removeClass('active');
	$("#aalumnos").addClass("active");
}
