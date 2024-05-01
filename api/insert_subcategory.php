<?php
// Include your database connection file or configure your database connection here
include 'config.php'; // Example file name

$input=file_get_contents("php://input");
$catValues = json_decode($input,true);
    // Retrieve form data
    $subCatName = $catValues['sub_cat_name'];
    $defCategoryId = $catValues['def_category_id'];
    
    // Get user ID from session
    session_start();
    $userId = $_SESSION['user']; // Assuming the session variable name is 'user_id'

    // Prepare SQL statement to check if the subcategory already exists for the given definition category ID
    $checkQuery = "SELECT COUNT(*) AS count FROM sub_category WHERE sub_cat_name = ? AND def_category_id = ? AND (user_id = ? OR user_id ='0')";
    $checkStmt = $con->prepare($checkQuery);
    $checkStmt->bind_param("sis", $subCatName, $defCategoryId, $userId);
    $checkStmt->execute();
    $checkResult = $checkStmt->get_result();
    $row = $checkResult->fetch_assoc();
    $subcategoryCount = $row['count'];

    if ($subcategoryCount == 0) {
        // Prepare SQL statement to insert data into the "sub_category" table
        $insertQuery = "INSERT INTO sub_category (sub_cat_name, def_category_id, user_id) VALUES (?, ?, ?)";
        $stmt = $con->prepare($insertQuery);
        $stmt->bind_param("sis", $subCatName, $defCategoryId, $userId);

        // Execute the prepared statement
        if ($stmt->execute()) {
            // Data inserted successfully
            $response = array(
                'success' => true,
                'message' => 'Subcategory added successfully!',
                'catname' => $subCatName,
                'catvalue' => $defCategoryId,
            );
            echo json_encode($response);
        } else {
            // Error occurred while inserting data
            $response = array(
                'success' => false,
                'message' => 'Error: ' . $stmt->error,
            );
            echo json_encode($response);
        }

        // Close statement
        $stmt->close();
    } else {
                // Subcategory already exists for the given definition category ID
                $response = array(
                    'success' => false,
                    'message' => 'Subcategory already exists for the selected category.',
                );
                echo json_encode($response);
        
            }

?>
