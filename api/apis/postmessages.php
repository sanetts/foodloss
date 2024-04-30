<?php
header("Access-Control-Allow-Origin: https://freefoodhb.vercel.app");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include './settings/connection.php'; 



if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data);

    
    $receiverId = mysqli_real_escape_string($conn, $data->receiverId);
    $content = mysqli_real_escape_string($conn, $data->content);

    
    $sql = "INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $senderId = 1; 
    $stmt->bind_param("iis", $senderId, $receiverId, $content);

    if ($stmt->execute()) {
        echo json_encode(array("message" => "Message sent successfully"));
    } else {
        echo json_encode(array("error" => "Error sending message"));
    }

    $stmt->close();
} else {
    
    echo json_encode(array('error' => 'Invalid request method'));
}
?>
