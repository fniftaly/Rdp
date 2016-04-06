<?php
namespace src\classes;

class Client{
    private $id;
    private $fname;
    private $lname;
    private $birth_month;
    private $birth_day;
    private $visit;
    
    public function __construct() {
        
    }
    
    function getId() {
        return $this->id;
    }

    function getFname() {
        return $this->fname;
    }

    function getLname() {
        return $this->lname;
    }

    function getBirth_month() {
        return $this->birth_month;
    }

    function getBirth_day() {
        return $this->birth_day;
    }

    function getVisit() {
        return $this->visit;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setFname($fname) {
        $this->fname = $fname;
    }

    function setLname($lname) {
        $this->lname = $lname;
    }

    function setBirth_month($birth_month) {
        $this->birth_month = $birth_month;
    }

    function setBirth_day($birth_day) {
        $this->birth_day = $birth_day;
    }

    function setVisit($visit) {
        $this->visit = $visit;
    }



}