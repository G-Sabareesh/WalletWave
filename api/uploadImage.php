<?php
// Include database configuration file
include 'config.php';

session_start();

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve user ID from session (assuming it's stored in $_SESSION['user_id'])
    $user_id = $_SESSION['user'];

    // Retrieve form data
    $profile_picture = '';

    if ($_FILES['profile_picture']['error'] === UPLOAD_ERR_OK) {
        // Define upload directory
        $uploadDirectory = '/opt/lampp/htdocs/WalletWAVE/uploads/';

        // Generate unique filename to avoid overwriting existing files
        $filename = uniqid() . '_' . basename($_FILES['profile_picture']['name']);

        // Attempt to move the uploaded file to the upload directory
if (move_uploaded_file($_FILES['profile_picture']['tmp_name'], $uploadDirectory . $filename)) {
    // File uploaded successfully
    $profile_picture = $uploadDirectory . $filename;
} else {
    // Failed to move uploaded file
    $response = array(
        'success' => false,
        'message' => 'Failed to move uploaded file. Error: ' . $filename,
    );
    echo json_encode($response);
    exit;
}
    } else {
        // Error occurred during file upload
        $response = array(
            'success' => false,
            'message' => 'Error occurred during file upload: ' . $_FILES['profile_picture']['error'],
        );
        echo json_encode($response);
        exit;
    }

    // Check if user exists in the database
    $checkUserQuery = "SELECT id, profile_picture FROM profiles WHERE user_id = ?";
    $checkUserStmt = $con->prepare($checkUserQuery);
    $checkUserStmt->bind_param("s", $user_id);
    $checkUserStmt->execute();
    $checkUserResult = $checkUserStmt->get_result();

    if ($checkUserResult->num_rows > 0) {
        // User exists, update profile picture
        $updateProfilePictureQuery = "UPDATE profiles SET profile_picture = ? WHERE user_id = ?";
        $updateProfilePictureStmt = $con->prepare($updateProfilePictureQuery);
        $updateProfilePictureStmt->bind_param("ss", $profile_picture, $user_id);

        if ($updateProfilePictureStmt->execute()) {
            // Profile picture updated successfully
            // Delete previous image if it exists
            $existingUserData = $checkUserResult->fetch_assoc();
            $existingProfilePicture = $existingUserData['profile_picture'];
            if (file_exists($existingProfilePicture)) {
                unlink($existingProfilePicture);
            }

            $response = array(
                'success' => true,
                'message' => 'Profile picture updated successfully!',
            );
        } else {
            // Error occurred while updating profile picture
            $response = array(
                'success' => false,
                'message' => 'Error updating profile picture: ' . $updateProfilePictureStmt->error,
            );
        }

        // Close update profile picture statement
        $updateProfilePictureStmt->close();
    } else {
        // User does not exist, insert new profile
        $insertProfileQuery = "INSERT INTO profiles (user_id, profile_picture) VALUES (?, ?)";
        $insertProfileStmt = $con->prepare($insertProfileQuery);
        $insertProfileStmt->bind_param("ss", $user_id, $profile_picture);

        if ($insertProfileStmt->execute()) {
            // Profile inserted successfully
            $response = array(
                'success' => true,
                'message' => 'Profile inserted successfully!',
            );
        } else {
            // Error occurred while inserting profile
            $response = array(
                'success' => false,
                'message' => 'Error inserting profile: ' . $insertProfileStmt->error,
            );
        }

        // Close insert profile statement
        $insertProfileStmt->close();
    }

    // Close check user statement
    $checkUserStmt->close();

    // Return response
    echo json_encode($response);
} else {
    // Invalid request method
    $response = array(
        'success' => false,
        'message' => 'Invalid request method.',
    );
    echo json_encode($response);
}
?>
