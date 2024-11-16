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
        $parts = array_map('trim', $parts); // Trim each part
        if (count($parts) > 1) {
            $time = $parts[1]; // Get the time (second part)
            $azimuth =  (float) $parts[3]; // Get the azimuth
            $elevation = isset($parts[4]) ? (float) $parts[4] : null; // Get the elevation 
            $magnitude = isset($parts[5]) ? (float) $parts[5] : null; // Get the magnitude 
            $illumination = isset($parts[7]) ? (float) $parts[7] : null; // Get the angular diameter 
            $constellation = isset($parts[8]) ? $parts[8] : null; // Get the constellation 
            $phi = isset($parts[9]) ? (float) $parts[9] : null; // Get the angle 
            $pabLon = isset($parts[10]) ? (float) $parts[10] : null; // Get the angle 
            $pabLat = isset($parts[11]) ? (float) $parts[11] : null; // Get the angle 

            try {
                $data[] = [
                    'time' => $time,
                    'azimuth' => $azimuth,
                    'elevation' => $elevation,
                    'magnitude' => $magnitude,
                    'illumination' => $illumination,
                    'constellation' => $constellation,
                    'phi' => $phi,
                    'pabLon' => $pabLon,
                    'pabLat' => $pabLat
                ]; // Add all values }            
            } catch (Exception $e) {
                // Handle the exception
                echo 'Caught exception: ', $e->getMessage(), "\n";
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