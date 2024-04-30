<?php
header("Access-Control-Allow-Origin: https://freefoodhb.vercel.app");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json");

session_start();

include './settings/connection.php';

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    // Check if user ID is provided
    if (!isset($_GET["uid"])) {
        echo json_encode(array("error" => "User ID is required"));
        exit();
    }

    $uid = $_GET["uid"];

    // Query to retrieve the image of the user
    $sql = "SELECT * FROM `image` WHERE `uid` = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $uid);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $imageData = array(
            "image_id" => $row["image_id"],
            "file_name" => $row["file_name"],
            "file_size" => $row["file_size"],
            "file_type" => $row["file_type"],
            "upload_date" => $row["upload_date"]
        );

        // Return image data as JSON response
        echo json_encode($imageData);
    } else {
        // No image found for the user
        echo json_encode(array("error" => "No image found for the user"));
    }
    $stmt->close();
} else {
    // Invalid request method
    echo json_encode(array('error' => 'Invalid request method'));
}

$conn->close();
?>
