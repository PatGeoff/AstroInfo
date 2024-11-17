<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('memory_limit', '1024');

// Start output buffering
ob_start();

header("Access-Control-Allow-Origin: *");
header("Content-Type: text/plain"); // Change to text/plain if needed

// Get the base URL and parameters from the query
$baseUrl = $_GET['baseUrl'];
$params = $_GET['params'] ?? ''; // Optional parameters


    // Construct the full URL with parameters
    $fullUrl = $baseUrl . '?' . $params;
    error_log("Full URL: " . $fullUrl); // Log the full URL for debugging

    // Initialize cURL
    $ch = curl_init($fullUrl);
    if ($ch === false) {
        echo json_encode(["error" => "Failed to initialize cURL"]);
        exit;
    }

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, false);

    // Execute the request
    $response = curl_exec($ch);
    if ($response === false) {
        echo json_encode(["error" => curl_error($ch), "http_code" => curl_getinfo($ch, CURLINFO_HTTP_CODE)]);
    } else {
        echo $response;
    }

    curl_close($ch);


// Flush the output buffer
ob_end_flush();
?>