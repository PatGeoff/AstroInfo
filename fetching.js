// fetching.js

import { drawElevationGraph } from "./graph.js";


let data;

// Global date variable for testing
const annee = 2024;
const mois = 12; // mois de 1 à 12 mais dans une Date c,est 0-11
const jour = 1;
const testDate = new Date(annee, mois - 1, jour); // Example: December 25, 2024 (months are zero-indexed)


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


export const planets = {
    sun: "Soleil",
    moon: "Lune",
    mercury: "Mercure",
    venus: "Vénus",
    earth: "Terre",
    mars: "Mars",
    jupiter: "Jupiter",
    saturn: "Saturne",
    uranus: "Uranus",
    neptune: "Neptune"
}

// Function to construct API URL for IST
export function constructApiUrlIST(body) {
    // Extract day, month, and year from the global test date
    const day = testDate.getDate(); // Day of the month (1-31)
    const month = testDate.getMonth() + 1; // Month (0-11, so add 1)
    const year = testDate.getFullYear(); // Full year (e.g., 2024)

    const params = `startday=${day}&startmonth=${month}&startyear=${year}&ird=1&irs=1&ima=1&ipm=0&iph=0&ias=0&iss=0&iob=1&ide=0&ids=0&interval=4&tz=0&format=csv&rows=1&objtype=1&objpl=${body}&objtxt=${body}&town=6077243`;
    return params;
}

// async function getIcon(body) {
//     const bodye = body.trim();
//     let imagePath = "";
//     if (body == "venus") {
//         imagePath = `./images/${body}/${body}_01.png`;
//         console.log(imagePath);
//     }
//     else if (body == "mercury") {
//         imagePath = `./images/${body}/${body}_01.png`; // Adjusted path for the image
//     }
//     else if (body == "mars") {
//         imagePath = `./images/${body}/${body}_01.png`; // Adjusted path for the image
//     }
//     // Construct the image path based on the body
//     // Select the image element by ID
//     const imgElement = document.getElementById(`${body}_icon`);
//     // Set the src attribute to the new image path
//     imgElement.src = imagePath;

//     // Flag to prevent multiple error logs
//     let hasLoggedError = false;

//     // Error handling if the image doesn't load
//     imgElement.onerror = () => {
//         if (!hasLoggedError) {
//             console.error(`Image not found: ${imagePath}`);
//             hasLoggedError = true; // Set the flag to true after logging
//         }
//         imgElement.src = './images/default-icon.png'; // Fallback image
//     };
// }


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
export function constructApiUrlJpl(rise, set, body) {
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

        //console.log(dataits.ra);
        //console.log(dataits.dec);

        // Rise and Set time of the planet, not to confuse with visibility. Doesn't mean it is visible because of daylight. 
        const startTime = dataits.rise;
        const stopTime = dataits.set;
        //console.log(startTime);
        //console.log(stopTime);

        // Set the RA and DEC of the planets in the widgets
        let divId = `${body}_text1`;
        document.getElementById(divId).innerHTML = `
            <p>
                <strong><u class="large-text">${planets[body]}</u></strong><br>
                <span class="small-text">${dataits.ra}</span><br>
                <span class="small-text">${dataits.dec}</span>
            </p>`;

        // Get the visibility status
        let vis = (dataits.observable[0] === "Not observable") ? "Non Visible" : "Visible";
        console.log(vis);
        //  Set the visibility in the div
        divId = `${body}_text2`;
        document.getElementById(divId).innerHTML = `
            <p>
                <strong class="large-text">${vis}</strong><br>
                <span class="small-text">Mag: ${dataits.magnitude}</span><br>
            </p>`;

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
        drawElevationGraph(datajpl.elevation, datajpl.azimuth, datajpl.visibilityStartIndex, datajpl.visibilityEndIndex, datajpl.visibility, datajpl.time, graphName);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function getValuesJpl(data, startVisTime, endVisTime, observable) {

    //console.log(`startVisTime = ${startVisTime} and endVisTime = ${endVisTime}`);

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
    let diameter = [];
    let constellation = [];
    let phi = [];
    let pabLon = [];
    let pabLat = [];
    let visibilityStartIndex = null;
    let visibilityEndIndex = null;
    let visibility = null;

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

    //console.log(observable[0]);

    if (observable[0] !== "Not observable") {
        visibility = true;
        //console.log(observable);
        const [start, end] = observable[0].split("until").map(str => str.trim());
        visibilityStartIndex = findClosestIndex(time, start);
        visibilityEndIndex = findClosestIndex(time, end);
        //console.log(`the value from In-The-Sky is ${start} and the closest value from JPL is  ${time[visibilityStartIndex]}`);
        //console.log(`the value from In-The-Sky is ${end} and the closest value from JPL is  ${time[visibilityEndIndex]}`);
    }
    else {
        visibility = false;
    }
    //console.log(`is visible: ${visibility}`);
    //console.log(time);
    //console.log(elevation);

    // for (let i = 0; i < time.length; i++) {
    //     console.log(`Index ${i}: time = ${time[i]}, elevation = ${elevation[i]}`);
    // }

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

export function getValuesITS(data) {
    // Split the data into lines
    const lines = data.trim().split('\n');
    //console.log(data);
    // Initialize arrays for Rise, Culm, Set, and Observable
    const ra = [];
    const dec = [];
    const rise = [];
    const culm = [];
    const set = [];
    const magnitude = [];
    const observable = []

    // Loop through each line (skipping the header)
    for (let i = 3; i < 4; i++) {
        const values = lines[i].replace(/"/g, '').split(','); // Remove quotes and split by comma

        // Extract the relevant values
        ra.push(`${values[5]}:${values[6]}:${values[7]}`);
        dec.push(`${values[8]}:${values[9]}:${values[10]}`);
        rise.push(values[11]); // Rise time
        culm.push(values[12]); // Culmination time
        set.push(values[13]); // Set time
        magnitude.push(values[14]);
        observable.push(values[15]); // Observable time
    };
    return {
        ra,
        dec,
        rise,
        culm,
        set,
        magnitude,
        observable
    };
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


document.addEventListener('DOMContentLoaded', async () => {
    try {
        //await getIcon("mercury");
        //await getIcon("venus");
        //await getIcon("mars");
        //await fetchData("mercury");
        //await fetchData("venus");
        //await fetchData("mars");

    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
//