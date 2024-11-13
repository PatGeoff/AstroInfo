// Function to get user input for dates and times

let data;

const bodies = {
    sun: 10,
    moon: 301,
    mercury: 199,
    venus: 299,
    earth: 399,
    mars: 499,
    jupiter: 599,
    saturn: 699,
    uranus: 799,
    neptune: 899
};


function getTimeFrame() {
    const today = new Date();
    
    // Set start time to today at midnight
    const startTime = new Date(today.setHours(0, 0, 0, 0)).toISOString(); // Today at 00:00:00
    // Set stop time to tomorrow at noon
    const stopTime = new Date(today.setDate(today.getDate() + 1)).setHours(12, 0, 0, 0); // Tomorrow at 12:00:00

    return { 
        startTime: new Date(startTime).toISOString(), 
        stopTime: new Date(stopTime).toISOString() 
    };
}


// //Function to construct the API URL with user input without planet
// function constructApiUrl(startTime, stopTime) {
//     const baseUrl = "https://astroinfo:8890/proxy.php?format=text&COMMAND='499'&OBJ_DATA=YES&MAKE_EPHEM=YES&EPHEM_TYPE=OBSERVER&CENTER=coord@399&SITE_COORD='45.5017,-73.5673,0'";  // Mars
//     return `${baseUrl}&START_TIME='${encodeURIComponent(startTime)}'&STOP_TIME='${encodeURIComponent(stopTime)}'&STEP_SIZE='10m'&QUANTITIES='4,9,13,14,20,43'&TIME_ZONE=-5`;
// }



function constructApiUrl(startTime, stopTime, body) {
    const id = bodies[body];
    const baseUrl = `https://astroinfo:8890/proxy.php?format=text&COMMAND='${id}'&OBJ_DATA=YES&MAKE_EPHEM=YES&EPHEM_TYPE=OBSERVER&CENTER=coord@399&SITE_COORD='45.5017,-73.5673,0'`;    
    const apiUrl = `${baseUrl}&START_TIME='${encodeURIComponent(startTime)}'&STOP_TIME='${encodeURIComponent(stopTime)}'&STEP_SIZE='10m'&QUANTITIES='4,9,13,14,20,43'&TIME_ZONE=-5`;    
    console.log('Constructed API URL:', apiUrl); // Log the URL before returning it    
    return apiUrl;
}

async function getIcon(body) {
    const imagePath = "";
    if (body == "venus"){
        if (data.angle == 0){
            
        }
        imagePath = `./images/${body}/${body}_01.png`; // Adjusted path for the image
    }
    else if (body == "mercury"){
        imagePath = `./images/${body}/${body}_01.png`; // Adjusted path for the image
    }
    else if (body == "moon"){
        imagePath = `./images/${body}/${body}_01.png`; // Adjusted path for the image
    }
    else{

    }
    // Construct the image path based on the body
     

    // Select the image element by ID
    const imgElement = document.getElementById(`${body}_icon`);

    // Set the src attribute to the new image path
    imgElement.src = imagePath;

    // Flag to prevent multiple error logs
    let hasLoggedError = false;

    // Error handling if the image doesn't load
    imgElement.onerror = () => {
        if (!hasLoggedError) {
            console.error(`Image not found: ${imagePath}`);
            hasLoggedError = true; // Set the flag to true after logging
        }
        imgElement.src = './images/default-icon.png'; // Fallback image
    };
}



// Function to fetch data from the API
async function fetchData(body) {
    const { startTime, stopTime } = getTimeFrame();
    const apiUrl = constructApiUrl(startTime, stopTime, body);

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const textData = await response.text();
        data = JSON.parse(textData); // Parse the JSON data
        console.log(data);
        const times = data.map(entry => entry[0]); // Extract times
        const elevations = data.map(entry => entry[1]); // Extract elevations
        const magnitude = data.map(entry => entry[2]);
        const diameter = data.map(entry => entry[3]);
        const constellation = data.map(entry => entry[4]);
        const angle = data.map(entry => entry[5]);
        const graphName = body + "_graph";

        getIcon(body);


        // Call drawElevationGraph for a specific SVG element
        drawElevationGraph(times, elevations, graphName); // Change ID as needed

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


// Function to draw the SVG graph
// Function to draw the graph using D3.js
function drawElevationGraph(times, elevations, graphName) {
    const parseTime = d3.timeParse("%H:%M");
    const timeData = times.map(time => parseTime(time));

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    // Create an SVG container
    const svg = d3.select(`#${graphName}`);
    
    // Function to render the graph
    function render() {
        const width = parseInt(svg.style("width")) - margin.left - margin.right;
        const height = parseInt(svg.style("height")) - margin.top - margin.bottom;

        svg.selectAll("*").remove(); // Clear previous content

        const g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const xScale = d3.scaleTime()
            .domain(d3.extent(timeData))
            .range([0, width]);

        const yScale = d3.scaleLinear()
            .domain([d3.min(elevations), d3.max(elevations)])
            .range([height, 0]);

        const line = d3.line()
            .x((d, i) => xScale(timeData[i]))
            .y(d => yScale(d));

        g.append("path")
            .datum(elevations)
            .attr("class", "line")
            .attr("d", line)
            .style("fill", "none")
            .style("stroke", "blue")
            .style("stroke-width", 2);

        g.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(xScale).ticks(5));

        g.append("g")
            .attr("class", "y-axis")
            .call(d3.axisLeft(yScale));
    }

    render(); // Initial render

    // Listen for window resize
    window.addEventListener("resize", render);
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
        fetchData("venus");
    }, 100); // Delay of 100 milliseconds
    // Usage
    if (isD3Loaded()) {
    console.log("D3.js is loaded!");
    } else {
    console.log("D3.js is not loaded.");
    }
});