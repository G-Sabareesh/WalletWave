<?php
include 'config.php';

function addTransactions($con, $transactionValues) {
    // Extract transaction data
    $user_id = $transactionValues['user_id'];
    $date = $transactionValues['date'];
    $transfer = $transactionValues['transfer'];
    $category = $transactionValues['category'];
    $sub_category = $transactionValues['sub_category'];
    $mode = $transactionValues['mode'];
    $description = $transactionValues['description'];
    $amount = $transactionValues['amount'];

        // Get the previous balance
    $getPreviousBalanceQuery = "SELECT balance FROM transaction ORDER BY id DESC LIMIT 1";
    $result = mysqli_query($con, $getPreviousBalanceQuery);
    if ($result && mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        $previous_balance = $row['balance'];
    } else {
        // No previous balance, set it to 0
        $previous_balance = 0;
    }

    // Calculate new balance
    if ($transfer === 'Income') {
        $newBalance = $previous_balance + $amount;
    } else if ($transfer === 'Expense') {
        $newBalance = $previous_balance - $amount;
    }
    $newBalance = abs($newBalance);

    $insertTransactionQuery = "INSERT INTO transaction (user_id, tran_date, transfer_method, category, sub_category, mode, trans_description, amount, balance)  VALUES ('{$user_id}', '{$date}', '{$transfer}', '{$category}', '{$sub_category}', '{$mode}', '{$description}', $amount, $newBalance)";
    if (mysqli_query($con, $insertTransactionQuery)) {
        $data = array(
            'success' => true,
            'message' => "Your transaction added successffully."
        );
    } else {
        $data = array (
            'success'=> false,
            'message' => "Sorry something went wrong, Please try later..."
        );
    }

    echo json_encode($data);
}
$input=file_get_contents("php://input");
$transactionValues = json_decode($input,true);

addTransactions($con, $transactionValues);


?>
