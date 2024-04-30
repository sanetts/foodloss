<?php
header("Access-Control-Allow-Origin: https://freefoodhb.vercel.app");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include './settings/connection.php'; 


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data);

    
    $itemid = mysqli_real_escape_string($conn, $data->itemid);

    
    $sql = "SELECT uid FROM food_items WHERE itemid = $itemid";

    $result = $conn->query($sql);

    if ($result) {
        
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            
            $uid = $row['uid'];
            echo json_encode(array("uid" => $uid));
        } else {
            echo json_encode(array("error" => "No item found with the provided itemid"));
        }
    } else {
        echo json_encode(array("error" => "Error: " . $conn->error));
    }
} else {
    
    echo json_encode(array('error' => 'Invalid request method'));
}


$conn->close();
?>
