<?php
header("Access-Control-Allow-Origin: https://freefoodhb.vercel.app");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// error_reporting(E_ALL);
// ini_set('display_errors', 1);
session_start();
include "./settings/connection.php";


if (isset($_GET['id'])) {
    
    $id = $_GET['id'];

   
    $stmt = $conn->prepare("SELECT f.*, i.file_name, s.sname, u.fname as user_name
                            FROM food_items f 
                            INNER JOIN image i ON f.image_id = i.image_id
                            INNER JOIN food_status s ON f.sid = s.sid
                            INNER JOIN user u ON f.uid = u.uid
                            WHERE f.itemid = ? ");
    
   
    $stmt->bind_param("i", $id);

    
    $stmt->execute();

    
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        
        $foodItem = $result->fetch_assoc();
        // $foodItem['file_name'] = str_replace("\/", "/", $foodItem['file_name']);
        // $foodItem['file_name'] = str_replace("u", "../u", $foodItem['file_name']);
        
        echo json_encode($foodItem);
    } else {
       
        echo json_encode(['error' => 'Item not found']);
    }

    
    $stmt->close();
} else {
    
    echo json_encode(['error' => 'Item ID not provided']);
}


$conn->close();
?>
