<?php
session_start();

include 'config.php';

header('Content-Type: application/json');

if (isset($_SESSION['user'])) {

    $userId = $_SESSION['user'];

    // Query to retrieve the user name based on the user ID
    $query = "SELECT user_name FROM user_account WHERE user_id = '$userId'";

    // Execute the query
    // $result = $mysql->query($query);

    // $sql = "INSERT INTO useraccount (user_id,user_name,user_email,user_password) VALUES('{$user_id}', '{$username}', '{$useremail}','{$password}')";
    $result = mysqli_query($con,$query);

    // Check if the query was successful
    if ($result) {
        // Fetch the user name from the result
        $row = $result->fetch_assoc();
        $userName = $row['user_name'];

        $data = array(
            'success' => true,
            'userName' => ucwords($userName),
            'userID' => $userId
        );
         
    } else {
        // Handle query error
        $data = array(
            'success' => false,
            'message' => "Error".$mysqli->error
        );
    }
} 
else {
    // Handle the case when the user ID is not set in the session
    // echo "User ID is not set in the session.";
    $data = array(
        'success' => false,
        'message' => "User is not Login"
    );
}

echo json_encode($data);
