<?php
//Database configuration

define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASSWORD', '');
define('DB_NAME', 'walletwave');

//Establish database connection
$con = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

//Check connection

if($con->connect_error)
{
    die("Connection failed : ".$con->connect_error);
}
// echo "Connection Success";
// echo "hello world"
?>