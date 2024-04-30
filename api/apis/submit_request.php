<?php
header("Access-Control-Allow-Origin: https://freefoodhb.vercel.app");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include './settings/connection.php'; 

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data);

   
    $contact = mysqli_real_escape_string($conn, $data->contact);
    $preferredTime = mysqli_real_escape_string($conn, $data->preferredTime);
    $location = mysqli_real_escape_string($conn, $data->location);
    $item_id = mysqli_real_escape_string($conn, $data->item_id);
    $receiver_id = mysqli_real_escape_string($conn, $data->receiver_id);

    
    $sql = "INSERT INTO `requested_food_items` (`receiver_id`,`item_id`, `contact`, `preferredTime`, `location`)
            VALUES (?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iisss",$receiver_id, $item_id, $contact, $preferredTime, $location);

    if ($stmt->execute()) {
        echo json_encode(array("message" => "Request submitted successfully"));
    } else {
        echo json_encode(array("error" => "Error: " . $stmt->error));
    }

    $stmt->close();

} else {
    
    echo json_encode(array('error' => 'Invalid request method'));
}


$conn->close();
?>
