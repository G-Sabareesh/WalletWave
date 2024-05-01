<?php

session_start();

include 'config.php';

// if(isset($_POST["name"]) || isset($_POST["age"]) || isset($_POST["country"])){
    $input=file_get_contents("php://input");
    $decode = json_decode($input,true);

    $username = $decode["username"];
    $useremail = $decode["useremail"];
    $password = $decode["userpassword"];

    $capitalizedUsername = ucwords($username);    

    $randomNumber = str_pad(mt_rand(1, 999), 3, '0', STR_PAD_LEFT); // Generate random number and pad with leading zeros if necessary
    $user_id = $username . '@' . $randomNumber;

    //  Prepare SQL statement to insert new user
    $sql = "INSERT INTO user_account (user_id,user_name,user_email,user_password) VALUES('{$user_id}', '{$username}', '{$useremail}','{$password}')";
    $run_sql = mysqli_query($con,$sql);
    if($run_sql)
    {

        $_SESSION['user'] = $user_id;

        $data = array(
            'success' => true,
            'message' => "$capitalizedUsername your account created successfully"
        );
    }

    else {
        // Return JSON response with validation errors
        $data = array(
            'success' => false,
            'message' => "Sorry something went wrong..."
        );
    }

    echo json_encode($data);
// }

?>