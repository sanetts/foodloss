<?php

header("Access-Control-Allow-Origin: https://freefoodhb.vercel.app");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include './settings/connection.php'; 


if ($_SERVER["REQUEST_METHOD"] === "GET") {
    
    if (!isset($_GET['id'])) {
        http_response_code(400);
        echo json_encode(array("error" => "Message ID is required"));
        exit();
    }

    $messageId = $_GET['id'];

   
    $sql = "SELECT content FROM messages WHERE message_id='$messageId'"; 

    if ($result->num_rows > 0) {
       
        $row = $result->fetch_assoc();
        
        echo json_encode(array("content" => $row['content']));
    } else {
        
        http_response_code(404);
        echo json_encode(array("error" => "Message not found"));
    }
} elseif ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {

    http_response_code(204);
} else {

    echo json_encode(array('error' => 'Invalid request method'));
}

?>
