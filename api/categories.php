<?php
// Include your database connection file or configure your database connection here
include 'config.php'; // Example file name

// Fetch user ID from session
// Start or resume the session
session_start();

$user_id = $_SESSION['user'];

// Define the SELECT query with a placeholder for the user ID
$selectQuery = "SELECT id, def_cat_name FROM def_category WHERE user_id = ? OR user_id = '0'";

// Prepare the statement
$stmt = $con->prepare($selectQuery);

// Bind the user ID parameter
$stmt->bind_param("s", $user_id);

// Execute the query
$stmt->execute();

// Get the result set
$result = $stmt->get_result();

// Store categories in an array
$categories = array();
while ($row = $result->fetch_assoc()) {
    $categories[] = $row;
}

// Close the prepared statement
$stmt->close();

// Return categories as JSON
echo json_encode(array('categories' => $categories));
?>
