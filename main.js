// main.js

import { constructApiUrlIST, getValuesITS, planets} from "./fetching.js";


// Iterate over the values of the planets object
Object.values(planets).forEach(element => {
    getITSData(element);
});


async function getITSData(body) {
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

        const dataits = getValuesITS(itsData);
        console.log(`${body}: ra: ${dataits.ra} dec: ${dataits.dec} -- ${dataits.observable}`);

        // Rise and Set time of the planet, not to confuse with visibility. Doesn't mean it is visible because of daylight. 
        const startTime = dataits.rise;
        const stopTime = dataits.set;
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
}
