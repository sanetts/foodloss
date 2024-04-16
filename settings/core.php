<?php
session_start();

// Function to check if the user is logged in
function checkLogin() {
    if (!isset($_SESSION["user_id"])) {
        header("Location: ../login/login_view.php");
        die(); 
    }
}

// // Function to get the user's role ID
// function getUserRoleID() {
//     if (isset($_SESSION["role_id"])) {
//         return $_SESSION["role_id"];
//     } else {
//         return null; 
//     }
// }

// // Function to control access based on user's role ID
// function controlAccess() {
//     $role_id = getUserRoleID();
//     if ($role_id === 1) {
//         // User has role ID 1 (superadmin), grant access to all pages
//         return true;
//     } elseif ($role_id === 2) {
//         // User has role ID 2 (admin), cannot delete assignment and chore
//         $disallowed_pages = array("../action/delete_assignment_action.php", "../action/delete_chore_action.php");
//         $current_page = basename($_SERVER["PHP_SELF"]);
//         if (in_array($current_page, $disallowed_pages)) {
//             header("Location: ../view/unauthorized_access.php");
//             die();
//         } else {
//             return true;
//         }
//     } elseif ($role_id === 3) {
//         // User has role ID 3 (standard), grant access to some other pages
//         $allowed_pages = array("../view/standard_home.php");
//         $current_page = basename($_SERVER["PHP_SELF"]);
//         if (in_array($current_page, $allowed_pages)) {
//             return true;
//         } else {
//             return false;
//         }
//     } else {
//         // User role not defined or invalid, deny access
//         return false;
//     }
// }


// ?>
