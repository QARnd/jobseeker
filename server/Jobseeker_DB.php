<?php
/**
 * Created by PhpStorm.
 * User: Omayma Abulrub
 * Date: 11/30/2014
 * Time: 10:41 PM
 */


include_once("config.php");

class Jobseeker_DB {
    var $db_connection;
    var $error_messge;

    function __construct($host, $username, $password, $dbname){
        $this->db_connection = $this->connect_db($host,$username,$password);
        $this->select_db($dbname);
        $this->db_query("SET NAMES 'utf8'",false);
    }

    function connect_db($host,$username,$password){
        if ($last = mysql_connect($host,$username,$password,TRUE))
            return $last;
        else
            $this->error_messge = mysql_error();
    }

    function select_db($dbname){
        if ($last = mysql_select_db($dbname,$this->db_connection))
            return $last;
        else
            $this->error_messge = mysql_error();
    }

    //db_query
    //INPUT: $str the sql string to execute.
    //OUTPUT: returns a database result resourse
    function db_query($str){

        if ($result = mysql_query($str,$this->db_connection))
            return $result;
        else{
            $this->error_messge = mysql_error();
            return(false);
        }
    }

    //input: query to select data
    //output: array of rows
    function db_assoc($query_result){
        if ($last = mysql_fetch_assoc($query_result))
            return $last;
        else
            $this->error_messge = mysql_error();
    }


    //INPUT:
    //OUTPUT: return the auto ID of the affected row.
    function db_insid(){
        return mysql_insert_id();
    }

    ///
    //return array
    //
    ///
    function get_rows ($table_and_query,$filter = null) {
        $total = mysql_query("SELECT COUNT(*) FROM $table_and_query " . $filter);
        $total = mysql_fetch_array($total);
        return $total[0];
    }

    function db_query_rowsnum($result){
        return mysql_num_rows($result);
    }

}

?>