<?php

namespace src\classes;

class DBconnection {

  public function __construct() {
        
    }
    
    protected static $connection;

    /**
     * Connect to the database
     * @return bool false on failure / mysqli MySQLi object instance on success
     */
    public function connect() {
        //changed not much
        if (!isset(self::$connection)) {
            $config_ini = parse_ini_file('/var/www/vhosts/dev.riiwards.com/httpdocs/rdp/appconfig/config.ini',true);
//            $config_ini = parse_ini_file('/Applications/MAMP/htdocs/rdp/appconfig/config.ini',true);
            $config = $config_ini['database'];
//            $config = $config_ini['localhost'];
            self::$connection = new \mysqli('localhost', $config['username'], $config['password'], $config['dbname']);
        }
        // If connection was not successful, handle the error
        if (self::$connection === false) {
           echo 'This is hell';
            return false;
        }
        return self::$connection;
    }

    /**
     * Query the database
     *
     * @param $query The query string
     * @return mixed The result of the mysqli::query() function
     */
    public function query($query) {
        $connection = $this->connect();
        $result = $connection->query($query);
        return $result;
    }

    /**
     * Fetch rows from the database (SELECT query)
     * @param $query The query string
     * @return bool False on failure / array Database rows on success
     */
    public function select($query) {
        $rows = array();
        $result = $this->query($query);
        if ($result === false) {
            return false;
        }
        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }
        return $rows;
    }

    /**
     * Fetch the last error from the database
     *
     * @return string Database error message
     */
    public function error() {
        $connection = $this->connect();
        return $connection->error;
    }

    /**
     * Quote and escape value for use in a database query
     *
     * @param string $value The value to be quoted and escaped
     * @return string The quoted and escaped string
     */
    public function quote($value) {
        $connection = $this->connect();
        return "'" . $connection->real_escape_string($value) . "'";
    }

}