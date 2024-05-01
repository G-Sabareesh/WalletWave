<?php

// Global array to store the result rows
$variae = [];
// Custom comparison function for sorting by id in descending order
function sortByIdDesc($a, $b) {
    return $b['id'] - $a['id'];
}


// Function to execute query based on column name and value
function getAlldata($con, $columnName, $value) {
    global $variae;

    // echo "function";

    // Construct the SQL query
    $get_query = "SELECT * FROM transaction WHERE $columnName = '$value'";

    // Execute the query
    $get_result = mysqli_query($con, $get_query);

    // Check if query execution was successful
    if ($get_result) {
        // Fetch and push the result rows into the global array
        while ($row = mysqli_fetch_assoc($get_result)) {
            // echo $row;
            //$variae[] = $row;
            $duplicate = false;
            foreach ($variae as $existingRow) {
                if ($existingRow['id'] == $row['id']) {
                    $duplicate = true;
                    break;
                }
            }
            // If not a duplicate, push the row into the array
            if (!$duplicate) {
                $variae[] = $row;
            }
        }
    } else {
        // Handle query error
        echo "Error executing query: " . mysqli_error($con);
    }
}

// Include your database connection file or configure your database connection here
include 'config.php';

// Start or resume the session
session_start();

$user_id = $_SESSION['user']; // Assuming the user ID is stored in a session variable

$input=file_get_contents("php://input");
$checkedValues = json_decode($input, true);

$query = "SELECT DISTINCT ";

// Initialize an array to store the column names
$columnNames = [];

// Initialize an array to store the extracted values
$extractedValues = [];

// Iterate over each checked value
foreach ($checkedValues as $checkedValue) {
    // Split the key by comma to get individual column names
    $filterColumnNames = explode(",", $checkedValue['key']);
    
    // Add the column names to the array if they're not already present
    foreach ($filterColumnNames as $columnName) {
        if (!in_array($columnName, $columnNames)) {
            $columnNames[] = $columnName;
        }
    }
    
    // Extract the value and add it to the extracted values array
    $extractedValues[] = $checkedValue['value'];
}

// Add the column names to the query
$query .= implode(", ", $columnNames);

// Add the table name and where condition
$query .= " FROM transaction WHERE user_id = '{$user_id}'";

// Execute the query and fetch the results
$result = mysqli_query($con, $query);

// Check if query execution was successful
if ($result) {
    // Fetch and process the data
    while ($row = mysqli_fetch_assoc($result)) {
        // Initialize a flag to check if any value matches
        $matchFound = false;
        
        // Process each row of data as needed
        foreach ($row as $columnName => $value) {
            // Check if the value matches any extracted value
            if (in_array($value, $extractedValues)) {
                // Output the column name and value
                // echo "$columnName: $value<br>";
                $matchFound = true;
                getAlldata($con, $columnName, $value);
            }
        }
        
        // If no match was found, skip to the next row
        if (!$matchFound) {
            continue;
        }
    }


    // Sort the variae array using the custom comparison function
    usort($variae, 'sortByIdDesc');

    echo json_encode($variae);

} else {
    // Handle query error
    echo json_encode("Error executing query: " . mysqli_error($con));
}
?>
