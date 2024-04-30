<?php

header("Access-Control-Allow-Origin: https://freefoodhb.vercel.app");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include './settings/connection.php'; 


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    $data = json_decode(file_get_contents("php://input"), true);

    $messageId = mysqli_real_escape_string($conn, $data['id']);

    $sql = "UPDATE messages SET msid = 2 WHERE message_id='$messageId'";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("success" => "Message deleted successfully"));
    } else {
        echo json_encode(array("error" => "Error deleting message: " . $conn->error));
    }
} else {

    echo json_encode(array('error' => 'Invalid request method'));
}

?>
