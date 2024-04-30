<?php

header("Access-Control-Allow-Origin: https://freefoodhb.vercel.app");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include './settings/connection.php'; 


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    $data = json_decode(file_get_contents("php://input"), true);
    // if ($data) {
    //     echo json_encode(array("success" => $data));
    // }

    
    $messageId = mysqli_real_escape_string($conn, $data['messageId']);
    $updatedContent = mysqli_real_escape_string($conn, $data['content']);
    
    
    $sql = "UPDATE messages SET content='$updatedContent' WHERE message_id='$messageId'"; 
    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("success" => "Message updated successfully"));
    } else {
        echo json_encode(array("error" => "Error updating message: " . $conn->error));
    }
} elseif ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
} else {
    echo json_encode(array('error' => 'Invalid request method'));
}

?>
