<?php
namespace App;
/**
*
 Clase Login para ingreso o salida del sistema
*
**/
class Login
{

	public function __construct($logger) {$this->logger = $logger;}
	function getAcc($request, $response, array $args){
		$sess = Session::loggedInfo();
		$fh = fopen('./logs/app.log','r');
		while ($line = fgets($fh)) {
			$acciones[] = $line;
		}
		fclose($fh);
		$rta['acciones'] = $acciones;
		$rta['status'] = 'success';
		return $response->withJson($rta);
	}
	/* Login real */
	function login( $request, $response, array $args ){
		$conn = new DBHandler();
		$usuario = $request->getParsedBody();
		$username = $usuario['username'];
		$password = $usuario['password'];
		$query = "SELECT `index`, `id`, `username`, `password`, `email`, `type` FROM user WHERE username = '$username'";
		$user = $conn->getOneRecord($query);
		if ($user != NULL) {
			if(PasswordHash::check_password($user['password'],$password)){
				$rta['status'] = "success";
				$rta['message'] = 'Ha ingresado correctamente';
				$this->logger->addInfo("Ingreso | ".$username);
				$rta['nombuser'] = $user['username'];
				$rta['iduser'] = $user['id'];
				$rta['tipouser'] = $user['type'];
				if (!isset($_SESSION)) {
					session_start();
				}
				$_SESSION['iduser'] = $user['id'];
				$_SESSION['nombuser'] = $user['username'];
			} else {
				$rta['status'] = "error";
				$rta['message'] = 'Error de inicio de sesion. Credenciales incorrectas';
			}

		}else {
			$rta['status'] = "error";
			$rta['message'] = 'Usuario no registrado.';
		}
		return $response->withJson($rta);
	}
	/* Login Patacones
	function login( $request, $response, array $args ){
		$todo = $request->getParsedBody();
		$username = $todo['username'];
		$password = $todo['password'];
		if ($username != NULL) {
			if($username == 'test' && $password == 'test'){
				$rta['status'] = "success";
				$rta['message'] = 'Ha ingresado correctamente';
				$this->logger->addInfo("Ingreso | ".$username);
				$rta['nombuser'] = $user['nombuser'];
				$rta['iduser'] = $user['iduser'];
				$rta['tipouser'] = $user['tipouser'];
				if (!isset($_SESSION)) {
					session_start();
				}
				$_SESSION['iduser'] = $user['iduser'];
				$_SESSION['nombuser'] = $user['nombuser'];
			} else {
				$rta['status'] = "error";
				$rta['message'] = 'Error de inicio de sesion. Credenciales incorrectas';
			}

		}else {
			$rta['status'] = "error";
			$rta['message'] = 'Usuario no registrado.';
		}
		return $response->withJson($rta);
	}
	*/
}
?>
