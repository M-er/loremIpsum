<?php

use Slim\Http\Request;
use Slim\Http\Response;

// Routes
/**
 * Example GET route
 *
 * @param  \Psr\Http\Message\ServerRequestInterface $req  PSR7 request
 * @param  \Psr\Http\Message\ResponseInterface      $res  PSR7 response
 * @param  array                                    $args Route parameters
 *
 * @return \Psr\Http\Message\ResponseInterface
 */
$app->get('/hello/{name}', "saludador:hola");
//$app->get('/encripta/{psw}', "encriptador:encrypt");
$app->post('/login/', "logueador:login");
$app->post('/usuario/s', "usuario:save");
$app->delete('/usuarios/delete/{iduser}', "usuario:delete");
$app->put('/usuario/u', "usuario:update");
$app->get('/usuario/me', "usuario:getMe");
$app->get('/usuarios/all', "usuarios:getAll");
$app->get('/producto/{{id}}', "producto:getOne");
$app->get('/productos/all', "productos:getAll");
$app->get('/acciones/all', "logueador:getAcc");
$app->get('/institucional/all', "institucional:getAll");
$app->get('/session/', "sessionador:getSession");
