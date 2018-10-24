<?php
namespace App;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
/**
*
Clase Mailer para envio de mails de contacto
*
**/
class Mailer
{

	public function __construct($logger) {$this->logger = $logger;}

	function mail( $request, $response, array $args ){
		$todo = $request->getParsedBody();
		$mail = new PHPMailer;
		//Server settings
		$mail->SMTPDebug = 2;                                 // Enable verbose debug output
		$mail->isSMTP();                                      // Set mailer to use SMTP
		$mail->Host = 'smtp.gmail.com';		  									// Specify main and backup SMTP servers
		$mail->SMTPAuth = true;                               // Enable SMTP authentication
		$mail->Username = 'mattusrivas@gmail.com';            // SMTP username
		$mail->Password = 'alohomora90';                      // SMTP password
		$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
		$mail->Port = 587;                                    // TCP port to connect to
		//Recipients
		$mail->setFrom('mattusrivas@gmail.com');
		$mail->addAddress('mattusrivas@gmail.com', 'My Friend');
		$mail->Subject  = 'Mensaje del sitio buho turnos';
		$mail->Body     = 'Codigo de autenticación: 123';
		if(!$mail->send()) { echo "Mailer Error: " . $mail->ErrorInfo;}
		else { echo "Message has been sent successfully";}

	}
}
?>
