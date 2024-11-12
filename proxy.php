<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('memory_limit', '1024');

// Start output buffering
ob_start();

// Set the URL of the API you want to access
$apiUrl = 'https://ssd.jpl.nasa.gov/api/horizons.api';

// Get the parameters from the request
$params = $_SERVER['QUERY_STRING'];

// Initialize cURL
$ch = curl_init();

// Set the URL and other options
curl_setopt($ch, CURLOPT_URL, $apiUrl . '?' . $params);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Return the response as a string

// Execute the request
$response = curl_exec($ch);

// Check for cURL errors
if (curl_errno($ch)) {
    echo 'Error: ' . curl_error($ch);
} else {
    // Set the content type to plain text
    header('Content-Type: text/plain'); 

    // Find the start and end markers
    $startMarker = '$$SOE';
    $endMarker = '$$EOE';

    $startPos = strpos($response, $startMarker);
    $endPos = strpos($response, $endMarker);

    if ($startPos !== false && $endPos !== false) {
        // Extract the data between the markers
        $startPos += strlen($startMarker); // Move to the end of the start marker
        $length = $endPos - $startPos; // Calculate the length of the data
        $dataBetween = substr($response, $startPos, $length);
        
        // Trim and output the extracted data
        $trimmedData = trim($dataBetween);
        echo nl2br($trimmedData); // nl2br to convert new lines to <br> for HTML output
    } else {
        echo "Markers not found in the response.";
    }
}

// Close cURL
curl_close($ch);

// Flush the output buffer
ob_end_flush();
?>
