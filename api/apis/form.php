<?php
session_start();

include './settings/connection.php';

header("Access-Control-Allow-Origin: https://freefoodhb.vercel.app");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");


if ($_SERVER["REQUEST_METHOD"] === "POST") {

    
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data);

    
    if (empty($data->image)) {
        echo json_encode(array("error" => "Image data is empty"));
        exit();
    }

    
    $target_dir = "uploads/";
    $imageData = $data->image;
    $imageFileType = $data->imageFileType;
    $target_file = $target_dir . uniqid() . "." . $imageFileType;

    
    $decodedImage = base64_decode($imageData);
    if (file_put_contents($target_file, $decodedImage)) {
        
        $file_Size = strlen($decodedImage);
        echo "File Size " . $file_Size . PHP_EOL;

       
        $sqlImage = "INSERT INTO `image` (`file_name`, `file_size`, `file_type`)
                     VALUES (?, ?, ?)";

        $stmtImage = $conn->prepare($sqlImage);
        $stmtImage->bind_param("sis", $target_file, $file_Size, $imageFileType);
        $stmtImage->execute();

        
        $imageId = $stmtImage->insert_id;
        $stmtImage->close();

      
        $sqlFoodItems = "INSERT INTO `food_items` (`rid`, `sid`, `image_id`, `item_name`, `start_time`, `location`, `description`, `uid`, `category`, `item_qty`, `endtime`, `expiry_date`) 
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        $stmtFoodItems = $conn->prepare($sqlFoodItems);
        
        $defaultRoleId = 3;
        $defaultStatusId = 2;
        
        $uid = $_SESSION['user_id'];
        $stmtFoodItems->bind_param("iiissssisiss", $defaultRoleId, $defaultStatusId, $imageId, $data->itemName, $data->pickupTime->start, $data->pickupLocation, $data->description, $uid, $data->itemCategory, $data->itemQuantity, $data->pickupTime->end, $data->expirationDate);
        
        
        if ($stmtFoodItems->execute()) {
            echo json_encode(array("message" => "Donation submitted successfully"));
        } else {
            echo json_encode(array("error" => "Error: " . $stmtFoodItems->error));
        }

        
        $stmtFoodItems->close();
    } else {
        echo json_encode(array("error" => "Error uploading image"));
    }

   
    $conn->close();
} else {
    
    echo json_encode(array('error' => 'Invalid request method'));
}
?>
