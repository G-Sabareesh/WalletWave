<?php
include 'config.php';

function getChart($con, $user_id) {
    
    // Define the SQL query to get the sum of values for each category for the current user
    $get_query = "SELECT category, SUM(amount) AS total_amount 
    FROM transaction 
    WHERE user_id = '{$user_id}'
    AND category != 'Credit'
    GROUP BY category";

// Execute the query
$get_result = $con->query($get_query);

    // Check if the query was successful
    if ($get_result) {
    // Initialize an array to store the results
    $categories = array();

    // Fetch associative array of results
    while ($get_row = $get_result->fetch_assoc()) {
    // Store main category and total amount in the array
    $categories[] = $get_row;
    }

    echo json_encode($categories);
    
    } else {
    // Handle query error
    echo "Error: " . $con->error;
    }
}
// Start or resume the session
session_start();

// Retrieve the user ID from the session
$user_id = $_SESSION['user'];

getChart($con, $user_id);

?>