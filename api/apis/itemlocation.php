<?php
session_start();


if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    header("Access-Control-Allow-Origin: https://freefoodhb.vercel.app");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    exit; 
}

header("Access-Control-Allow-Origin: https://freefoodhb.vercel.app");
header("Content-Type: application/json");

include './settings/connection.php'; 

if ($_SERVER["REQUEST_METHOD"] === "GET" || $_SERVER["REQUEST_METHOD"] === "POST") {
   
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body, true);

   
    $item_id = isset($data['item_id']) ? $data['item_id'] : null;
    if (!empty($item_id)) {
        $item_id = mysqli_real_escape_string($conn, $item_id);

        
        $sql = "SELECT f.location AS item_location
                FROM food_items f
                WHERE f.itemid = '$item_id'";

        $result = $conn->query($sql);

        if ($result) {
            if ($result->num_rows > 0) {
                $locations = array();
                
                while ($row = $result->fetch_assoc()) {
                    $locations[] = $row;
                }
                
                echo json_encode($locations);
            } else {
               
                echo json_encode(array("message" => "No locations found"));
            }
        } else {
            
            echo json_encode(array("error" => $conn->error));
        }
    } else {
        
        echo json_encode(array("error" => "item_id is required"));
    }
} else {
   
    echo json_encode(array('error' => 'Invalid request method'));
}


$conn->close();
?>
