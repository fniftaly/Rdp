<?php

/**
 * Description of Coupon
 *
 * @author def
 */

namespace src\classes;

class Reward {

    private $reward_type;
    private $reward_text;
    private $val_code;
    private $expire_date;
    private $redeemed;
    private $client;
    private $decription;

    public function __construct($reward_type, 
                                $reward_text,
                                $val_code, 
                                $expire_date, 
                                $redeemed,
                                $decription,
                                Client $client) {
        $this->reward_type = $reward_type;
        $this->reward_text = $reward_text;
        $this->val_code = $val_code;
        $this->expire_date = $expire_date;
        $this->redeemed = $redeemed;
        $this->decription = $decription;
        $this->client = $client;
    }
    function getDecription() {
        return $this->decription;
    }

    function setDecription($decription) {
        $this->decription = $decription;
    }

        public function getClientFName(){
        return $this->client->getFname();
    }
    public function getClientLName(){
        return $this->client->getLname();
    }
    public function getClientBirthMonth(){
        return $this->client->getBirth_month();
    }
    public function getClientBirthDay(){
        return $this->client->getBirth_day();
    }
    public function getClientVisit(){
        return $this->client->getVisit();
    }

    public function getReward_type() {
        return $this->reward_type;
    }

    public function getReward_text() {
        return $this->reward_text;
    }

    public function getVal_code() {
        return $this->val_code;
    }

    public function getExpire_date() {
        return $this->expire_date;
    }

    public function getRedeemed() {
        return $this->redeemed;
    }

    public function getClient() {
        return $this->client;
    }

    public function setReward_type($reward_type) {
        $this->reward_type = $reward_type;
    }

    public function setReward_text($reward_text) {
        $this->reward_text = $reward_text;
    }

    public function setVal_code($val_code) {
        $this->val_code = $val_code;
    }

    public function setExpire_date($expire_date) {
        $this->expire_date = $expire_date;
    }

    public function setRedeemed($redeemed) {
        $this->redeemed = $redeemed;
    }

    public function setClient($client) {
        $this->client = $client;
    }

}
