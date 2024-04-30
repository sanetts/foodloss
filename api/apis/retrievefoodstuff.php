<?php
header("Access-Control-Allow-Origin: https://freefoodhb.vercel.app");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");


// error_reporting(E_ALL);
// ini_set('display_errors', 1);
session_start();
include "./settings/connection.php";

$sql = "SELECT f.*, i.file_name, s.sname
            FROM food_items f 
            INNER JOIN image i ON f.image_id = i.image_id
            INNER JOIN food_status s ON f.sid = s.sid WHERE f.sid = 2";
            
function getFoundItems($sql,$connection, $limit, $offset, $sortBy, $itemType, $location) {
   

    
    if (!empty($itemType)) {
        $sql .= " AND category = '$itemType'";
    }

    
    if (!empty($location)) {
        if ($location === 'other') { 
            if (!empty($_GET['custom-location'])) {
                $customLocation = $connection->real_escape_string($_GET['custom-location']);
                
                $sql .= " AND location LIKE '%$customLocation%'";
                // echo "sql " . $sql;
            }
        } else {
            $sql .= " AND location = '$location'";
            // echo "sql " . $sql;
        }
    }

    switch ($sortBy) {
        case 'time_asc':
            $sql .= " ORDER BY interaction_time ASC";
            break;
        case 'time_desc':
            $sql .= " ORDER BY interaction_time DESC";
            break;
        case 'name_asc':
            $sql .= " ORDER BY item_name ASC";
            break;
        case 'name_desc':
            $sql .= " ORDER BY item_name DESC";
            break;
        default:
            $sql .= " ORDER BY interaction_time DESC";
            break;
    }


    $sql .= " LIMIT $limit OFFSET $offset";


    $result = $connection->query($sql);

    if ($result === false) {
        throw new Exception("Error executing query: " . $connection->error);
        // return array();
    }


    $foundItems = array();
    while ($row = $result->fetch_assoc()) {
        $foundItems[] = $row;
    }

    $result->free();

    return $foundItems;
}


$sortBy = isset($_GET['sort-by']) ? $_GET['sort-by'] : '';

$itemType = isset($_GET['item_type']) ? $_GET['item_type'] : '';

$location = isset($_GET['location']) ? $_GET['location'] : '';


$limit = 5; 
$current_page = isset($_GET['page']) ? $_GET['page'] : 1;
$offset = ($current_page - 1) * $limit;


$foundItems = getFoundItems($sql,$conn, $limit, $offset, $sortBy, $itemType, $location);


echo json_encode($foundItems);


?>
