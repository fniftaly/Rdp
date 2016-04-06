<?php

require "bootstrup.php";

use src\classes\Constants;
use src\classes\DBconnection;
use src\classes\Services;
use log\Logger;

$mURL_ID = filter_input_array(INPUT_POST);
$bID = $mURL_ID['businessId'];
$clientTime = $mURL_ID['clientTime'];
if ($bID != '') {
    $dbObj = new DBconnection();
    $clbObj = Services::getRewardsId($bID, $dbObj,$clientTime);
    if ($clbObj != NULL) {
        
        echo $clbObj;
        
    } else {
        echo "NODATA";
        $log = new Logger(Constants::LOG_URL . 'businesslog.txt');
        $log->log_start();
        $log->log_message('There is no data selected for business: ' . $bID);
        $log->log_end();
    }
}
exit();
