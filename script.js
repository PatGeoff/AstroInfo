// Function to get user input for dates and times

let data;

// Global date variable for testing
const testDate = new Date(2024, 11, 28); // Example: December 25, 2024 (months are zero-indexed)


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

const azimuthLabels = [
    { range: [0, 22.5], label: "Nord" },
    { range: [22.5, 67.5], label: "Nord-Est" },
    { range: [67.5, 112.5], label: "Est" },
    { range: [112.5, 157.5], label: "Sud-Est" },
    { range: [157.5, 202.5], label: "Sud" },
    { range: [202.5, 247.5], label: "Sud-Ouest" },
    { range: [247.5, 292.5], label: "Ouest" },
    { range: [292.5, 337.5], label: "Nord-Ouest" },
    { range: [337.5, 360], label: "Nord" } // Wrap around to North
];


// Function to create a date with a specific time
function createDateWithTime(set) {
    // Split the "set" time into hours and minutes
    const [hours, minutes] = set[0].split(':').map(Number);

    // Create a new date object with the global test date
    const date = new Date(testDate.getFullYear(), testDate.getMonth(), testDate.getDate(), hours, minutes);

    // Check if the time is before noon
    if (hours < 12) {
        // If before noon, set the date to tomorrow
        date.setDate(date.getDate() + 1);
    }
    console.log(date);
    return date;
}

// Function to construct API URL for JPL
function constructApiUrlJpl(rise, set, body) {
    // Define the planet number
    const id = bodies[body];

    // Split the rise time into hours and minutes
    const [hours, minutes] = rise[0].split(':').map(Number);

    // Set start time to the global test date at the specified time
    const start = new Date(testDate); // Clone the global test date
    start.setHours(hours, minutes, 0, 0); // Set hours and minutes

    // Determine if Daylight Saving Time is in effect
    const isDST = (start.getTimezoneOffset() < testDate.getTimezoneOffset());

    // Adjust for UTC
    const offset = isDST ? 4 : 5; // Use 4 for EDT, 5 for EST

    // Adjust start time for UTC
    const startUTC = new Date(start.getTime() - (offset * 60 * 60 * 1000));

    const stopTimeDate = createDateWithTime(set);
    //console.log('Stop Time Date:', stopTimeDate);

    if (!(stopTimeDate instanceof Date) || isNaN(stopTimeDate.getTime())) {
        throw new Error(`Invalid stop time generated from set: ${set}`);
    }

    // Adjust stop time for UTC
    const stopTimeUTC = new Date(stopTimeDate.getTime() - (offset * 60 * 60 * 1000));
    const stopTime = stopTimeUTC.toISOString();

    const params = `format=text&COMMAND='${id}'&OBJ_DATA=YES&MAKE_EPHEM=YES&EPHEM_TYPE=OBSERVER&CENTER=coord@399&SITE_COORD='286.42,45.5017,0'&START_TIME='${encodeURIComponent(startUTC.toISOString())}'&STOP_TIME='${encodeURIComponent(stopTime)}'&STEP_SIZE='10m'&QUANTITIES='4,9,10,29,43'&TIME_ZONE=-5`;

    return params;
}

// Function to construct API URL for IST
function constructApiUrlIST(body) {
    // Extract day, month, and year from the global test date
    const day = testDate.getDate(); // Day of the month (1-31)
    const month = testDate.getMonth() + 1; // Month (0-11, so add 1)
    const year = testDate.getFullYear(); // Full year (e.g., 2024)

    const params = `start$=${day}&startmonth=${month}&startyear=${year}&ird=1&irs=1&ima=1&ipm=0&iph=0&ias=0&iss=0&iob=1&ide=0&ids=0&interval=4&tz=0&format=csv&rows=1&objtype=1&objpl=${body}&objtxt=${body}&town=6077243`;
    return params;
}

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

async function fetchData(body) {

    let baseUrl, params = "";

    // Prepare the first fetch
    baseUrl = 'https://in-the-sky.org/ephemeris.php';
    params = constructApiUrlIST(body);
    console.log(`${baseUrl}?${params}`);

    try {
        let requestString = `https://astroinfo:8890/proxy.php?baseUrl=${encodeURIComponent(baseUrl)}&params=${encodeURIComponent(params)}`
        //console.log(requestString);
        const itsResponse = await fetch(requestString);
        //console.log()
        if (!itsResponse.ok) {
            throw new Error('Network response was not ok for https://in-the-sky.org/ephemeris.php');
        }
        const itsData = await itsResponse.text();
        //console.log(itsData);

        const dataits = getValuesITS(itsData);

        // Rise and Set time of the planet, not to confuse with visibility. Doesn't mean it is visible because of daylight. 
        startTime = dataits.rise;
        stopTime = dataits.set;
        console.log(startTime);
        console.log(stopTime);

        // Prepare the second fetch using data from the first fetch
        baseUrl = 'https://ssd.jpl.nasa.gov/api/horizons.api';
        params = constructApiUrlJpl(startTime, stopTime, body);
        console.log(`${baseUrl}?${params}`);
        requestString = `https://astroinfo:8890/proxy.php?baseUrl=${encodeURIComponent(baseUrl)}&params=${encodeURIComponent(params)}`;
        //console.log(requestString);
        const jplResponse = await fetch(requestString);
        if (!jplResponse.ok) {
            throw new Error('Network response was not ok for https://ssd.jpl.nasa.gov/api/horizons.api');
        }
        const jplData = await jplResponse.text();

        // Get the values between the Rise and Set times from IPS query.
        const datajpl = getValuesJpl(extractTextBetweenMarkersJPL(jplData), startTime[0], stopTime[0], dataits.observable);

        const graphName = `${body}_graph`;
        drawElevationGraph(datajpl.elevation, datajpl.azimuth, datajpl.visibilityStartIndex, datajpl.visibilityEndIndex, datajpl.visibility, graphName);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function getValuesJpl(data, startVisTime, endVisTime, observable) {

    console.log(`startVisTime = ${startVisTime} and endVisTime = ${endVisTime}`);

    // Function to extract the hour part of the time string
    const getHour = time => parseInt(time.split(':')[0].trim(), 10);

    const startHour = getHour(startVisTime);
    const endHour = getHour(endVisTime);


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
    let visibilityStartIndex = null;
    let visibilityEndIndex = null;
    let visibility = true;

    lines.forEach(line => {
        let values = line.trim().split(/\s+/); // Split by whitespace and trim

        // Log the values to see how they are being split
        //console.log('Values:', values);

        if (values.length === 12) { // Handle lines with 12 values
            time.push(values[1]);
            azimuth.push(parseFloat(values[3]));
            elevation.push(parseFloat(values[4]));
            magnitude.push(parseFloat(values[5]));
            illumination.push(parseFloat(values[7]));
            constellation.push(values[8]);
            phi.push(values[9]);
            pabLon.push(parseFloat(values[10]));
            pabLat.push(parseFloat(values[11]));
        } else if (values.length === 11) { // Handle lines with 11 values
            time.push(values[1]);
            azimuth.push(parseFloat(values[2]));
            elevation.push(parseFloat(values[3]));
            magnitude.push(parseFloat(values[4]));
            illumination.push(parseFloat(values[6]));
            constellation.push(values[7]);
            phi.push(values[8]);
            pabLon.push(parseFloat(values[9]));
            pabLat.push(parseFloat(values[10]));
        } else {
            console.warn('Line skipped due to unexpected number of values:', line);
        }

    });

    function timeToMinutes(time) {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    }

    function findClosestIndex(array, target) {
        const targetMinutes = timeToMinutes(target);
        let closestIndex = 0;
        let minDiff = Math.abs(targetMinutes - timeToMinutes(array[0]));

        array.forEach((value, index) => {
            const diff = Math.abs(targetMinutes - timeToMinutes(value));
            if (diff < minDiff) {
                closestIndex = index;
                minDiff = diff;
            }
        });

        return closestIndex;
    }

    if (data.visibility !== "Not observable") {
        visibility = true;
        //console.log(observable);
        const [start, end] = observable[0].split("until").map(str => str.trim());
        visibilityStartIndex = findClosestIndex(time, start);
        visibilityEndIndex = findClosestIndex(time, end);
        console.log(`the value from In-The-Sky is ${start} and the closest value from JPL is  ${time[visibilityStartIndex]}`);
        console.log(`the value from In-The-Sky is ${end} and the closest value from JPL is  ${time[visibilityEndIndex]}`);
    }
    else {
        visibility = false;
    }


    console.log(`is visible: ${visibility}`);
    //console.log(time);
    //console.log(elevation);

    return {
        time,
        azimuth,
        elevation,
        magnitude,
        illumination,
        constellation,
        phi,
        pabLon,
        pabLat,
        visibilityStartIndex,
        visibilityEndIndex,
        visibility
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
    for (let i = 3; i < 4; i++) {
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

function getAzimuthLabel(azimuth) {
    for (const { range, label } of azimuthLabels) {
        if (azimuth >= range[0] && azimuth < range[1]) {
            return label;
        }
    }
    return "Unknown"; // Fallback
}

function drawElevationGraph(elevation, azimuth, visStartIndex, visEndIndex, visible, graphName) {
    // Create data array with azimuth and elevation pairs
    const data = azimuth.map((az, index) => {
        return { azimuth: az, elevation: elevation[index] };
    });

    // Determine the SVG dimensions
    const svgWidth = 1200;
    const svgHeight = 600;
    const topMargin = 30; // Add a top margin to accommodate the text
    const padding = 50; // Add padding to the left and right sides of the graph

    // Find the min and max elevation values
    const maxElevation = Math.max(...elevation);
    const minElevation = Math.min(...elevation);

    // Scale the elevation values to fit the SVG height
    const scaledElevation = elevation.map(elev => {
        return svgHeight - topMargin - padding - ((elev - minElevation) / (maxElevation - minElevation)) * (svgHeight - topMargin - padding) + 50;
    });

    // Number of values
    const numValues = azimuth.length;

    // Scale the azimuth values based on their index
    const scaledAzimuth = azimuth.map((_, index) => {
        return padding + (index / (numValues - 1)) * (svgWidth - 2 * padding); // Scale to fit the SVG width with padding
    });

    // Create SVG elements
    let svg = `<svg width="${svgWidth}" height="${svgHeight}">`;

    // Draw the path for the elevation graph using cubic Bézier curves
    let pathData = `M ${scaledAzimuth[0]},${scaledElevation[0]}`;
    for (let i = 1; i < numValues - 1; i++) {
        const xMid = (scaledAzimuth[i] + scaledAzimuth[i + 1]) / 2;
        const yMid = (scaledElevation[i] + scaledElevation[i + 1]) / 2;
        pathData += ` Q ${scaledAzimuth[i]},${scaledElevation[i]} ${xMid},${yMid}`;
    }
    pathData += ` T ${scaledAzimuth[numValues - 1]},${scaledElevation[numValues - 1]}`;
    svg += `<path d="${pathData}" style="fill:none;stroke:black;stroke-width:2"/>`;

    // Add x-axis labels for first, middle, and last azimuth values
    const labels = [
        { index: 0, label: getAzimuthLabel(azimuth[0]) },
        { index: Math.floor((numValues - 1) / 2), label: getAzimuthLabel(azimuth[Math.floor((numValues - 1) / 2)]) },
        { index: numValues - 1, label: getAzimuthLabel(azimuth[numValues - 1]) }
    ];

    labels.forEach(({ index, label }) => {
        let x = scaledAzimuth[index];

        // Adjust for left and right labels
        if (index === 0) {
            x += 60; // Add padding for the left label
        } else if (index === numValues - 1) {
            x -= 60; // Subtract padding for the right label
        }

        svg += `<text x="${x}" y="${svgHeight - 20}" text-anchor="middle">${label}</text>`;
    });

    // Add y-axis labels
    const yLabelInterval = (maxElevation - minElevation) / 5; // Adjust for more or fewer labels
    for (let i = 0; i <= 5; i++) {
        const yValue = minElevation + i * yLabelInterval;
        const yPos = svgHeight - topMargin - ((yValue - minElevation) / (maxElevation - minElevation)) * (svgHeight - topMargin);
        svg += `<text x="-15" y="${yPos}" font-size="10" text-anchor="end">${yValue.toFixed(1)}</text>`;
    }

    // Function to find the index with tolerance
    const findIndexWithTolerance = (array, value, tolerance = 0.0001) => {
        return array.findIndex(item => Math.abs(item - value) < tolerance);
    };

    if (visible) {
        // Add the vertical line at the specified azimuth
        if (visStartIndex !== 0) {
            const verticalLineX = scaledAzimuth[visStartIndex];
            svg += `<line x1="${verticalLineX}" y1="${svgHeight}" x2="${verticalLineX}" y2="0" style="stroke:grey;stroke-width:2"/>`;
        }

        // Add the vertical line at the specified azimuth
        if (visEndIndex !== 0) {
            const verticalLineX = scaledAzimuth[visEndIndex];
            svg += `<line x1="${verticalLineX}" y1="${svgHeight}" x2="${verticalLineX}" y2="0" style="stroke:grey;stroke-width:2"/>`;
        }
        svg += `<text x="${svgWidth / 2}" y="${svgHeight / 2}" text-anchor="middle" font-size="14px" fill="black">Visible en ce moment</text>`;
    }
    else {
        svg += `<text x="${svgWidth / 2}" y="${svgHeight / 2}" text-anchor="middle" font-size="14px" fill="black">NON visible en ce moment</text>`;
    }
    // Add text for max elevation
    const maxElevationIndex = elevation.indexOf(maxElevation);
    const maxElevationX = scaledAzimuth[maxElevationIndex];
    const maxElevationY = scaledElevation[maxElevationIndex] - 100; // Position it above the max elevation point
    svg += `<text x="${maxElevationX}" y="${maxElevationY}" text-anchor="middle" font-size="14px" fill="black">Élévation Max: ${maxElevation.toFixed(2)}</text>`;
    svg += `</svg>`;

    // Insert SVG into the DOM
    document.getElementById(graphName).innerHTML = svg;
}


function listAllIds() {
    const allElements = document.querySelectorAll('*'); // Select all elements
    const ids = [];

    allElements.forEach(element => {
        if (element.id) {
            ids.push(element.id); // Add the ID to the array if it exists
        }
    });

    //console.log('List of IDs in the HTML:', ids);
}
// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    listAllIds();
});


// Fetch data when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    //console.log("DOM fully loaded and parsed");
    setTimeout(() => {
        fetchData("venus");
        getIcon("venus");
    }, 100); // Delay of 100 milliseconds
    // Usage   
});