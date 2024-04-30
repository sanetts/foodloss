<?php
header("Access-Control-Allow-Origin: https://freefoodhb.vercel.app");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include './settings/connection.php';


if(isset($_GET['query'])) {
    $query = $_GET['query'];
    
   
    $sql = "SELECT food_items.*, image.file_name AS image_path
            FROM food_items
            LEFT JOIN image ON food_items.image_id = image.image_id
            WHERE food_items.item_name LIKE '%$query%' OR food_items.description LIKE '%$query%'";

   
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
       
        $searchResults = array();

        
        while($row = $result->fetch_assoc()) {
            
            $searchResults[] = $row;
        }

        
        echo json_encode($searchResults);
    } else {
        
        echo json_encode(array('message' => 'No matching results found'));
    }
} else {
    
    echo json_encode(array('message' => 'No search query provided'));
}
?>
