<?php
// Start the session
session_start();

// Clear the session data
$_SESSION = array();

// Destroy the session
session_destroy();

// Return a success response as JSON
echo json_encode(['success' => true]);
?>
