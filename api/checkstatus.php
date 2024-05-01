<?php
session_start();

// Check if a user is logged in
if (isset($_SESSION['user'])) {
    // User is logged in
    echo json_encode(["loggedIn" => true, "user" => $_SESSION['user']]);
} else {
    // User is not logged in
    echo json_encode(["loggedIn" => false]);
}
?>
