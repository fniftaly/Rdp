<?php

namespace src\classes;

class Business {

//    use \src\util\LogTrait;

    private $clb_id;
//    
    private $mem_id;
//    
    private $rs;

    public function __construct($merchant_id) {
//        
        $this->rs = "Call merchant_rdm('$merchant_id')";
    }

//
    public function getClb_id() {
        return $this->clb_id;
    }

    public function getMem_id() {
        return $this->mem_id;
    }

    public function setClb_id($clb_id) {
        $this->clb_id = $clb_id;
    }

    public function setMem_id($mem_id) {
        $this->mem_id = $mem_id;
    }

    public function getRs() {
        return $this->rs;
    }
}
