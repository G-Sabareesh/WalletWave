<?php
include 'config.php';

// Start or resume the session
session_start();

// Retrieve the user ID from the session
$user_id = $_SESSION['user'];

// Define the SQL query
$query = "SELECT 
COALESCE(SUM(CASE WHEN transfer_method = 'Income' AND mode = 'Wallet' THEN amount ELSE 0 END), 0) AS total_income_wallet,
COALESCE(SUM(CASE WHEN transfer_method = 'Income' AND mode = 'Bank' THEN amount ELSE 0 END), 0) AS total_income_bank,
COALESCE(SUM(CASE WHEN transfer_method = 'Expense' AND mode = 'Wallet' THEN amount ELSE 0 END), 0) AS total_expense_wallet,
COALESCE(SUM(CASE WHEN transfer_method = 'Expense' AND mode = 'Bank' THEN amount ELSE 0 END), 0) AS total_expense_bank
FROM 
transaction
      WHERE user_id = '$user_id'";

// Perform the query
$result = mysqli_query($con, $query);

// Check if the query was successful
if ($result) {
    // Fetch the result as an associative array
    $totals = mysqli_fetch_assoc($result);
    // Return the totals as JSON

    echo json_encode($totals);

} else {
    // Handle query error
    echo json_encode("Error: " . $con->error);
}


?>