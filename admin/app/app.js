// define application
angular.module("crudApp", [])
.filter('mesNombre', [function() {
	return function (numeroMes) {
		var nombresMes = [ 'Enero','Febrero','Marzo','Abril','mMayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre' ];
		return nombresMes[numeroMes - 1];
	}
}])
.controller("userController", function($scope,$http){
	$scope.users = [];
	$scope.pagos = [];
	$scope.alumnos = [];
	$scope.tempUserData = {};
	$scope.data = { selected: 'None' };
	$scope.getRecords = function(){
		$http.get('action.php', {
			params:{
				'type':'view'
			}
		}).success(function(response){
			if(response.status == 'OK'){
				$scope.alumnos = response.alumnos;
				$scope.users = response.usuarios;
				$scope.pagos = response.pagos;
			}
		});
	};
    // function to insert or update user data to the database
    $scope.saveUser = function(type){
    	var data = $.param({
    		'data':$scope.tempUserData,
    		'type':type
    	});
    	var config = {
    		headers : {
    			'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
    		}
    	};
    	$http.post("action.php", data, config).success(function(response){
    		if(response.status == 'OK'){
    			if(type == 'edit'){
    				$scope.users[$scope.index].id = $scope.tempUserData.id;
    				$scope.users[$scope.index].nombre = $scope.tempUserData.nombre;
    				$scope.users[$scope.index].apellido = $scope.tempUserData.apellido;
    				$scope.users[$scope.index].email = $scope.tempUserData.email;
    				$scope.users[$scope.index].telefono = $scope.tempUserData.telefono;
    				$scope.users[$scope.index].creado = $scope.tempUserData.creado;
    			}else{
    				$scope.usuarios.push({
    					id:response.data.id,
    					nombre:response.data.nombre,
    					apellido:response.data.apellido,
    					email:response.data.email,
    					telefono:response.data.telefono,
    					creado:response.data.creado
    				});

    			}
    			$scope.userForm.$setPristine();
    			$scope.tempUserData = {};
					$('#add_new_user_modal').modal('hide');
    			$scope.messageSuccess(response.msg);
    		}else{
    			$scope.messageError(response.msg);
    		}
    	});
    };
		// function to insert or update user payment to the database
		$scope.savePayment = function(type){
			var datos = {"mespago":$scope.tempPayData.mespago, "alumno_id": $scope.tempPayData.alumno.id, "observacion": $scope.tempPayData.observacion};
			var data = $.param({
				'data':datos,
				'type':type
			});
			var config = {
				headers : {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			$http.post("action.php", data, config).success(function(response){
				if(response.status == 'OK'){
					if(type == 'edit'){
					//Workit bitch
					}else{
						$scope.pagos.push({
							alumno_id:response.data.alumno_id,
							mespago:response.data.mespago,
							observacion:response.data.observacion
						});

					}
					$scope.tempPayData = {};
					$('#add_new_payment_modal').modal('hide');
					$scope.messageSuccess(response.msg);
				}else{
					$scope.messageError(response.msg);
				}
			});
		};

		// function to add payment data
		$scope.addPayment = function(){
			$scope.savePayment('add');
		};
    // function to add user data
    $scope.addUser = function(){
    	$scope.saveUser('add');
    };

    // function to edit user data
    $scope.editUser = function(user){
    	$scope.tempUserData = {
    		id:user.id,
    		nombre:user.nombre,
    		apellido:user.apellido,
    		email:user.email,
    		telefono:user.telefono
			};
    	$scope.index = $scope.users.indexOf(user);
			$('#add_new_user_modal').modal('hide');
    };

    // function to update user data
    $scope.updateUser = function(){
    	$scope.saveUser('edit');
    };

    // function to delete user data from the database
    $scope.deleteUser = function(user){
    	var conf = confirm('Are you sure to delete the user?');
    	if(conf === true){
    		var data = $.param({
    			'id': user.id,
    			'type':'delete'
    		});
    		var config = {
    			headers : {
    				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
    			}
    		};
    		$http.post("action.php",data,config).success(function(response){
    			if(response.status == 'OK'){
    				var index = $scope.users.indexOf(user);
    				$scope.users.splice(index,1);
    				$scope.messageSuccess(response.msg);
    			}else{
    				$scope.messageError(response.msg);
    			}
    		});
    	}
    };

    // function to display success message
    $scope.messageSuccess = function(msg){
    	$('.alert-success > p').html(msg);
    	$('.alert-success').show();
    	$('.alert-success').delay(5000).slideUp(function(){
    		$('.alert-success > p').html('');
    	});
    };

    // function to display error message
    $scope.messageError = function(msg){
    	$('.alert-danger > p').html(msg);
    	$('.alert-danger').show();
    	$('.alert-danger').delay(5000).slideUp(function(){
    		$('.alert-danger > p').html('');
    	});
    };
});
