<?php
session_start();
header("Access-Control-Allow-Origin: https://freefoodhb.vercel.app");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "./settings/connection.php";


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data);

  
    if ($data) {
        
        $status = $data->status;
        $item_id = $data->item_id;

        
        if ($status == 1) {
            $sql = "UPDATE food_items SET sid = 1 WHERE expiry_date < CURDATE() AND sid = 2";
            if (mysqli_query($conn, $sql)) {
                echo json_encode(array("success" => "Status updated to Expired"));
            } else {
                echo json_encode(array("error" => "Error updating status to Expired: " . mysqli_error($conn)));
            }
        } elseif ($status == 2) {
            
            $stmt = $conn->prepare("SELECT itemid FROM food_items WHERE uid = ? AND sid = 3");
            $stmt->bind_param("i", $item_id);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
            $sql = "UPDATE food_items SET sid = 2 WHERE itemid = $item_id AND sid = 3";
            if (mysqli_query($conn, $sql)) {
                echo json_encode(array("success" => "Status updated to Not Expired"));
            } else {
                echo json_encode(array("error" => "Error updating status to Not Expired: " . mysqli_error($conn)));
            }
            } else {
                echo json_encode(array("error" => "No item found with the specified uid and status 3"));
            }
        } elseif ($status == 3) {
           
            $sql = "UPDATE food_items SET sid = 3 WHERE itemid = $item_id AND sid = 2";
            if (mysqli_query($conn, $sql)) {
                echo json_encode(array("success" => "Status updated to Temporary"));
            } else {
                echo json_encode(array("error" => "Error updating status to Temporary: " . mysqli_error($conn)));
            }
        } 
    } else {
        
        echo json_encode(array("error" => "No JSON data received"));
    }
} else {
    
    echo json_encode(array('error' => 'Invalid request method'));
}
?>
