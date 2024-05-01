<?php
// Include your database connection file or configure your database connection here
include 'config.php'; // Example file name

// Retrieve the category_id value from the GET parameters

// Fetch user ID from session
// Start or resume the session
session_start();

$user_id = $_SESSION['user'];

$category_id = $_GET['category_id'];

// Query to retrieve subcategories for the current main category
$selectQuery = "SELECT id, sub_cat_name FROM sub_category WHERE def_category_id = ? AND (user_id = ? OR user_id = '0')";
$subCategoriesStmt = $con->prepare($selectQuery);
$subCategoriesStmt->bind_param("is", $category_id, $user_id);
$subCategoriesStmt->execute();
$result = $subCategoriesStmt->get_result();

// Check if the query executed successfully
if (!$result) {
    $errorStatement =  "Error fetching sub categories: " . mysqli_error($con);
    $sub_categories[] = array('id' => 0, 'sub_cat_name' => $errorStatement);
    echo json_encode(array('sub_categories' => $sub_categories));
} else {
    // Store sub_categories in an array
    $sub_categories = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $sub_categories[] = $row;
    }

    // Check if any sub categories were found
    if (empty($sub_categories)) {
        // If no sub categories found, add a placeholder
        $sub_categories[] = array('id' => 0, 'sub_cat_name' => 'No data found');
    }

    // Close the result set
    // mysqli_free_result($result);

    // Return sub_categories as JSON
    echo json_encode(array('sub_categories' => $sub_categories));
}

$subCategoriesStmt->close();

// Close the database connection
// mysqli_close($con);

// Use the category_id value as needed
// echo 'Received category_id: ' . $category_id;

?>