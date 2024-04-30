<?php
header("Access-Control-Allow-Origin: https://freefoodhb.vercel.app");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include './settings/connection.php';


session_start();


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $json_data = file_get_contents('php://input');

 
    $payload = json_decode($json_data, true);

   
    if (isset($payload['userId'])) {
        $user = $payload['userId'];

        
        $sql = "SELECT rfi.rfid, rfi.contact, rfi.preferredTime, rfi.location, rfi.item_id,
       fi.uid AS food_item_uid, u1.uid AS requested_item_uid,
       CONCAT(u1.fname, ' ', u1.lname) AS requested_user_name,
       CONCAT(u2.fname, ' ', u2.lname) AS food_item_user_name,
       fi.item_name, fi.description, im.file_name
FROM requested_food_items rfi
JOIN food_items fi ON rfi.item_id = fi.itemid
JOIN user u1 ON rfi.receiver_id = u1.uid
JOIN user u2 ON fi.uid = u2.uid
LEFT JOIN image im ON fi.image_id = im.image_id
WHERE fi.uid = $user;
";

        
        $result = $conn->query($sql);

        
        if ($result) {
            $data = array();
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            
            echo json_encode($data);
        } else {
           
            echo json_encode(array("error" => "Error executing SQL query"));
        }
    } else {
        
        echo json_encode(array("error" => "User ID not provided in the payload"));
    }
} else {
    
    echo json_encode(array("error" => "Invalid request method"));
}
?>






