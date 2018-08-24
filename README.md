# adaptiveIpsum
Bien el sitio se llama Adaptive Ipsum, es algo adaptativo.
Por ahora tiene un fully working login. 
**SLIM v3 **/**
Para inicializar todo, lo que suelo hacer es inicializar el ESQUELETO de SLIM en mi aplicación.
Es decir, voy a donde quiero mi app y hago: 
	php composer.phar create-project slim/slim-skeleton [carpeta donde va a estar contenido]
Si te olvidas el comando, googlea slim v3 skeleton y aparece. Esto crea lo que en este proyecto se llama "api"
Una vez inicializado, lo que YO hago, es copiar de api/public index.php y .htaccess al root de api (/api/)
Y cambio los "../" por "./" del index.php (Ya que ahora no está en /api/public, sino en /api)
Esto lo hago para no renegar cambiando el .htaccess hacia /api/public.

.htaccess : Tomar el formato provisto por el mismo que se encuentra aqui, cambiando el RewriteBase por el del sistema que estes (Acordate, es FULL path, no es relativo, sino absoluto)

Luego de acomodar .htaccess y index.php debería andar el slim, si no anda, acordate de mirar tu apache.conf para ver si permitis mirar otros .htaccess, creo que esta en <Directory /> o algo asi, sino san google sabe :D

Carpeta ./api/src : Por ahora le estoy dando bola a dependencies.php, routes.php y settings.php
	*dependencies.php : Se inicializan los "contenedores" a ser utilizados por las rutas. Lo unico interesante de todo ese codigo, es el "logger", que es como suena, un logueador (viene del modulo "Monolog") cuyos parametros se encuentran simplemente desciptos en settings.php.
	Entonces, en dependencies.php creo todos los contenedores, y referencio a App/miclase
	*routes.php : Si adivinaste, aca están las rutas. 
		Se usan: POST, GET, PUT, DELETE. Put y delete son en escencia POST, ya que mandan los parametros después, y se usan para hacer insert y deletes respectivamente. Se podría usar solo GET y POST? SI por supuesto, pero estudiando la filosofía REST vemos que esos son los protocolos usados (https://en.wikipedia.org/wiki/Representational_state_transfer)
		Notar que usamos contenedores para llamar a las funciones de cada clase.
		EJ: routes.php #linea 16 -> $app->get('/hello/{name}', "saludador:hola");
		Recibe ruta /hello/{parametro} por GET, y llama al contenedor saludador definido en dependencies.php que lo redirige a la clase ./api/src/Classes/Saludador.php y a su función hola()
		/*
Ahora entrando en Classes, es php simple OO. Notar el:
	namespace App;
	use PDO;
De cada clase, PDO es un manejador de BD MYSQL y namespace es propio del PHP. 
Luego nada mas relevante, solo que mires DB.php y DBHandler.php para saber que funciones utilizar, pero nada mas que eso.

Cualquier duda, estamos en contacto.

