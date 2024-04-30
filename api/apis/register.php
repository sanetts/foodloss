<?php
header("Access-Control-Allow-Origin: https://freefoodhb.vercel.app");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include './settings/connection.php'; 
// var_dump($_SERVER["REQUEST_METHOD"]);

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data);

    $name = mysqli_real_escape_string($conn, $data->name);
    $lastname = mysqli_real_escape_string($conn, $data->lastname);
    $email = mysqli_real_escape_string($conn, $data->email);
    $password = mysqli_real_escape_string($conn, $data->password);
    $phone = mysqli_real_escape_string($conn, $data->phone);
    $gender = mysqli_real_escape_string($conn, $data->gender);
    $status = mysqli_real_escape_string($conn, $data->status);
   
    
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    
    
    $sql = "INSERT INTO `user` (`rid`, `fname`, `lname`, `gender`, `tel`, `email`, `passwd`, `status`)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
 

    $stmt = $conn->prepare($sql);
    $default_role_id = 3; 
    $stmt->bind_param("isssssss", $default_role_id, $name, $lastname, $gender, $phone, $email, $hashed_password, $status);

    
    echo "SQL Query: " . $sql . "\n";

    if ($stmt->execute()) {
        echo "SQL Query: " . $sql . "\n";
        echo json_encode(array("message" => "Registration successful"));
    } else {
        echo json_encode(array("error" => "Error: " . $stmt->error));
    }

    $stmt->close();

} else {
    
    echo json_encode(array('error' => 'Invalid request method'));
}


$conn->close();
?>
