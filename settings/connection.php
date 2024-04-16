<?php
$servername = "127.0.0.1";  
$username = "root";   
$password = "";
$dbname = "foodloss";

$conn = new mysqli($servername, $username, $password, $dbname);

var_dump("connected");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?> 
