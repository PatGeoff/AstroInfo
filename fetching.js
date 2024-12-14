// fetching.js

import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

// Enlever ça lors du déploiement
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

let data;

// Global date variable for testing
const annee = 2024;
const mois = 22; // mois de 1 à 12 mais dans une Date c','est 0-11
const jour = 6;
//const testDate = new Date(annee, mois - 1, jour); // Example: December 25, 2024 (months are zero-indexed)
const testDate = new Date();

let sunRise = null;
let sunSet = null;
let sunCulm = null;


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


// Function to construct API URL for IST
function constructApiUrlIST(body) {
    // Extract day, month, and year from the global test date
    const day = testDate.getDate(); // Day of the month (1-31)
    const month = testDate.getMonth() + 1; // Month (0-11, so add 1)
    const year = testDate.getFullYear(); // Full year (e.g., 2024)

    // Fetching 100 rows to be able to know when or until when the planet will be visible. After that, we only need one single line for the present day. 
    const params = `startday=${day}&startmonth=${month}&startyear=${year}&ird=1&irs=1&ima=1&ipm=0&iph=1&ias=0&iss=0&iob=1&ide=1&ids=0&interval=4&tz=0&format=csv&rows=250&objtype=1&objpl=${body}&objtxt=${body}&town=6077243`;

    return params;
}

function createDateWithTime(rise, set) {
    // Split the "set" time into hours and minutes
    const [hours, minutes] = set[0].split(':').map(Number);

    // Create a new date object with the global test date
    const date = new Date(testDate.getFullYear(), testDate.getMonth(), testDate.getDate(), hours, minutes);

    // Check if the time is before noon
    if (set < rise) {
        // If before noon, set the date to tomorrow
        date.setDate(date.getDate() + 1);
    }
    //console.log(date);
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


    const stopTimeDate = createDateWithTime(rise, set); 

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
    //console.log(`${baseUrl}?${params}`);

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

        const dataits = getValuesITS(itsData, body);

        //console.log(dataits.ra);
        //console.log(dataits.dec);

        // Rise and Set time of the planet, not to confuse with visibility. Doesn't mean it is visible because of daylight. 
        const startTime = dataits.rise;
        const stopTime = dataits.set;
        //console.log(startTime);
        //console.log(stopTime);


        // Prepare the second fetch using data from the first fetch
        baseUrl = 'https://ssd.jpl.nasa.gov/api/horizons.api';
        params = constructApiUrlJpl(startTime, stopTime, body);
        //console.log(`${baseUrl}?${params}`);
        requestString = `https://astroinfo:8890/proxy.php?baseUrl=${encodeURIComponent(baseUrl)}&params=${encodeURIComponent(params)}`;
        //console.log(requestString);
        const jplResponse = await fetch(requestString);
        if (!jplResponse.ok) {
            throw new Error('Network response was not ok for https://ssd.jpl.nasa.gov/api/horizons.api');
        }
        const jplData = await jplResponse.text();


        // Get the values between the Rise and Set times from IPS query.
        const datajpl = getValuesJpl(extractTextBetweenMarkersJPL(jplData), startTime[0], stopTime[0], dataits.observable);

        // Merge the two datasets
        const mergedData = Object.assign({}, dataits, datajpl);
        // Convert the merged object to a JSON string with proper formatting (optional)
        const jsonString = JSON.stringify(mergedData, null, 2); // `null, 2` adds indentation

        writeDataFile(body, jsonString);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function writeDataFile(body, data) {
    // Define the file path and name
    const fileName = `${body}.json`;
    const filePath = path.join('public/data', fileName); // Assuming 'data' is in the root folder

    // Ensure the directory exists
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    // Check if the data is an object and convert it to a string
    const stringData = typeof data === 'object' ? JSON.stringify(data, null, 2) : data;


    // Append to the existing file
    fs.writeFileSync(filePath, stringData, 'utf8');
    console.log(`${body} data has been written to the file`);

}

function getValuesJpl(data, startVisTime, endVisTime, observable) {
    //console.log(data);
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
    let sunRiseAzimuthIndex = null;
    let sunSetAzimuthIndex = null;
    let sunCulmAzimuthIndex = null;
    let midnightAzimuthIndex = null;
    

    lines.forEach(line => {
        let values = line.trim().split(/\s+/); // Split by whitespace and trim

        // Log the values to see how they are being split
        //console.log('Values:', values);

        if (values.length === 12) { // Handle lines with 12 values
            time.push(values[1]);
            azimuth.push(parseFloat(values[3]));
            elevation.push(parseFloat(values[4]));
            //magnitude.push(parseFloat(values[5]));
            illumination.push(parseFloat(values[7]));
            constellation.push(values[8]);
            phi.push(values[9]);
            pabLon.push(parseFloat(values[10]));
            pabLat.push(parseFloat(values[11]));
        } else if (values.length === 11) { // Handle lines with 11 values
            time.push(values[1]);
            azimuth.push(parseFloat(values[2]));
            elevation.push(parseFloat(values[3]));
            //magnitude.push(parseFloat(values[4]));
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

    if (observable[0] !== "Not observable") {
        visibility = true;
        // if it is not the Sun
        if (observable[0] !== "Visible all day") {
            //console.log(observable);
            const [start, end] = observable[0].split("until").map(str => str.trim());
            visibilityStartIndex = findClosestIndex(time, start);
            visibilityEndIndex = findClosestIndex(time, end);
        }
    }
    else {
        visibility = false;
    }

    // Find the closest azimuth index to sunRise, sunSet and sunCulm
    if (sunSet != null && sunRise != null) { 
        try {
            sunRiseAzimuthIndex = findClosestIndex(time, sunRise);
            //console.log(`sunRise: ${sunRise} and index: ${sunRiseAzimuthIndex}`);

        }
        catch (error) {
            console.log(error);
        }
        try {
            sunSetAzimuthIndex = findClosestIndex(time, sunSet);
            //console.log(`sunSet: ${sunSet} and index: ${sunSetAzimuthIndex}`);

        } catch (error) {
            console.log(error);
        }
        try {
            sunCulmAzimuthIndex = findClosestIndex(time, sunCulm);
            //console.log(`sunSet: ${sunSet} and index: ${sunSetAzimuthIndex}`);

        } catch (error) {
            console.log(error);
        }
        try {
            midnightAzimuthIndex = findClosestIndex(time, "00:00");
            //console.log(`sunSet: ${sunSet} and index: ${sunSetAzimuthIndex}`);

        } catch (error) {
            console.log(error);
        }
    }
    else {
        console.log("Sun data was not obtained");
    }

    return {
        time,
        azimuth,
        elevation,
        illumination,
        constellation,
        phi,
        pabLon,
        pabLat,
        visibilityStartIndex,
        visibilityEndIndex,
        visibility,
        sunRiseAzimuthIndex,
        sunSetAzimuthIndex,
        sunCulmAzimuthIndex,
        midnightAzimuthIndex
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

function getValuesITS(data, body) {
    // Split the data into lines
    const lines = data.trim().split('\n');
    //console.log(data);
    // Initialize arrays for Rise, Culm, Set, and Observable
    const bodyName = body;
    let date = [];
    const ra = [];
    const dec = [];
    const rise = [];
    const culm = [];
    const set = [];
    const magnitude = [];
    const phase = [];
    const distance = [];
    const observable = [];
    const until = [];
    let from = "";
    let to = "";
    let observability = null;

    // Loop through each line (skipping the header and the last 3 rows)
    for (let i = 3; i < lines.length - 3; i++) {
        const values = lines[i].replace(/"/g, '').split(','); // Remove quotes and split by comma

        // keep all the dates for futur use
        date.push(`${values[0]} ${values[1]} ${values[2]}`);

        // Extract the relevant values for today only
        if (i == 3) {
            ra.push(`${values[5]}:${values[6]}:${values[7]}`);
            dec.push(`${values[8]}:${values[9]}:${values[10]}`);
            rise.push(values[11]); // Rise time
            culm.push(values[12]); // Culmination time
            set.push(values[13]); // Set time            
            magnitude.push(values[14]);
            phase.push(values[15]); 
            distance.push(values[16]);
            observable.push(values[17]); // Observable time
            // If the planet or Moon is visible, value[15] is in the format "00:00 until 00:00", otherwise it is "Not oservable", and if it is the Sun it is "Visible all day" all the time
            if (values[17].includes("until")) {
                from = values[17].split("until")[0];
                to = values[17].split("until")[1];
            }
        }
        let lastObservability = observability;
        observability = values[17];

        if (observability != null && lastObservability != null) {
            // When the planet will be visible again
            if (lastObservability.includes("observable") && observability.includes("until")) {
                //console.log("//////////////////////////////////////////////////");
                // Get the date for the index
                until.push(date[i - 3]); // -3 because we start at i = 3 and the first value is 0
                // Keep only the first Date value for today and clear the 99 unused
                date = date.slice(0, 1);
                break;
            }
            // Until when the planet is visible
            else if (lastObservability.includes("until") && observability.includes("observable")) {
                //console.log("//////////////////////////////////////////////////");
                // Get the date for the index
                until.push(date[i - 3]);
                // Keep only the first Date value for today and clear the 99 unused
                date = date.slice(0, 1);
                break;
            }
        }
        if (body == "sun") {
            sunRise = rise[0];
            sunSet = set[0];
            sunCulm = culm[0];
        }

    };

    return {
        bodyName,
        date,
        ra,
        dec,
        rise,
        culm,
        set,
        magnitude,
        phase,
        distance,
        observable,
        until,
        from,
        to
    };
}



await fetchData("sun");
await fetchData("mercury");
await fetchData("venus");
await fetchData("mars");
await fetchData("jupiter");
await fetchData("saturn");
await fetchData("uranus");
await fetchData("neptune");
await fetchData("moon");