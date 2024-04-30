<?php
session_start();

include './settings/connection.php';
function checkLogin() {
    if (!isset($_SESSION["user_id"])) {
        header("Location: https://freefoodhb.vercel.app/login");
        die(); 
    }
}



?>