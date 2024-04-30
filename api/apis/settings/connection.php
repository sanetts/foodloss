<?php
$servername = "127.0.0.1";  
$username = "phpmyadmin";   
$password = "ubuntu";
$dbname = "foodloss";
$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    var_dump("connected");
    die("Connection failed: " . $conn->connect_error);
}
?> 
