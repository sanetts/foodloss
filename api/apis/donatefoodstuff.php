<?php
header("Access-Control-Allow-Origin: https://freefoodhb.vercel.app");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

session_start();

include './settings/connection.php';


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    $imageId = $_POST['image_id'];
    $uid = $_POST['uid'];
    $itemName = $_POST['itemName'];
    $itemCategory = $_POST['itemCategory'];
    $itemQuantity = $_POST['itemQuantity'];
    $expirationDate = $_POST['expirationDate'];
    $pickupLocation = $_POST['pickupLocation'];
    $pickupTimeStart = $_POST['startTime'];
    $pickupTimeEnd = $_POST['endTime'];
    $description = $_POST['description'];
    $pickupDate = $_POST['pickupDate'];

    
    $sqlFoodItems = "INSERT INTO `food_items` (`rid`, `sid`, `image_id`, `item_name`, `start_time`, `location`, `description`, `uid`, `category`, `item_qty`, `endtime`, `expiry_date`) 
                     VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $stmtFoodItems = $conn->prepare($sqlFoodItems);
    
    $defaultRoleId = 3;
    $defaultStatusId = 2;
    
    $stmtFoodItems->bind_param("iiissssisiss", $defaultRoleId, $defaultStatusId, $imageId, $itemName, $pickupTimeStart, $pickupLocation, $description, $uid, $itemCategory, $itemQuantity, $pickupTimeEnd, $expirationDate);
    
    
    if ($stmtFoodItems->execute()) {
        echo json_encode(array("message" => "Donation submitted successfully"));
    } else {
        $errorMessage = "Error executing SQL query: " . $stmtFoodItems->error . ". Query: " . $sqlFoodItems . ". Parameters: (rid=$defaultRoleId, sid=$defaultStatusId, image_id=$imageId, item_name=$itemName, start_time=$pickupTimeStart, location=$pickupLocation, description=$description, uid=$uid, category=$itemCategory, item_qty=$itemQuantity, endtime=$pickupTimeEnd, expiry_date=$expirationDate)";
        echo json_encode(array("error" => $errorMessage));
    }

    
    $stmtFoodItems->close();
} else {
    echo json_encode(array("error" => "Invalid request method"));
}


$conn->close();
?>
