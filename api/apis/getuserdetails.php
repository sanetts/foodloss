<?php
header("Access-Control-Allow-Origin: https://freefoodhb.vercel.app");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

error_reporting(E_ALL);
ini_set('display_errors', 1);
session_start();
include "./settings/connection.php";


if (isset($_GET['uid'])) {
    
    $uid = $_GET['uid'];

    $stmt = $conn->prepare("SELECT * FROM user WHERE uid = ?");
    

    $stmt->bind_param("i", $uid);
    $stmt->execute();

    $result = $stmt->get_result();

    if ($result->num_rows > 0) {

        $userDetails = $result->fetch_assoc();

       
        echo json_encode($userDetails);
    } else {
       
        echo json_encode(['error' => 'User not found']);
    }

    $stmt->close();
} else {
   
    echo json_encode(['error' => 'UID not provided']);
}


$conn->close();
?>
