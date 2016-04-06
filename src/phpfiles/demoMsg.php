<?php
error_reporting(-1);
ini_set('display_errors', 'On');
set_error_handler("var_dump");

//error_reporting(E_ALL);
//ini_set('display_errors', '1');
//ini_set("SMTP","localhost:8889");
//ini_set("smtp_port","25");
//ini_set( 'sendmail_from', 'any@example.com' );



$to = "atbulag@yahoo.com";
$from = "atbulag@yahoo.com";
$subject = "Demo Subject";

$headers = "From: $from\r\n";
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= "Content-type: text/html; charset=iso-8859-1\r\n";
$headers .= "X-Mailer: PHP \r\n";


$message = <<<EOF
<html>
   <body style='margin:auto'>
        <p style='height:50px; color:lightblue;'>Topic</p>
        <table>
            <tr><td colspan='2'></td>To day</tr>
            <tr><td>New Customer</td><td>2</td></tr>
            <tr><td colspan='2'></td>Yesterday</tr>
            <tr><td>New Customer</td><td>0</td></tr>
        </table>
   </body>
</html>
EOF;
echo 'Message is sending:</br>'.date('m-d-Y H:i:s')."<br>";

mail($to, $subject, $message, $headers);

echo 'Message has been send:ABC';

