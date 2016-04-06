<?php
use src\classes\DBconnection;

include 'src/classes/DBconnection.php';

$dbObj = new DBconnection();

$data = filter_input_array(INPUT_POST);

$val = $data['rewards'];

if($val === "update"){
//    
    $sql = "Call process_reward_rdm()";
    
    $rows = $dbObj->query($sql);
    
    $arr = array();
    
    while($rst = $rows->fetch_assoc()){
        $arr[] = $rst['val_code'];
    }
    
    echo json_encode($arr);
}else{
    $type = substr($val, 0, 1);
    $code = substr($val, 1);
    
    $rsql = "update reward set redeemed=now() where val_code='$code'";
    $esql = "update reward set expire_date=now() where val_code='$code'";
    
    if($type === "R"){$dbObj->query($rsql);}
    else{$dbObj->query($esql);}
    
    echo $type;
}
 exit;
