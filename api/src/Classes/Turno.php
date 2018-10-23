<?php
namespace App;
/**
*
Clase Turnos para administrar los turnos
*
**/
class Turno{
	public function __construct($logger) {$this->logger = $logger;}
	function getMine($request, $response, array $args){
		$sess = Session::loggedInfo();
		$actividades = array(
			array("actividad"=> "judo", "lugar" => "Fuego Interno", "fechaDia"=> "Martes", "fechaMes" => "Oct", "fechaDiaN" => 18, "anio" => 2018 ,"horario"=> 1530,"turno"=> 2),
			array("actividad"=> "funcional", "lugar" => "Fuego Interno", "fechaDia"=> "Martes", "fechaMes" => "Oct", "fechaDiaN" => 18, "anio" => 2018 ,"horario"=> 1530,"turno"=> 2),
			array("actividad"=> "crossfit", "lugar" => "Fuego Interno", "fechaDia"=> " Lunes", "fechaMes" => "Nov", "fechaDiaN" => 19, "anio" =>  2018 ,"horario"=> 1030,"turno"=> 1),
			array("actividad"=> "funcional", "lugar" => "Fuego Interno", "fechaDia"=> "Sabado", "fechaMes" => "Nov", "fechaDiaN" => 21, "anio" => 2018 ,"horario"=> 1930,"turno"=> 3),
			array("actividad"=> "funcional", "lugar" => "Fuego Interno", "fechaDia"=> "Martes", "fechaMes" => "Oct", "fechaDiaN" => 18, "anio" => 2018 ,"horario"=> 1530,"turno"=> 2),
			array("actividad"=> "funcional", "lugar" => "Fuego Interno", "fechaDia"=> "Jueves", "fechaMes" => "Nov", "fechaDiaN" => 21, "anio" => 2018 ,"horario"=> 1930,"turno"=> 3),
			array("actividad"=> "crossfit", "lugar" => "Fuego Interno", "fechaDia"=> " Viernes", "fechaMes" => "Nov", "fechaDiaN" => 19, "anio" =>  2018 ,"horario"=> 1030,"turno"=> 1),
			array("actividad"=> "funcional", "lugar" => "Fuego Interno", "fechaDia"=> "Miercoles", "fechaMes" => "Nov", "fechaDiaN" => 21, "anio" => 2018 ,"horario"=> 1930,"turno"=> 3),
			array("actividad"=> "crossfit", "lugar" => "Fuego Interno", "fechaDia"=> " Miercoles", "fechaMes" => "Nov", "fechaDiaN" => 19, "anio" =>  2018 ,"horario"=> 1030,"turno"=> 1)
		);
		$rta['actividades'] = $actividades;
		$rta['status'] = 'success';
		return $response->withJson($rta);
	}
}
?>
