<?php
// DIC configuration
$container = $app->getContainer();
$container['logger'] = function ($c) {
	$settings = $c->get('settings')['logger'];
	$logger = new Monolog\Logger($settings['name']);
	$logger->pushProcessor(new Monolog\Processor\UidProcessor());
	//$logger->pushHandler(new Monolog\Handler\StreamHandler($settings['path'], $settings['level']));
	foreach ($settings['type'] as $elTipo) {
		$logger->pushHandler(new Monolog\Handler\StreamHandler($elTipo['path'], $elTipo['level']));
	}
	return $logger;
};
$container['turno'] = function ($c) {$turnos = new App\Turno($c['logger']);return $turnos;};
$container['usuario'] = function ($c) {$user = new App\User($c['logger']);return $user;};
$container['turnero'] = function ($c) {$turnos = new App\TurnosMapper($c['logger']);return $turnos;};
$container['usuarios'] = function ($c) {$users = new App\UserMapper($c['logger']);return $users;};
$container['saludador'] = function ($c) {$saludador = new App\Saludador($c['logger']);return $saludador;};
$container['logueador'] = function ($c) {$loguea = new App\Login($c['logger']);return $loguea;};
$container['maileador'] = function ($c) { $maileador = new App\Mailer($c['logger']);return $maileador; };
$container['sessionador'] = function ($c) {$session = new App\Session($c['logger']);return $session;};
$container['encriptador'] = function ($c) {$loguea = new App\PasswordHash($c['logger']);return $loguea;};
