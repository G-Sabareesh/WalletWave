<?php
session_start();

include 'config.php';

header('Content-Type: application/json');

if (isset($_SESSION['user'])) {

    $userId = $_SESSION['user'];
    // echo $username;

    // Fetch image data from the database based on the provided username
    $sql = "SELECT profile_picture FROM profiles WHERE user_id = '$userId'"; // Assuming you have a 'profiles' table with a 'profile_picture' column
    $result = $con->query($sql);
    
    if ($result) {
        // Check if a row was returned
        if ($result->num_rows > 0) {
            // Fetch the image data
            $row = $result->fetch_assoc();
            $imageData = $row['profile_picture'];
        } else {
            // User does not have a profile picture, set default image
            $imageData = 'uploads/profile.png';
        }

        // Set response
        $response = array(
            'success' => true,
            'image' => $imageData// Convert binary image data to base64
        );
        echo json_encode($response);
    } else {
        // No image found for the provided username
        $response = array(
            'success' => false,
            'message' => 'No image found for the provided username.'
        );
        echo json_encode($response);
    }
} else {
    // echo "else";
    // Invalid request method or missing username parameter
    $response = array(
        'success' => false,
        'message' => 'Invalid request. Please provide a username.'
    );
    echo json_encode($response);
}
// header('Content-Type: application/json');
// Close database connection
$con->close();
?>