<?php
require "bootstrup.php";
use src\classes\Constants;
use src\classes\DBconnection;
use src\classes\Services;
use log\Logger;

$mURL_ID = filter_input_array(INPUT_POST);
$mrtID = $mURL_ID['merchant_id'];
$clbID = $mURL_ID['business_id'];
$couponID = $mURL_ID['couponid'];

$config_ini = parse_ini_file(Constants::CONFIG_URL, true);
$config = $config_ini['logger'];
$server = $config['serverURL'];
if($mrtID !=0 && $clbID != 0 && $couponID != ""){
    $dbObj = new DBconnection();
    $b_data = TRUE;
    $msg = "Coupon is redeemed by the Merchant $mrtID";
    $rwdObj = Services::getReward($couponID,$clbID,$dbObj);
    if($rwdObj == null){$msg = "NO REWORD SELECTED AT THIS TIME "; $b_data = FALSE;}
    $log = new Logger($server . 'businesslog.txt');
    $log->log_start();
    $log->log_message($msg.PHP_EOL.$rwdObj->getClientFName()." ".$rwdObj->getClientLName());
    $log->log_end();
    if(!$b_data){
        echo FALSE;
    }else{
        $data = array('fname'=>$rwdObj->getClientFName(),'lname'=>$rwdObj->getClientLName(),
            'type'=>$rwdObj->getReward_type(), 'dtext'=>$rwdObj->getReward_text(),'exp_date'=>$rwdObj->getExpire_date(),
            'redeem'=>$rwdObj->getRedeemed(),'descr'=>$rwdObj->getDecription(),'month'=>$rwdObj->getClientBirthMonth(),'day'=>$rwdObj->getClientBirthDay());
        if($data['fname'] !== null && $data['lname'] !==null){
         echo json_encode($data);   
        }else{echo FALSE;}
         
    }
    
}else{
    $log = new Logger($server . 'businesslog.txt');
    $log->log_start();
    $log->log_message('Coupon is not listed for this Merchant '.$mrtID);
    $log->log_end();
    echo "WRONG MERCHANT";
}

//json_encode(get_object_vars($rwdObj));
exit();
