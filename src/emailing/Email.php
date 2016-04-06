<?php

namespace src\emailing;

/**
 * Description of Email
 *
 * @author def
 */
class Email {
    
    private $daily_report;
    private $riiwards_birthday_club;
    private $summary;
    private $yesterday;
    private $year_to_date;
    private $all;
    private $subscribers;
    private $monthly_last_three_months;
    private $new_signup_yesterday;
    private $email;
    private $no_email_sent_yesterday;
    private $email_sent_yesterday;
    private $subscriber_email;
    private $birthday;
    private $sent_on;
    private $email_subject;
    private $email_body;
    private $bday_reward_sent;
    private $congrats_msg;
    private $subscriber_limit_msg;
    
    
    
    public function __construct() {
        
    }

    
    public function getDaily_report() {
        return $this->daily_report;
    }

    public function getRiiwards_birthday_club() {
        return $this->riiwards_birthday_club;
    }

    public function getSummary() {
        return $this->summary;
    }

    public function getYesterday() {
        return $this->yesterday;
    }

    public function getYear_to_date() {
        return $this->year_to_date;
    }

    public function getAll() {
        return $this->all;
    }

    public function getSubscribers() {
        return $this->subscribers;
    }

    public function getMonthly_last_three_months() {
        return $this->monthly_last_three_months;
    }

    public function getNew_signup_yesterday() {
        return $this->new_signup_yesterday;
    }

    public function getEmail() {
        return $this->email;
    }

    public function getNo_email_sent_yesterday() {
        return $this->no_email_sent_yesterday;
    }

    public function getEmail_sent_yesterday() {
        return $this->email_sent_yesterday;
    }

    public function getSubscriber_email() {
        return $this->subscriber_email;
    }

    public function getBirthday() {
        return $this->birthday;
    }

    public function getSent_on() {
        return $this->sent_on;
    }

    public function getEmail_subject() {
        return $this->email_subject;
    }

    public function getEmail_body() {
        return $this->email_body;
    }

    public function getBday_reward_sent() {
        return $this->bday_reward_sent;
    }

    public function getCongrats_msg() {
        return $this->congrats_msg;
    }

    public function getSubscriber_limit_msg() {
        return $this->subscriber_limit_msg;
    }

    public function setDaily_report($daily_report) {
        $this->daily_report = $daily_report;
    }

    public function setRiiwards_birthday_club($riiwards_birthday_club) {
        $this->riiwards_birthday_club = $riiwards_birthday_club;
    }

    public function setSummary($summary) {
        $this->summary = $summary;
    }

    public function setYesterday($yesterday) {
        $this->yesterday = $yesterday;
    }

    public function setYear_to_date($year_to_date) {
        $this->year_to_date = $year_to_date;
    }

    public function setAll($all) {
        $this->all = $all;
    }

    public function setSubscribers($subscribers) {
        $this->subscribers = $subscribers;
    }

    public function setMonthly_last_three_months($monthly_last_three_months) {
        $this->monthly_last_three_months = $monthly_last_three_months;
    }

    public function setNew_signup_yesterday($new_signup_yesterday) {
        $this->new_signup_yesterday = $new_signup_yesterday;
    }

    public function setEmail($email) {
        $this->email = $email;
    }

    public function setNo_email_sent_yesterday($no_email_sent_yesterday) {
        $this->no_email_sent_yesterday = $no_email_sent_yesterday;
    }

    public function setEmail_sent_yesterday($email_sent_yesterday) {
        $this->email_sent_yesterday = $email_sent_yesterday;
    }

    public function setSubscriber_email($subscriber_email) {
        $this->subscriber_email = $subscriber_email;
    }

    public function setBirthday($birthday) {
        $this->birthday = $birthday;
    }

    public function setSent_on($sent_on) {
        $this->sent_on = $sent_on;
    }

    public function setEmail_subject($email_subject) {
        $this->email_subject = $email_subject;
    }

    public function setEmail_body($email_body) {
        $this->email_body = $email_body;
    }

    public function setBday_reward_sent($bday_reward_sent) {
        $this->bday_reward_sent = $bday_reward_sent;
    }

    public function setCongrats_msg($congrats_msg) {
        $this->congrats_msg = $congrats_msg;
    }

    public function setSubscriber_limit_msg($subscriber_limit_msg) {
        $this->subscriber_limit_msg = $subscriber_limit_msg;
    }

    public function __destruct() {
        
    }

}
