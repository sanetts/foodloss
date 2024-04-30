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

   
    $sql = "SELECT * FROM messages WHERE (sender_id = $senderId AND receiver_id = $receiverId AND msid = 1) 
    OR (sender_id = $receiverId AND receiver_id = $senderId AND msid = 1) ORDER BY timestamp ASC";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
       
        $messages = array();
        
       
        while($row = $result->fetch_assoc()) {
           
            $messages[] = array(
                'sender_id' => $row['sender_id'],
                'content' => $row['content'],
                'timestamp' => $row['timestamp']
            );
        }
        
       
        echo json_encode($messages);
    } else {
       
        echo json_encode(array('message' => 'No messages found'));
    }

} else {
    
    echo json_encode(array('error' => 'Invalid request method'));
}
?>
