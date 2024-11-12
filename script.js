function drawSineWave(svgElement, amplitude, frequency) {
    const width = 400; // Fixed width for the viewBox
    const height = 150; // Fixed height for the viewBox
    let pathData = 'M 0 ' + (height / 2); // Start point

    // Create points for the sine wave
    for (let x = 0; x <= width; x++) {
        const y = (height / 2) + amplitude * Math.sin(frequency * x);
        pathData += ` L ${x} ${y}`;
    }

    // Create the sine wave path
    const sineWavePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    sineWavePath.setAttribute("d", pathData);
    sineWavePath.setAttribute("stroke", "#4CAF50");
    sineWavePath.setAttribute("fill", "none");
    sineWavePath.setAttribute("stroke-width", "2");

    // Clear previous content and append the path to the SVG
    svgElement.innerHTML = '';
    svgElement.appendChild(sineWavePath);
}

// Get all SVG elements and draw the sine waves
const svgElements = document.querySelectorAll('.sineWave');
svgElements.forEach((svg, index) => {
    drawSineWave(svg, 50, 0.05 + index * 0.01); // Different frequency for each wave
});

// Redraw on window resize
window.addEventListener('resize', () => {
    svgElements.forEach((svg, index) => {
        drawSineWave(svg, 50, 0.05 + index * 0.01);
    });
});

// Function to get user input for dates and times
function getUserInput() {
    const startTime = "2024-11-11 18:00:00";
    const stopTime = "2024-11-12 06:00:00";
    return { startTime, stopTime };
}

// // Function to construct the API URL with user input
// function constructApiUrl(startTime, stopTime) {
//     const baseUrl = "https://astroinfo:8890/proxy.php?format=text&COMMAND='499'&OBJ_DATA=YES&MAKE_EPHEM=YES&EPHEM_TYPE=OBSERVER&CENTER=coord@399&SITE_COORD='45.5017,-73.5673,0'";
//     return `${baseUrl}&START_TIME='${encodeURIComponent(startTime)}'&STOP_TIME='${encodeURIComponent(stopTime)}'&STEP_SIZE='10m'QUANTITIES='4,13,14,20'&TIME_ZONE=-5`;
// }

// Function to construct the API URL with user input
function constructApiUrl(startTime, stopTime) {
    const baseUrl = "https://astroinfo:8890/proxy.php?format=text&COMMAND='499'&OBJ_DATA=YES&MAKE_EPHEM=YES&EPHEM_TYPE=OBSERVER&CENTER=coord@399&SITE_COORD='45.5017,-73.5673,0'";
    return `${baseUrl}&START_TIME='${encodeURIComponent(startTime)}'&STOP_TIME='${encodeURIComponent(stopTime)}'&STEP_SIZE='10m'QUANTITIES='4,13,14,20'&TIME_ZONE=-5`;
}


// Function to fetch data from the API
async function fetchData() {
    const { startTime, stopTime } = getUserInput(); // Get user input
    const apiUrl = constructApiUrl(startTime, stopTime); // Construct the URL

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            mode: 'cors'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const textData = await response.text(); // Get response as text
        console.log(textData); // Log the raw text response

        // // Check for error messages in the text data
        // if (textData.includes("API VERSION")) {
        //     console.error('Error from API:', textData);
        //     return; // Exit if there's an error
        // }

        // Process the text data as needed
        // For example, you might need to parse it manually if it's structured data

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


// Call the function to fetch data
fetchData();
