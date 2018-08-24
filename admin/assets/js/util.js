$(document).ready(function () {
	init();
});
function init(){
	$.ajax({
		type: "get",
		data: {},
		url: "../api/checkusuario",
		dataType: 'json',
		cache: false,
		success: function(datos, textStatus, jqXHR) {
			if(datos['status']=='error'){
				swal("Error","Usted no ingreso al sistema...","error");
				setTimeout(function () {
					window.location.href = "../../index.html";
				}, 2000);
			}
		},error: function(xhr, ajaxOptions, thrownError){
			swal("Error","Usted no ingreso al sistema...","error");
			setTimeout(function () {
				window.location.href = "../../index.html";
			}, 2000);
		}

	});
}
function salir(){
	$.ajax({
		type: 'GET',
		url: "../api/logout",
		dataType: "json", 
		success:  function(data, textStatus, jqXHR){
			window.location.replace("../../index.html");
		}
	});
}