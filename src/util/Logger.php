<?php
namespace src\util;

trait Logger {

    public function log($msg, $idr) {
        
        $file = file_get_contents("logs.txt", "wr") or die("Unable to open file!");
        
        $txt = $msg;
        
        file_put_contents($idr.'/logs.txt', $txt . PHP_EOL, FILE_APPEND);
        
        fclose($file);
    }

}
