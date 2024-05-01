<?php
session_start();

include 'config.php';

header('Content-Type: application/json');

// if(isset($_POST)){

    $input=file_get_contents("php://input");
    $decode=json_decode($input,true);
    // echo $decode["username"];

    $usernameOrEmail = $decode["username"];
    $password = $decode["password"];
    // echo $usernameOrEmail;
    // echo $password;

    
    // Prepare SQL statement to select user based on username/email
    $sql = "SELECT user_id, user_name, user_email, user_password FROM user_account WHERE user_id = ? OR user_email = ?";
    // echo $sql;
    
    // Prepare and bind parameters
    $stmt = $con->prepare($sql);
    $stmt->bind_param("ss", $usernameOrEmail, $usernameOrEmail);
    
    // Execute query
    $stmt->execute();
    
    // Store result
    $result = $stmt->get_result();
    if ($result->num_rows == 1) {
        $user = $result->fetch_assoc();
        // echo $user.'<br>'; // Add a line break between rows
        if ($password === $user['user_password']) {
            // Password is correct
            // Start the session
            // session_start();
            $userName = $user['user_name'];

            $capitalizedUsername = ucwords($userName);
            
            // Store username in session
            $_SESSION['user'] = $user['user_id'];   
            
            // Return success response
            $data = array(
                'success' => true,
                'message' => "$capitalizedUsername you are Successfully Login"
            );

        } else {
            // Password is incorrect
            $data = array(
                'success' => false,
                'message' => "Please check the Password"
            );
        }
        
    }
    else{
        $data = array(
            'success' => false,
            'message' => "Please check the Username"
        );
    }
    echo json_encode($data);
// }
?>
