<?php

require "bootstrup.php";

//use src\classes\Constants;
use src\classes\DBconnection;
//use log\Logger;
use src\classes\Services;

$dbObj = new DBconnection();
//$dbObj1 = new DBconnection();


$arr = Services::getRewardsIdDemo(122900, $dbObj,"2016-04-04 15:20:20");
//$arr = Services::$REWARDS;
//   $clbObj = Services::getMerchantName("e089ce34e789144bf805108eeb35a219");
//    $sql = $clbObj->getRs();
//    $rs = $dbObj->query($sql);
//    $tt = $rs->fetch_assoc();
//    var_dump($tt);
$arr_arr = json_decode($arr);
//echo '<pre>';print_r($arr_arr);


//$date = date('Y-m-d H:i:s');
//echo $date."<br>";
//$exp = "2016-04-04 21:00:00";
//
//if (strtotime($exp) > strtotime($date)) {
//    echo "Expected date is greater then current date";
//    return;
//} else {
//    echo "Expected date is lesser then current date";
//}



//$date1 = date('Y-m-d');
//$dates = explode(" ", $date);
//if($dates[0]=== $date1){
//    echo "false";
//}else{
//    echo "true";
//}
echo "<pre>";print_r($arr_arr);
exit;

//getReward('', 122900, $dbObj)
//
//$rst = array();
//
//$rst['allemails'] = $emails;
//$rst['valcode'] = $valcode;
//$rst['name'] = $name;
//echo '<pre>'; print_r($arr);
//echo '<pre>'; print_r($tot);
//$sCouponId = filter_input_array(INPUT_POST);

$code = '3333-1111';

//$config_ini = parse_ini_file(Constants::CONFIG_URL, true);
//$config = $config_ini['logger'];
//$server = $config['serverURL'];
//if ($code !== "" && $code !== null) {
//
//    $dbObj = new DBconnection();  
//
//    $row = Services::redeemReward($code, $dbObj);
//    
//    if ($row == 0) {
//        $log = new Logger(Constants::LOG_URL . 'businesslog.txt');
//        $log->log_start();
//        $log->log_message($code." redeeming is failed coupon code is not" . PHP_EOL." in the system!");
//        $log->log_end();
//    }
//    elseif ($row == 1) {
//        $log = new Logger(Constants::LOG_URL . 'businesslog.txt');
//        $log->log_start();
//        $log->log_message($code." has been redeemed!!!!");
//        $log->log_end();
//    }
//    echo Constants::LOG_URL;
//}
exit();
