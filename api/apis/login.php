<?php
header("Access-Control-Allow-Origin: https://freefoodhb.vercel.app");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

session_start();

include './settings/connection.php';


if ($_SERVER["REQUEST_METHOD"] === "POST") {
   
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data);

    
    $email = mysqli_real_escape_string($conn, $data->email);
    $password = mysqli_real_escape_string($conn, $data->password);

    
    $sql = "SELECT * FROM `user` WHERE `email` = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        
        if (password_verify($password, $user['passwd'])) {
           
            
            
            $_SESSION['user_id'] = $user['uid'];
        
            echo json_encode(array("message" => "Login successful", "user" => $user, "user_id" => $user['uid']));
            // var_dump($_SESSION['user_id']);
        } else {
            echo json_encode(array("error" => "Incorrect email or password"));
        }
    } else {
        echo json_encode(array("error" => "User not found"));
    }

    $stmt->close();
} else {
    
    echo json_encode(array('error' => 'Invalid request method'));
}

$conn->close();
?>
