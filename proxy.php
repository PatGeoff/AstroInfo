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
    echo json_encode(['error' => 'Error: ' . curl_error($ch)]);
    exit;
}

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
    
    // Trim and split the data into lines
    $lines = explode("\n", trim($dataBetween));
    $data = []; // Array to hold the extracted data

    foreach ($lines as $line) {
        $line = trim($line); // Trim each line
        $parts = preg_split('/\s+/', $line); // Split by whitespace
        if (count($parts) > 1) {
            $time = $parts[1]; // Get the time (second part)
            $elevation = isset($parts[3]) ? (float)$parts[3] : null; // Get the elevation (fourth part)
            $mag = isset($parts[4]) ? (float)$parts[4] : null; // Get the magnitude (fifth part)
            $angDiam = isset($parts[5]) ? (float)$parts[5] : null; // Get the angular diameter (sixth part)
            $const = isset($parts[6]) ? $parts[6] : null; // Get the constellation (seventh part)
            $angle = isset($parts[7]) ? (float)$parts[7] : null; // Get the angle (eighth part)
    
            if ($elevation !== null && $mag !== null && $angDiam !== null && $const !== null && $angle !== null) {
                $data[] = [
                    'time' => $time,
                    'elevation' => $elevation,
                    'magnitude' => $mag,
                    'angular_diameter' => $angDiam,
                    'constellation' => $const,
                    'angle' => $angle
                ]; // Add all values 
            }
        }
    }

    // Output the data as a JSON array
    echo json_encode($data);
} else {
    echo json_encode(['error' => 'Markers not found in the response.']);
}

// Close cURL
curl_close($ch);

// Flush the output buffer
ob_end_flush();
?>
