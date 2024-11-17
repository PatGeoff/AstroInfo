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

function constructApiUrlJpl(startTime, stopTime, body) {
    const id = bodies[body];
    const params = `format=text&COMMAND='${id}'&OBJ_DATA=YES&MAKE_EPHEM=YES&EPHEM_TYPE=OBSERVER&CENTER=coord@399&SITE_COORD='45.5017,-73.5673,0'&START_TIME='${encodeURIComponent(startTime)}'&STOP_TIME='${encodeURIComponent(stopTime)}'&STEP_SIZE='1h'&QUANTITIES='4,9,10,29,43,48'&TIME_ZONE=-5`;
    return params;
}

function constructApiUrlIST(startTime, stopTime, body) {
    // Get today's date
    const today = new Date();

    // Extract day, month, and year
    const day = today.getDate(); // Day of the month (1-31)
    const month = today.getMonth() + 1; // Month (0-11, so add 1)
    const year = today.getFullYear(); // Full year (e.g., 2024)

    const params = `start$=${day}&startmonth=${month}&startyear=${year}&ird=1&irs=1&ima=1&ipm=0&iph=0&ias=0&iss=0&iob=1&ide=0&ids=0&interval=4&tz=0&format=csv&rows=1&objtype=1&objpl=${body}&objtxt=${body}&town=6077243`;
    return params;
}

// function constructApiUrl(startTime, stopTime, body) {
//     const id = bodies[body];
//     console.log(id);
//     const baseUrl = `https://astroinfo:8890/proxy.php?format=text&COMMAND='${id}'&OBJ_DATA=YES&MAKE_EPHEM=YES&EPHEM_TYPE=OBSERVER&CENTER=coord@399&SITE_COORD='45.5017,-73.5673,0'`;
//     const apiUrl = `${baseUrl}&START_TIME='${encodeURIComponent(startTime)}'&STOP_TIME='${encodeURIComponent(stopTime)}'&STEP_SIZE='1h'&QUANTITIES='4,9,10,29,43,48'&TIME_ZONE=-5`;
//     console.log('Constructed API URL:', apiUrl); // Log the URL before returning it    
//     return apiUrl;
// }

async function getIcon(body) {
    const bodye = body.trim();
    let imagePath = "";
    if (body == "venus") {
        imagePath = `./images/${body}/${body}_01.png`;
        console.log(imagePath);
    }
    else if (body == "mercury") {
        imagePath = `./images/${body}/${body}_01.png`; // Adjusted path for the image
    }
    else if (body == "moon") {
        imagePath = `./images/${body}/${body}_01.png`; // Adjusted path for the image
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



// // Function to fetch data from the API
// async function fetchData(body) {
//     const { startTime, stopTime } = getTimeFrame();
//     const apiUrl = constructApiUrl(startTime, stopTime, body);

//     try {
//         const response = await fetch(apiUrl);
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const textData = await response.text();
//         data = JSON.parse(textData); // Parse the JSON data
//         console.log(data);
//         const times = data.map(entry => entry.time); // Extract times
//         const azimuth = data.map(entry => entry.azimuth); // Azimuth
//         const elevation = data.map(entry => entry.elevation); // Elevation
//         const magnitude = data.map(entry => entry.magnitude); // Magnitude
//         const illumination = data.map(entry => entry.illumination); // Illumination
//         const constellation = data.map(entry => entry.constellation); // Constellation
//         const phi = data.map(entry => entry.phi); // Phi
//         const pabLon = data.map(entry => entry.pabLon); // PAB-LON
//         const pabLat = data.map(entry => entry.pabLat); // PAB-LAT
//         const graphName = body + "_graph";

//         getIcon(body);


//         // Call drawElevationGraph for a specific SVG element
//         drawElevationGraph(times, elevation, graphName); // Change ID as needed

//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// }

async function fetchData(server, body) {
    const { startTime, stopTime } = getTimeFrame();
    let baseUrl, params = "";

    // Prepare the first fetch
    baseUrl = 'https://ssd.jpl.nasa.gov/api/horizons.api';
    params = constructApiUrlJpl(startTime, stopTime, body);
    const jplFetch = fetch(`https://astroinfo:8890/proxy.php?baseUrl=${encodeURIComponent(baseUrl)}&params=${encodeURIComponent(params)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok for https://ssd.jpl.nasa.gov/api/horizons.api');
            }
            return response.text(); // Use .text() to handle plain text
        })
        .then(data => {
            data = extractTextBetweenMarkersJPL(data);
            return getValuesJpl(data);
        });

    // Prepare the second fetch
    baseUrl = 'https://in-the-sky.org/ephemeris.php';
    params = constructApiUrlIST(startTime, stopTime, body);
    const itsFetch = fetch(`https://astroinfo:8890/proxy.php?baseUrl=${encodeURIComponent(baseUrl)}&params=${encodeURIComponent(params)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok for https://in-the-sky.org/ephemeris.php');
            }
            return response.text();
        })
        .then(data => {
            return getValuesITS(data);
        });

    try {
        // Wait for both fetches to complete
        const [datajpl, dataits] = await Promise.all([jplFetch, itsFetch]);

        //console.log(dataits); // Log the data from the second fetch

        const graphName = `${body}_graph`;
        drawElevationGraph(datajpl.time, datajpl.azimuth, graphName);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


function getValuesJpl(data) {
    let lines = data.split('\n'); // Split data into lines
    let time = [];
    let azimuth = [];
    let elevation = [];
    let magnitude = [];
    let illumination = [];
    let constellation = [];
    let phi = [];
    let pabLon = [];
    let pabLat = [];

    lines.forEach(line => {
        let values = line.trim().split(/\s+/); // Split by whitespace and trim

        if (values.length > 11) { // Ensure there are enough values
            time.push(values[1]); // Assuming time is at index 1
            azimuth.push(parseFloat(values[3])); // Convert to float
            elevation.push(parseFloat(values[4]));
            magnitude.push(parseFloat(values[5]));
            illumination.push(parseFloat(values[7]));
            constellation.push(parseFloat(values[8]));
            phi.push(values[9]); // String value
            pabLon.push(parseFloat(values[10]));
            pabLat.push(parseFloat(values[11]));
        }
    });

    return {
        time,
        azimuth,
        elevation,
        magnitude,
        illumination,
        constellation,
        phi,
        pabLon,
        pabLat
    };
}

function extractTextBetweenMarkersJPL(data) {
    const startMarker = "$$SOE";
    const endMarker = "$$EOE";

    const startIndex = data.indexOf(startMarker);
    const endIndex = data.indexOf(endMarker);

    if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
        return null; // Return null if markers are not found or in the wrong order
    }

    return data.substring(startIndex + startMarker.length, endIndex).trim();
}

function getValuesITS(data) {
    // Split the data into lines
    const lines = data.trim().split('\n');

    // Initialize arrays for Rise, Culm, Set, and Observable
    const rise = [];
    const culm = [];
    const set = [];
    const observable = [];

    // Loop through each line (skipping the header)
    for (let i = 2; i < lines.length; i++) {
        const values = lines[i].replace(/"/g, '').split(','); // Remove quotes and split by comma

        // Extract the relevant values
        rise.push(values[11]); // Rise time
        culm.push(values[12]); // Culmination time
        set.push(values[13]); // Set time
        observable.push(values[15]); // Observable time
    };
    return {
        rise,
        culm,
        set,
        observable
    };
}

// Function to draw the SVG graph
// Function to draw the graph using D3.js
// function drawElevationGraph(times, elevation, graphName) {
//     const parseTime = d3.timeParse("%H:%M");
//     const timeData = times.map(time => parseTime(time));
//     console.log('Parsed Time Data:', timeData);
//     const margin = { top: 20, right: 30, bottom: 30, left: 40 };

//     // Create an SVG container
//     const svg = d3.select(`#${graphName}`);

//     // Function to render the graph
//     function render() {
//         const width = parseInt(svg.style("width")) - margin.left - margin.right;
//         const height = parseInt(svg.style("height")) - margin.top - margin.bottom;

//         svg.selectAll("*").remove(); // Clear previous content

//         const g = svg.append("g")
//             .attr("transform", `translate(${margin.left},${margin.top})`);

//         const xScale = d3.scaleTime()
//             .domain(d3.extent(timeData))
//             .range([0, width]);

//         const yScale = d3.scaleLinear()
//             .domain([d3.min(elevation), d3.max(elevation)])
//             .range([height, 0]);

//         const line = d3.line()
//             .x((d, i) => xScale(timeData[i]))
//             .y(d => yScale(d));

//         g.append("path")
//             .datum(elevation)
//             .attr("class", "line")
//             .attr("d", line)
//             .style("fill", "none")
//             .style("stroke", "blue")
//             .style("stroke-width", 2);

//         g.append("g")
//             .attr("class", "x-axis")
//             .attr("transform", `translate(0,${height})`)
//             .call(d3.axisBottom(xScale).ticks(5));

//         g.append("g")
//             .attr("class", "y-axis")
//             .call(d3.axisLeft(yScale));
//     }

//     render(); // Initial render

//     // Listen for window resize
//     window.addEventListener("resize", render);
// }
function drawElevationGraph(times, elevation, graphName) {
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

        // Use scalePoint for categorical x-axis
        const xScale = d3.scalePoint()
            .domain(times) // Use time strings directly
            .range([0, width]);

        const yScale = d3.scaleLinear()
            .domain([d3.min(elevation), d3.max(elevation)])
            .range([height, 0]);

        const line = d3.line()
            .x((d, i) => xScale(times[i])) // Use time strings for x position
            .y(d => yScale(d));

        g.append("path")
            .datum(elevation)
            .attr("class", "line")
            .attr("d", line)
            .style("fill", "none")
            .style("stroke", "blue")
            .style("stroke-width", 2);

        g.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(xScale).ticks(times.length)); // Adjust ticks as needed

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
        fetchData("jpl", "venus");
    }, 100); // Delay of 100 milliseconds
    // Usage
    if (isD3Loaded()) {
        console.log("D3.js is loaded!");
    } else {
        console.log("D3.js is not loaded.");
    }
});