<?php

namespace src\classes;

include 'Business.php';
include 'Reward.php';
include 'Client.php';

class Services {

    public static $REWARDS = array();

    public function __constract() {
        
    }

    /** @access public
     *  sets merchant and club id in hidden fields
     *  validating the reward 
     */
    public static function getMerchantName($urlid) {

        return $club = new Business($urlid);
    }

    /**
     * 
     * @param type $code
     * @return type
     * 
     */
    public static function getReward($code = null, $business_id = 0, $obj = null) {
        $sql = "Call coupon_rdm($business_id,'$code')";
        $rs = $obj->query($sql);
        $data = $rs->fetch_assoc();
//        echo print_r($data['rwId']);
        $clnt = new Client();
        $clnt->setFname($data['fname']);
        $clnt->setLname($data['lname']);
        $clnt->setBirth_day($data['birth_day']);
        $clnt->setBirth_month($data['birth_month']);
        $clnt->setVisit($data['visit_count']);
        $rwdType = $data['reward_type'];
        $rwdText = $data['reward_text'];
        $rwdCode = $data['val_code'];
        $rwdExpDate = $data['expire_date'];
        $redeem = $data['redeemed'];
        $decription = $data['description'];
        $rwd = new Reward($rwdType, $rwdText, $rwdCode, $rwdExpDate, $redeem, $decription, $clnt);
        if (isset($rwd)) {
            return $rwd;
        } else {
            return null;
        }
    }

    public static function getReward_demo($code = null, $business_id = 0, $email = null, $obj = null) {
        $sql = "Call coupon_rdm_demo($business_id,'$code','$email')";
        $rs = $obj->query($sql);
        $data = $rs->fetch_assoc();
        $arrSize = count($data);
//        echo print_r($data);
        $clnt = new Client();
        $clnt->setFname($data['fname']);
        $clnt->setLname($data['lname']);
        $clnt->setBirth_day($data['birth_day']);
        $clnt->setBirth_month($data['birth_month']);
        $clnt->setVisit($data['visit_count']);
        $rwdType = $data['reward_type'];
        $rwdText = $data['reward_text'];
        $rwdCode = $data['val_code'];
        $rwdExpDate = $data['expire_date'];
        $redeem = $data['redeemed'];
        $rwd = new Reward($rwdType, $rwdText, $rwdCode, $rwdExpDate, $redeem, $clnt);
        if ($arrSize > 1) {
            return $rwd;
        } else if ($arrSize == 1) {
            return "ONE REDEEM A DAY";
        } else {
            return "INVALID COUPON";
        }
    }

    /*
     * 
     * 
     * 
     */

    public static function redeemReward($code, $obj) {
        $rs = "Call update_reward_rdm('$code')";
        $obj->query($rs);
        $row = mysqli_affected_rows($obj->connect());
        return $row;
    }

    public static function test() {
        echo "<br>" . "HELLO HELL WHERE YOU BEEN";
    }

    /**
     * @name getEmails
     * @param type getLastRedeemtion
     * @return type array object     
     */
    public static function getLastRedeemtion($busId, $couponcode, $obj) {
        $sql = "Call last_coupon_rdm($busId,'$couponcode')";
        $rs = $obj->query($sql);
        $rta = $rs->fetch_assoc();
        return $rta['rwId'];
    }

    /**
     * @name getRewardsId
     * @param type $customerEmail
     * @return type array object     
     */
    public static function getRewardsIdDemo($businessId, $obj, $clientTime) {
        $valcode = array();
        $phone = array();
        $emails = array();
        $name = array();
        $email_to_phone = array();
        $cust_day_month = array();
        $cust_id = array();
        $bd = array();
        $months = explode(" ", "Zer Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec");
        $date = date('Y-m-d H:i:s');
        $sql = "Call email_request_rdm($businessId)";
        $rs = $obj->query($sql);
        while ($row = $rs->fetch_assoc()) {
            if (!in_array($row['customer_email'], $emails)) {
                $emails[] = $row['customer_email'];
                $cust_id[$row['customer_email']] = $row['sent_to_mem_id'];
                if ($row['customer_phone'] !== null)
                    $email_to_phone[$row['customer_phone']][] = $row['customer_email'];
            }
//            $dates = explode(" ", $row['redeemed']);

            if ($row['redeemed'] === null && strtotime($row['expdate']) > strtotime("$clientTime")) {
                $valcode[$row['customer_email']][] = $row['val_code'];
            }
            $name[$row['customer_email']] = $row['fname'] . " " . $row['lname'];
            if ($row['birth_day'] === '' || $row['birth_month'] === '') {
                $cust_day_month[$row['customer_email']] = "unknown";
            } else {
                $cust_day_month[$row['customer_email']] = $row['birth_day'] . " " . $months[$row['birth_month']];
            }
            if ($row['customer_phone'] !== null && $row['redeemed'] === null &&
                    strtotime(date($row['expdate'])) > strtotime(date("$clientTime"))) {
                $phone[$row['customer_phone']][] = $row['val_code'];
            }
            if ($row['rwdtype'] === "BD" && $row['redeemed'] === null &&
                    strtotime(date($row['expdate'])) > strtotime(date("$clientTime"))) {
                $bd[$row['customer_email']][] = $row['val_code'];
            }
        }
        $rst = array();
        $rst['allemails'] = $emails;
        $rst['valcode'] = $valcode;
        $rst['name'] = $name;
        $rst['phone'] = $phone;
        $rst['em_to_pn'] = $email_to_phone;
        $rst['birth_day_month'] = $cust_day_month;
        $rst['cust_id'] = $cust_id;
        $rst['bd'] = $bd;
        if (isset($rst)) {

            return json_encode($rst);
        } else {
            return NULL;
        }
    }
    public static function getRewardsId($businessId, $obj, $clientTime) {
        $valcode = array();
        $phone = array();
        $emails = array();
        $name = array();
        $email_to_phone = array();
        $cust_day_month = array();
        $cust_id = array();
        $bd = array();
        $months = explode(" ", "Zer Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec");
        $date = date('Y-m-d H:i:s');
        $sql = "Call email_request_rdm($businessId)";
        $rs = $obj->query($sql);
        while ($row = $rs->fetch_assoc()) {
            if (!in_array($row['customer_email'], $emails)) {
                $emails[] = $row['customer_email'];
                $cust_id[$row['customer_email']] = $row['sent_to_mem_id'];
                if ($row['customer_phone'] !== null)
                    $email_to_phone[$row['customer_phone']][] = $row['customer_email'];
            }
//            $dates = explode(" ", $row['redeemed']);

            if ($row['redeemed'] === null && strtotime($row['expdate']) > strtotime("$clientTime")) {
                $valcode[$row['customer_email']][] = $row['val_code'];
            }
            $name[$row['customer_email']] = $row['fname'] . " " . $row['lname'];
            if ($row['birth_day'] === '' || $row['birth_month'] === '') {
                $cust_day_month[$row['customer_email']] = "unknown";
            } else {
                $cust_day_month[$row['customer_email']] = $row['birth_day'] . " " . $months[$row['birth_month']];
            }
            if ($row['customer_phone'] !== null && $row['redeemed'] === null &&
                    strtotime(date($row['expdate'])) > strtotime(date("$clientTime"))) {
                $phone[$row['customer_phone']][] = $row['val_code'];
            }
            if ($row['rwdtype'] === "BD" && $row['redeemed'] === null &&
                    strtotime(date($row['expdate'])) > strtotime(date("$clientTime"))) {
                $bd[$row['customer_email']][] = $row['val_code'];
            }
        }
        $rst = array();
        $rst['allemails'] = $emails;
        $rst['valcode'] = $valcode;
        $rst['name'] = $name;
        $rst['phone'] = $phone;
        $rst['em_to_pn'] = $email_to_phone;
        $rst['birth_day_month'] = $cust_day_month;
        $rst['cust_id'] = $cust_id;
        $rst['bd'] = $bd;
        if (isset($rst)) {

            return json_encode($rst);
        } else {
            return NULL;
        }
    }

}
