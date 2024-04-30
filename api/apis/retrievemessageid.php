<?php
header("Access-Control-Allow-Origin: https://freefoodhb.vercel.app");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include './settings/connection.php';


if ($_SERVER["REQUEST_METHOD"] === "GET") {
    
    $receiverId = $_GET['receiverId'];
    $receiverId = mysqli_real_escape_string($conn, $receiverId);

    $senderId = $_GET['senderId'];
    $senderId = mysqli_real_escape_string($conn, $senderId);

    $content = $_GET['content'];
    $content = mysqli_real_escape_string($conn, $content);



   
    $sql = "SELECT message_id FROM messages WHERE sender_id = $senderId AND receiver_id = '$receiverId' AND content = '$content'";

    $result = $conn->query($sql);

    if ($result) {
        if ($result->num_rows > 0) {
            
            $row = $result->fetch_assoc();
            $messageId = $row['message_id'];
            echo json_encode(array('messageId' => $messageId));
        } else {
            
            echo json_encode(array('error' => "Message ID not found"));
        }
    } else {
        
        echo json_encode(array('error' => "SQL query execution error: " . $conn->error));
    }
}
?>
