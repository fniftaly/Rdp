<?php
require "bootstrup.php";

use src\classes\Constants;
use src\classes\DBconnection;
use src\classes\Services;
use log\Logger;

$sCouponId = filter_input_array(INPUT_POST);

$code = $sCouponId['code'];

if ($code !== "" && $code !== null) {

    $dbObj = new DBconnection();  

    $row = Services::redeemReward($code, $dbObj);
    
    if ($row == 0) {
        $log = new Logger(Constants::LOG_URL . 'businesslog.txt');
        $log->log_start();
        $log->log_message($code." redeeming is failed coupon code is not" . PHP_EOL." in the system!");
        $log->log_end();
    }
    elseif ($row == 1) {
        $log = new Logger(Constants::LOG_URL . 'businesslog.txt');
        $log->log_start();
        $log->log_message($code." has been redeemed!!!!");
        $log->log_end();
    }
    echo $row;
}
exit();
