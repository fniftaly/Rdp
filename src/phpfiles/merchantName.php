<?php
require "bootstrup.php";
use src\classes\Constants;
use src\classes\DBconnection;
use src\classes\Services;
use log\Logger;

$mURL_ID = filter_input_array(INPUT_POST);
$mID = $mURL_ID['merchant_id'];
$config_ini = parse_ini_file(Constants::CONFIG_URL, true);
$config = $config_ini['logger'];
$server = $config['serverURL'];
$token = $config['tokenLength'];
//echo $mID;
//exit;
if (strlen($mID) == $token) {
    $dbObj = new DBconnection();
    $clbObj = Services::getMerchantName($mID);
    $sql = $clbObj->getRs();
    $rs = $dbObj->query($sql);
    $tt = $rs->fetch_assoc();
    echo json_encode($tt);
    $log = new Logger(Constants::LOG_URL . 'businesslog.txt');
    $log->log_start();
    $log->log_message('Merchant ' . $mID . ' is connected');
    $log->log_end();
    exit();
} elseif ((strlen($mID) > $token || strlen($mID) < $token) && strlen($mID) != 0) {
    $log = new Logger(Constants::LOG_URL . 'businesslog.txt');
    $log->log_start();
    $log->log_message('Merchant ' . $mID . ' is not available!');
    $log->log_end();
    echo "NO CONNECTION";
} elseif (strlen($mID) == 0) {
    $log = new Logger(Constants::LOG_URL . 'businesslog.txt');
    $log->log_start();
    $log->log_message('Merchant ID is not attached to URL: error:500');
    $log->log_end();
    echo "ERROR 500";
}

exit();



