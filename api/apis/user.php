<?php
session_start();
header("Access-Control-Allow-Origin: https://freefoodhb.vercel.app");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");


var_dump($_SESSION['user_id']);

if (isset($_SESSION['user_id'])) {
   
    echo json_encode(['user_id' => $_SESSION['user_id']]);
} else {
    
    echo json_encode(['error' => 'User ID not found']);
}
?>

