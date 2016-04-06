<?php
require "bootstrup.php";
//use src\classes\Constants;
use src\classes\DBconnection;
use src\classes\Services;
//use log\Logger;

$mURL_ID = filter_input_array(INPUT_POST);
$couponId = $mURL_ID['couponcode'];
$busId = $mURL_ID['businessId'];

if($couponId !==''){
  $dbObj = new DBconnection();  
    $lastRdm = Services::getLastRedeemtion($busId, $couponId, $dbObj);
    echo $lastRdm;
}
exit;
