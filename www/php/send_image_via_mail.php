<?php

/*
*
* An example php that sends the created image to a mail address
*
*/

//get the base-64 from data
$base64_str = substr($_POST['base64_image'], strpos($_POST['base64_image'], ",")+1);

$to = 	$_POST['email'];//set here your receiving mail address
$subject = 	'Your rug design from the Hagley Museum'; //set here the mail subject
$bound_text = 	md5(date('r', time()));
$bound = 	"--".$bound_text."\r\n";
$bound_last = 	"--".$bound_text."--\r\n";

$headers = 	"From: mystoryrug@hagley.org\r\n";//set here the sending mail address
$headers .= 	"MIME-Version: 1.0\r\n"
  	."Content-Type: multipart/mixed; boundary=\"$bound_text\"";

$message .= 	"If you can see this MIME than your client doesn't accept MIME types!\r\n"
  	.$bound;

$message .= 	"Content-Type: text/html; charset=\"iso-8859-1\"\r\n"
  	."Content-Transfer-Encoding: 7bit\r\n\r\n"
  	."<h2>Your Custom Masterpiece</h2>\r\n 
    Thanks for completing your story using the Hagley Story Rug Application.
We'd love if you'd share it on social media and let others know about
your experience at the exhibit.
\r\n\r\n
Thanks,
\r\n\r\n
The Hagley Museum" //set here the mail text
  	.$bound;

$message .= 	"Content-Type: {\"application\octet-stream\"};\r\n name=\"mail_product.png\"\r\n"
  	."Content-Transfer-Encoding: base64\r\n"
  	."Content-disposition: attachment;\r\n filename=\"mail_product.png\"\r\n"
  	."\r\n"
  	.chunk_split($base64_str)
  	.$bound_last;

if(mail($to, $subject, $message, $headers))
{
     echo json_encode(1);
} else {
     echo json_encode(0);
}

?>