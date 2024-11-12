// Function to get user input for dates and times
function getUserInput() {
    const startTime = "2024-11-11 18:00:00";
    const stopTime = "2024-11-12 06:00:00";
    return { startTime, stopTime };
}

// Function to construct the API URL with user input
function constructApiUrl(startTime, stopTime) {
    const baseUrl = "https://astroinfo:8890/proxy.php?format=text&COMMAND='499'&OBJ_DATA=YES&MAKE_EPHEM=YES&EPHEM_TYPE=OBSERVER&CENTER=coord@399&SITE_COORD='45.5017,-73.5673,0'";
    return `${baseUrl}&START_TIME='${encodeURIComponent(startTime)}'&STOP_TIME='${encodeURIComponent(stopTime)}'&STEP_SIZE='10m'&QUANTITIES='4,13,14,20'&TIME_ZONE=-5`;
}

// Function to fetch data from the API
async function fetchData() {
    const { startTime, stopTime } = getUserInput();
    const apiUrl = constructApiUrl(startTime, stopTime);

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const textData = await response.text();
        const data = JSON.parse(textData); // Parse the JSON data

        const times = data.map(entry => entry[0]); // Extract times
        const elevations = data.map(entry => entry[1]); // Extract elevations

        //console.log('Times:', times);
        //console.log('Elevations:', elevations);
        // Call drawElevationGraph for a specific SVG element
        drawElevationGraph(times, elevations, 'elevationGraph1'); // Change ID as needed

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


// Function to draw the SVG graph
// Function to draw the graph using D3.js
function drawElevationGraph(times, elevations) {
    // Parse time strings into Date objects
    const parseTime = d3.timeParse("%H:%M");
    const timeData = times.map(time => parseTime(time));

    // Set dimensions and margins for the graph
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 150 - margin.top - margin.bottom;

    // Create an SVG container
    const svg = d3.select("#elevationGraph1") // Use the ID of your SVG
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create scales
    const xScale = d3.scaleTime()
        .domain(d3.extent(timeData)) // Set the domain based on time data
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain([d3.min(elevations), d3.max(elevations)]) // Set the domain based on elevations
        .range([height, 0]);

    // Create the line generator
    const line = d3.line()
        .x((d, i) => xScale(timeData[i]))
        .y(d => yScale(d));

    // Append the line to the SVG
    svg.append("path")
        .datum(elevations) // Bind the elevation data
        .attr("class", "line")
        .attr("d", line) // Generate the line path
        .style("fill", "none")
        .style("stroke", "blue") // Change color as needed
        .style("stroke-width", 2);

    // Add axes
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale).ticks(5)); // Adjust ticks as needed

    svg.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(yScale));
}


function listAllIds() {
    const allElements = document.querySelectorAll('*'); // Select all elements
    const ids = [];

    allElements.forEach(element => {
        if (element.id) {
            ids.push(element.id); // Add the ID to the array if it exists
        }
    });

    console.log('List of IDs in the HTML:', ids);
}

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    listAllIds();
});

function isD3Loaded() {
    return typeof d3 !== 'undefined';
}



// Fetch data when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");
    setTimeout(() => {
        fetchData();
    }, 100); // Delay of 100 milliseconds
    // Usage
    if (isD3Loaded()) {
    console.log("D3.js is loaded!");
    } else {
    console.log("D3.js is not loaded.");
    }
});