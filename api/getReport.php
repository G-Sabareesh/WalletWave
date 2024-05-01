<?php
// Include your database connection file or configure your database connection here
include 'config.php';

// Start or resume the session
session_start();

$user_id = $_SESSION['user']; // Assuming the user ID is stored in a session variable

$input=file_get_contents("php://input");
$checkedValues = json_decode($input,true);

// Construct the SQL query
$query = "SELECT DISTINCT ";

// Add selected columns to the query
$query .= implode(", ", $checkedValues) . " ";

// Add the FROM and WHERE clauses
$query .= "FROM transaction WHERE user_id = '$user_id'";

// Execute the query
$result = mysqli_query($con, $query);

// Check if the query was successful
if ($result) {
    // Fetch the results
    $result_data = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $result_data[] = $row;
    }

    $data = array(
        'success' => true,
        'message' => "Your data is fetching please wait...",
        'result' => $result_data
    );

    // Return the data as JSON
    echo json_encode($data);
} else {
    $data = array(
        'success' => true,
        'message' => "Your data is fetching please wait...",
        'result' => "No data found"
    );
}

?>
