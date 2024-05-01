<?php
include 'config.php';

// Start or resume the session
session_start();

// Retrieve the user ID from the session
$user_id = $_SESSION['user'];

// Prepare the SQL query
$query = "SELECT 
            SUM(CASE WHEN transfer_method = 'Income' THEN amount ELSE 00.00 END) AS total_income,
            SUM(CASE WHEN transfer_method = 'Expense' THEN amount ELSE 00.00 END) AS total_expense
          FROM 
            transaction 
          WHERE 
            user_id = '$user_id'";

// Execute the query
$result = $con->query($query);

// Check if the query was successful
if ($result) {
    // Fetch associative array of the result
    $row = $result->fetch_assoc();

    // Get the total income and expense
    $total_income = $row['total_income'];
    $total_expense = $row['total_expense'];
    if($total_income <= 0){
      $total_income = 0;
    }
    if($total_expense <= 0){
      $total_expense = 0;
    }

    $total = array(
        'income' => $total_income,
        'expense' => $total_expense
    );

echo json_encode($total);

} else {
    // Handle query error
    echo json_encode("Error: " . $con->error);
}


?>