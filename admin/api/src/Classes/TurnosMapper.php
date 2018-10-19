<?php
namespace App;
/**
*
Clase TurnoMapper
Es un conjunto de turnos
*
**/
class TurnoMapper extends Mapper
{
	public function getAll( $request,  $response, array $args ) {
		$sess = Session::loggedInfo();
		$db = DBHandler::getHandler();
		$query = "Select * from user";
		$resultado = $db->getAllRecords($query);
		return $response->withJson($resultado);
	}
}
