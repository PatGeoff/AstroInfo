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


function createDateWithTime(set) {
    // Get today's date
    const today = new Date();

    // Split the "set" time into hours and minutes
    const [hours, minutes] = set[0].split(':').map(Number);

    // Create a new date object with today's date
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes);

    // Check if the time is before noon
    if (hours < 12) {
        // If before noon, set the date to tomorrow
        date.setDate(date.getDate() + 1);
    }
    console.log(date);
    return date;
}

function constructApiUrlJpl(rise, set, body) {
    // Define the planet number
    const id = bodies[body];

    const today = new Date();

    // Split the rise time into hours and minutes
    const [hours, minutes] = rise[0].split(':').map(Number);

    // Set start time to today at the specified time
    const start = new Date(today); // Clone today's date
    start.setHours(hours, minutes, 0, 0); // Set hours and minutes

    //console.log('Start Time:', start);

    // Determine if Daylight Saving Time is in effect
    const isDST = (start.getTimezoneOffset() < today.getTimezoneOffset());

    // Adjust for UTC
    const offset = isDST ? 4 : 5; // Use 4 for EDT, 5 for EST

    // Adjust start time for UTC
    const startUTC = new Date(start.getTime() - (offset * 60 * 60 * 1000));

    const stopTimeDate = createDateWithTime(set);
    //onsole.log('Stop Time Date:', stopTimeDate);

    if (!(stopTimeDate instanceof Date) || isNaN(stopTimeDate.getTime())) {
        throw new Error(`Invalid stop time generated from set: ${set}`);
    }

    // Adjust stop time for UTC
    const stopTimeUTC = new Date(stopTimeDate.getTime() - (offset * 60 * 60 * 1000));
    const stopTime = stopTimeUTC.toISOString();

    const params = `format=text&COMMAND='${id}'&OBJ_DATA=YES&MAKE_EPHEM=YES&EPHEM_TYPE=OBSERVER&CENTER=coord@399&SITE_COORD='286.42,45.5017,0'&START_TIME='${encodeURIComponent(startUTC.toISOString())}'&STOP_TIME='${encodeURIComponent(stopTime)}'&STEP_SIZE='20m'&QUANTITIES='4,9,10,29,43'&TIME_ZONE=-5`;

    return params;
}

function constructApiUrlIST(body) {
    // Get today's date
    const today = new Date();

    // Extract day, month, and year
    const day = today.getDate(); // Day of the month (1-31)
    const month = today.getMonth() + 1; // Month (0-11, so add 1)
    const year = today.getFullYear(); // Full year (e.g., 2024)

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

        startTime = dataits.rise;
        stopTime = dataits.set;


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
        //console.log(jplData);


        const datajpl = getValuesJpl(extractTextBetweenMarkersJPL(jplData), startTime[0], stopTime[0]);
        console.log(datajpl.startVisAzimuth);
        console.log(datajpl.endVisAzimuth);
        const graphName = `${body}_graph`;
        drawElevationGraph(datajpl.elevation, datajpl.azimuth, datajpl.startVisAzimuth, datajpl.endVisAzimuth, graphName);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function getValuesJpl(data, startVisTime, endVisTime) {

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
    let startVisAzimuth = "";
    let endVisAzimuth = "";

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
            startVisAzimuth = getHour(values[1]) === startHour ? values[3] : startVisAzimuth;
            endVisAzimuth = getHour(values[1]) === endHour ? values[3] : endVisAzimuth;
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
            startVisAzimuth = getHour(values[1]) === startHour ? values[2] : startVisAzimuth;
            endVisAzimuth = getHour(values[1]) === endHour ? values[2] : endVisAzimuth;
        } else {
            console.warn('Line skipped due to unexpected number of values:', line);
        }

    });

    // Remove the last digit if it is zero
    const removeTrailingZero = value => value.endsWith('0') ? value.slice(0, -1) : value;

    startVisAzimuth = removeTrailingZero(startVisAzimuth);
    endVisAzimuth = removeTrailingZero(endVisAzimuth);

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
        startVisAzimuth,
        endVisAzimuth
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

function drawElevationGraph(elevation, azimuth, startVisAz, endVisAz, graphName) {
    // Create data array with azimuth and elevation pairs
    const data = azimuth.map((az, index) => {
        return { azimuth: az, elevation: elevation[index] };
    });

    // Determine the SVG dimensions
    const svgWidth = 1200;
    const svgHeight = 600;
    const topMargin = 30; // Add a top margin to accommodate the text
    const padding = 20; // Add padding to the top of the graph

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
        return (index / (numValues - 1)) * svgWidth; // Scale to fit the SVG width
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

    console.log(azimuth);

    // Function to find the index with tolerance
    const findIndexWithTolerance = (array, value, tolerance = 0.0001) => {
        return array.findIndex(item => Math.abs(item - value) < tolerance);
    };

    // Add the vertical line at the specified azimuth
    let verticalAzimuthIndex = findIndexWithTolerance(azimuth, parseFloat(startVisAz));

    //console.log(verticalAzimuthIndex);
    if (verticalAzimuthIndex !== -1) {
        const verticalLineX = scaledAzimuth[verticalAzimuthIndex];
        const verticalLineY = scaledElevation[verticalAzimuthIndex];
        svg += `<line x1="${verticalLineX}" y1="${svgHeight}" x2="${verticalLineX}" y2="${svgHeight - (0.75 * svgHeight)}" style="stroke:grey;stroke-width:2"/>`;
    }

    // Add the text above the line

    // Add the vertical line at the specified azimuth
    verticalAzimuthIndex = findIndexWithTolerance(azimuth, parseFloat(endVisAz));

    if (verticalAzimuthIndex !== -1) {
        const verticalLineX = scaledAzimuth[verticalAzimuthIndex];
        const verticalLineY = scaledElevation[verticalAzimuthIndex];
        svg += `<line x1="${verticalLineX}" y1="${svgHeight}" x2="${verticalLineX}" y2="${svgHeight - (0.75 * svgHeight)}" style="stroke:grey;stroke-width:2"/>`;
    }


    // Add text for max elevation
    const maxElevationIndex = elevation.indexOf(maxElevation);
    const maxElevationX = scaledAzimuth[maxElevationIndex];
    const maxElevationY = scaledElevation[maxElevationIndex] - 100; // Position it above the max elevation point
    svg += `<text x="${500}" y="${maxElevationY}" text-anchor="middle" font-size="14px" fill="black">Élévation Max: ${maxElevation.toFixed(2)}</text>`;
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