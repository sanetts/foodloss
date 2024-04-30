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

    $target_dir = "./uploads/";
    $target_file = $target_dir . basename($_FILES["image"]["name"]);

    if (file_exists($target_file)) {
        echo json_encode(array("error" => "Sorry, file already exists."));
        exit();
    }

    // echo "File details:";
    // echo "Name: " . $_FILES["image"]["name"] . "\n";
    // echo "Type: " . $_FILES["image"]["type"] . "\n";
    // echo "Size: " . $_FILES["image"]["size"] . " bytes\n";
    // echo "Tmp name: " . $_FILES["image"]["tmp_name"] . "\n";

    if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
        
        $sql = "INSERT INTO `image` (`file_name`, `file_size`, `file_type`)
                VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $file_size = $_FILES["image"]["size"];
        $file_type = $_FILES["image"]["type"];
        $stmt->bind_param("sds", $target_file, $file_size, $file_type);
        
        // echo "Prepared statement:";
        // echo "SQL: " . $sql . "\n";
        // echo "File size: " . $file_size . "\n";
        // echo "Target file: " . $target_file . "\n";
        // echo "File type: " . $file_type . "\n";

        if ($stmt->execute()) {
            $imageId = $stmt->insert_id; 
            echo json_encode(array(
                "message" => "Image uploaded and inserted into database successfully",
                "file_path" => $target_file,
                "image_id" => $imageId 
            ));
        } else {
            echo json_encode(array("error" => "Error executing SQL query: " . $stmt->error . ". Query: " . $sql));
        }
        
        $stmt->close();
    } else {
        echo json_encode(array("error" => "Error uploading image. Error code: " . $_FILES["image"]["error"]));
    }
} else {
    echo json_encode(array('error' => 'Invalid request method'));
}

$conn->close();
?>
