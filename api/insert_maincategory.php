<?php
// Include your database connection file or configure your database connection here
include 'config.php'; // Example file name

$input=file_get_contents("php://input");
$catValues = json_decode($input,true);
    // Retrieve form data
    $mainCatName = $catValues['def_cat_name'];
    
    // Get user ID from session
    session_start();
    $userId = $_SESSION['user']; // Assuming the session variable name is 'user_id'

    // Prepare SQL statement to check if the main category already exists
    $checkQuery = "SELECT COUNT(*) AS count FROM def_category WHERE def_cat_name = ? AND (user_id = ? OR user_id ='0')";
    $checkStmt = $con->prepare($checkQuery);
    $checkStmt->bind_param("ss", $mainCatName, $userId);
    $checkStmt->execute();
    $checkResult = $checkStmt->get_result();
    $row = $checkResult->fetch_assoc();
    $mainCategoryCount = $row['count'];

    if ($mainCategoryCount > 0) {
        // Main category already exists
        $response = array(
            'success' => false,
            'message' => 'Main category already exists.',
        );
        echo json_encode($response);
    } else {
        // Prepare SQL statement to insert data into the "def_category" table
        $insertQuery = "INSERT INTO def_category (def_cat_name, user_id) VALUES (?, ?)";
        $stmt = $con->prepare($insertQuery);
        $stmt->bind_param("ss", $mainCatName, $userId);

        // Execute the prepared statement
        if ($stmt->execute()) {
            // Data inserted successfully
            $response = array(
                'success' => true,
                'message' => 'Main category added successfully!',
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
    }

?>
