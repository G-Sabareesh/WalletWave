<?php
// Include your database connection file or configure your database connection here
include 'config.php';

// Start or resume the session
session_start();

// Retrieve the user ID from the session
$user_id = $_SESSION['user'];


$getTransactionData = "SELECT tran_date, transfer_method, category, sub_category, mode, trans_description, amount, balance
FROM transaction
WHERE user_id = '{$user_id}'
ORDER BY id DESC";

$result = $con->query($getTransactionData);

// Initialize an array to store transaction data
$all_transactions = array();

// Initialize ID counter
$id = 1;

// Check if there are any rows returned
if ($result->num_rows > 0) {
    // Loop through each row of the result set
    while ($row = $result->fetch_assoc()) {
        // Add transaction data to the array with incremented ID
        $row['trans_id'] = $id++;
        $all_transactions[] = $row;
    } 
}else {
    // No rows found
    $all_transactions = array(); // Ensure empty array if no transactions found
}

// Return the transaction data as JSON
echo json_encode(array('all_transactions' => $all_transactions));

// mysqli_free_result($mainCategoriesResult);

// Close the database connection
// mysqli_close($con);
?>