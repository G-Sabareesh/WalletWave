<?php
// Include your database connection file or configure your database connection here
include 'config.php'; // Example file name

// Fetch user ID from session
// Start or resume the session
session_start();

$user_id = $_SESSION['user'];

// Retrieve main categories
$mainCategoriesQuery = "SELECT id, def_cat_name FROM def_category WHERE user_id = ? OR user_id = '0'";
$mainCategoriesStmt = $con->prepare($mainCategoriesQuery);
$mainCategoriesStmt->bind_param("s", $user_id);
$mainCategoriesStmt->execute();
$mainCategoriesResult = $mainCategoriesStmt->get_result();

// Array to store categories and their subcategories
$categoriesWithSubcategories = array();

// Fetch main categories
while ($mainCategory = $mainCategoriesResult->fetch_assoc()) {
    $categoryId = $mainCategory['id'];
    $categoryName = $mainCategory['def_cat_name'];

    // Query to retrieve subcategories for the current main category
    $subCategoriesQuery = "SELECT id, sub_cat_name FROM sub_category WHERE def_category_id = ? AND (user_id = ? OR user_id = '0')";
    $subCategoriesStmt = $con->prepare($subCategoriesQuery);
    $subCategoriesStmt->bind_param("is", $categoryId, $user_id);
    $subCategoriesStmt->execute();
    $subCategoriesResult = $subCategoriesStmt->get_result();

    // Array to store subcategories
    $subcategories = array();

    // Fetch subcategories
    while ($subCategory = $subCategoriesResult->fetch_assoc()) {
        $subcategories[] = $subCategory;
    }

    // Add main category with its subcategories to the array
    $categoriesWithSubcategories[] = array(
        'main_category_id' => $categoryId,
        'main_category_name' => $categoryName,
        'subcategories' => $subcategories
    );
}

// Close prepared statements
$mainCategoriesStmt->close();
$subCategoriesStmt->close();

// Return categories as JSON
echo json_encode(array('all_categories' => $categoriesWithSubcategories));
?>
