<?php
header("Access-Control-Allow-Origin: https://freefoodhb.vercel.app");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

session_start();

include './settings/connection.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    if (empty($_FILES["image"]["name"])) {
        echo json_encode(array("error" => "Image file is empty"));
        exit();
    }

    
    if (!isset($_POST['uid'])) {
        echo json_encode(array("error" => "User ID not provided"));
        exit();
    }

    
    $target_dir = "./uploads/";
    $target_file = $target_dir . basename($_FILES["image"]["name"]);

    
    if (file_exists($target_file)) {
        echo json_encode(array("error" => "Sorry, file already exists."));
        exit();
    }

    // Move uploaded file to target directory
    if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
        // Get uid from payload
        $uid = $_POST['uid'];

        // Prepare SQL query
        $sql = "INSERT INTO `image` (`file_name`, `file_size`, `file_type`, `uid`)
                VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $file_size = $_FILES["image"]["size"];
        $file_type = $_FILES["image"]["type"];

        // Bind parameters and execute SQL query
        $stmt->bind_param("sdsi", $target_file, $file_size, $file_type, $uid);
        if ($stmt->execute()) {
            // Get the ID of the inserted image
            $imageId = $stmt->insert_id; 
            echo json_encode(array(
                "message" => "Image uploaded and inserted into database successfully",
                "file_path" => $target_file,
                "image_id" => $imageId 
            ));
        } else {
            // Error executing SQL query
            echo json_encode(array("error" => "Error executing SQL query: " . $stmt->error . ". Query: " . $sql));
        }
        $stmt->close();
    } else {
        // Error uploading image
        echo json_encode(array("error" => "Error uploading image"));
    }
} else {
    // Invalid request method
    echo json_encode(array('error' => 'Invalid request method'));
}

$conn->close();
?>
