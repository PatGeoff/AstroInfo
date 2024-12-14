// main.js


const planets = {
    mercury: "Mercure",
    venus: "Vénus",
    mars: "Mars",
    jupiter: "Jupiter",
    saturn: "Saturne",
    uranus: "Uranus",
    neptune: "Neptune",
    moon: "Lune",
    sun: "Soleil"
}
const planetsData = {};

const datesFr = {}

const constellations = {
    Ari: "Bélier",
    Tau: "Taureau",
    Gem: "Gémeaux",
    Cnc: "Cancer",
    Leo: "Lion",
    Vir: "Vierge",
    Lib: "Balance",
    Sco: "Scorpion",
    Sgr: "Sagittaire",
    Cap: "Capricorne",
    Aqr: "Verseau",
    Psc: "Poissons",
    Oph: "Ophiuchus" // The 13th zodiacal constellation
};

const constellationsPath = {
    Ari: "images/constellations/Aries.png",
    Aqr: "images/constellations/Aquarius.png",
    Cnc: "images/constellations/Cancer.png",
    Cap: "images/constellations/Capricorn.png",
    Gem: "images/constellations/Gemini.png",
    Leo: "images/constellations/Leo.png",
    Lib: "images/constellations/Libra.png",
    Oph: "images/constellations/Ophiuchus.png",
    Psc: "images/constellations/Piscies.png",
    Sgr: "images/constellations/Sagittarius.png",
    Sco: "images/constellations/Scorpius.png",
    Tau: "images/constellations/Taurus.png",
    Vir: "images/constellations/Virgo.png"
}

// const constellationsData = {
//     Aqr: { // Aquarius
//         cdi_00: -11.367683,
//         cdi_10: -11.061433,
//         cdi_01: 11.061433,
//         cdi_11: -11.367683,
//         ref_ra: 332.53346,
//         ref_dec: -7.3112996,
//         ref_x: 372.32342,
//         ref_y: 253.0641
//     },
//     Ari: { // Aquarius
//         cdi_00: -11.367683,
//         cdi_10: -11.061433,
//         cdi_01: 11.061433,
//         cdi_11: -11.367683,
//         ref_ra: 332.53346,
//         ref_dec: -7.3112996,
//         ref_x: 372.32342,
//         ref_y: 253.0641
//     },
//     Cnc: {
//         cdi_00: -19.875374,
//         cdi_10: 0.56472264,
//         cdi_01: -0.48259705,
//         cdi_11: -20.06562,
//         ref_ra: 103.40336,
//         ref_dec: 15.306631,
//         ref_x: 344.00997,
//         ref_y: 455.03114
//     },
//     Cap: {
//         cdi_00: -19.875374,
//         cdi_10: 0.56472264,
//         cdi_01: -0.48259705,
//         cdi_11: -20.06562,
//         ref_ra: 103.40336,
//         ref_dec: 15.306631,
//         ref_x: 344.00997,
//         ref_y: 455.03114
//     },
//     Gem: {
//         cdi_00: -19.875374,
//         cdi_10: 0.56472264,
//         cdi_01: -0.48259705,
//         cdi_11: -20.06562,
//         ref_ra: 103.40336,
//         ref_dec: 15.306631,
//         ref_x: 344.00997,
//         ref_y: 455.03114
//     },
//     Leo: {
//         cdi_00: -16.403893,
//         cdi_10: 0.72232026,
//         cdi_01: -0.7669055,
//         cdi_11: -16.443213,
//         ref_ra: 158.41863,
//         ref_dec: 17.563596,
//         ref_x: 353.19142,
//         ref_y: 318.93981
//     },
//     Lib: {
//         cdi_00: -16.403893,
//         cdi_10: 0.72232026,
//         cdi_01: -0.7669055,
//         cdi_11: -16.443213,
//         ref_ra: 158.41863,
//         ref_dec: 17.563596,
//         ref_x: 353.19142,
//         ref_y: 318.93981
//     },
//     Oph: {
//         cdi_00: -9.9481519,
//         cdi_10: -9.5731434,
//         cdi_01: 9.5731434,
//         cdi_11: -9.9481519,
//         ref_ra: 21.35726,
//         ref_dec: 19.167862,
//         ref_x: 334.70198,
//         ref_y: 111.67419
//     },
//     Psc: {
//         cdi_00: -9.9481519,
//         cdi_10: -9.5731434,
//         cdi_01: 9.5731434,
//         cdi_11: -9.9481519,
//         ref_ra: 21.35726,
//         ref_dec: 19.167862,
//         ref_x: 334.70198,
//         ref_y: 111.67419
//     },
//     Sco: {
//         cdi_00: -19.190467,
//         cdi_10: 0.058417915,
//         cdi_01: -0.058417915,
//         cdi_11: -19.190467,
//         ref_ra: 254.12843,
//         ref_dec: -32.788151,
//         ref_x: 276.3185,
//         ref_y: 317.03021
//     },
//     Sgr: {
//         cdi_00: -17.046297,
//         cdi_10: 0.9709383,
//         cdi_01: -0.91149182,
//         cdi_11: -17.223345,
//         ref_ra: 288.48749,
//         ref_dec: -39.497587,
//         ref_x: 242.28439,
//         ref_y: 435.2103
//     },
//     Tau: {
//         cdi_00: -17.344077,
//         cdi_10: -5.4522668,
//         cdi_01: 5.4522668,
//         cdi_11: -17.344077,
//         ref_ra: 64.468332,
//         ref_dec: 18.901513,
//         ref_x: 334.40742,
//         ref_y: 326.6959
//     },
//     Vir: {
//         cdi_00: -9.3107963,
//         cdi_10: 8.3483396,
//         cdi_01: -8.4188516,
//         cdi_11: -9.2241696,
//         ref_ra: 199.55795,
//         ref_dec: -1.4257751,
//         ref_x: 345.16144,
//         ref_y: 325.2609
//     }


// };

const constellationsData = {
    Aqr: { //Aquarius
        simplesoln: 0,
        cdi_00: -11.367683,
        cdi_10: -11.061433,
        cdi_01: 11.061433,
        cdi_11: -11.367683,
        ref_ra: 332.53346,
        ref_dec: -7.3112996,
        ref_x: 372.32342,
        ref_y: 253.0641
    },
    Sgr: { //Sagittarius
        simplesoln: 0,
        cdi_00: -17.001807,
        cdi_10: 0.0084249277,
        cdi_01: -0.0084249277,
        cdi_11: -17.001807,
        ref_ra: 281.95589,
        ref_dec: -30.251013,
        ref_x: 327.92165,
        ref_y: 277.48399
    },
    Leo: { //Leo
        simplesoln: 0,
        cdi_00: -16.403893,
        cdi_10: 0.72232026,
        cdi_01: -0.7669055,
        cdi_11: -16.443213,
        ref_ra: 158.41863,
        ref_dec: 17.563596,
        ref_x: 353.19142,
        ref_y: 318.93981
    },
    Gem: { //Gemini
        simplesoln: 0,
        cdi_00: -19.875374,
        cdi_10: 0.56472264,
        cdi_01: -0.48259705,
        cdi_11: -20.06562,
        ref_ra: 103.40336,
        ref_dec: 15.306631,
        ref_x: 344.00997,
        ref_y: 455.03114
    },
    Psc: { //Piscies
        simplesoln: 0,
        cdi_00: -9.9481519,
        cdi_10: -9.5731434,
        cdi_01: 9.5731434,
        cdi_11: -9.9481519,
        ref_ra: 21.35726,
        ref_dec: 19.167862,
        ref_x: 334.70198,
        ref_y: 111.67419
    },
    Sco: { //Scorpius
        simplesoln: 0,
        cdi_00: -19.190467,
        cdi_10: 0.058417915,
        cdi_01: -0.058417915,
        cdi_11: -19.190467,
        ref_ra: 254.12843,
        ref_dec: -32.788151,
        ref_x: 276.3185,
        ref_y: 317.03021
    },
    Tau: { //Taurus
        simplesoln: 0,
        cdi_00: -17.344077,
        cdi_10: -5.4522668,
        cdi_01: 5.4522668,
        cdi_11: -17.344077,
        ref_ra: 64.468332,
        ref_dec: 18.901513,
        ref_x: 334.40742,
        ref_y: 326.6959
    },
    Vir: { //Virgo
        simplesoln: 0,
        cdi_00: -9.3107963,
        cdi_10: 8.3483396,
        cdi_01: -8.4188516,
        cdi_11: -9.2241696,
        ref_ra: 199.55795,
        ref_dec: -1.4257751,
        ref_x: 345.16144,
        ref_y: 325.2609
    },
    Cap: { //Capricorn
        simplesoln: 0,
        cdi_00: -19.579798,
        cdi_10: 2.2608228,
        cdi_01: -2.2608228,
        cdi_11: -19.579798,
        ref_ra: 313.76427,
        ref_dec: -15.632532,
        ref_x: 374.75648,
        ref_y: 228.83217
    },
    Ari: { //Aries
        simplesoln: 1,
        cdi_00: -34.339288,
        cdi_01: 5.6472421,
        cdi_10: 9.8686894,
        cdi_11: 35.286524,
        ref_ra: 34.223964,
        ref_dec: 23.338927,
        ref_x: 336.66667,
        ref_y: 291.66667
    },
    Cnc: { //Cancer
        simplesoln: 1,
        cdi_00: -24.976056,
        cdi_01: -3.33237,
        cdi_10: -3.389218,
        cdi_11: 24.504894,
        ref_ra: 129.85732,
        ref_dec: 14.170574,
        ref_x: 280.66667,
        ref_y: 177.33333
    },
    Lib: { //Libra
        simplesoln: 1,
        cdi_00: -24.477644,
        cdi_01: 0.22971695,
        cdi_10: -0.37117188,
        cdi_11: 24.601913,
        ref_ra: 231.2419,
        ref_dec: -17.131394,
        ref_x: 268.66667,
        ref_y: 290.66667
    },
    Oph: { //Ophiucus
        simplesoln: 1,
        cdi_00: -11.945416,
        cdi_01: 0.21566726,
        cdi_10: -2.8321262E-05,
        cdi_11: 12.020535,
        ref_ra: 256.87263,
        ref_dec: -4.5773184,
        ref_x: 281,
        ref_y: 303
    }
};
const azimuthLabels = [
    { range: [0, 22.5], label: "N" },
    { range: [22.5, 67.5], label: "NE" },
    { range: [67.5, 112.5], label: "E" },
    { range: [112.5, 157.5], label: "SE" },
    { range: [157.5, 202.5], label: "S" },
    { range: [202.5, 247.5], label: "SO" },
    { range: [247.5, 292.5], label: "O" },
    { range: [292.5, 337.5], label: "NO" },
    { range: [337.5, 360], label: "N" } // Wrap around to North
];


// Create the json objects with the planets data 
const fetchData = async (planet) => {
    try {
        const response = await fetch(`data/${planet}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        planetsData[planet] = data;
    } catch (error) {
        console.error(`Error fetching data for ${planet}:`, error);
    }
};

function displayData(planet) {
    visibility(planet);
    todaysDate();
    drawConstellationGraph(planet, planetsData[planet].constellation[0]);
    drawGraph(planet);
    magRiseSet(planet);
}

// Update the grah and time every minute
//setInterval(updateGrah, 60000);

function updateGrah() {
    // array.forEach(element => {

    // });
    drawGraph("mercury");
    drawGraph("venus");
}

function currentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0'); // Ensure two digits
    const minutes = now.getMinutes().toString().padStart(2, '0'); // Ensure two digits
    const timeString = `${hours}h${minutes}`;
    return timeString;
}

function visibility(planet) {
    if (planet !== "sun") {
        let idNameVis = `visibility_${planet}`;
        let idNameUntil = `visibility_until_${planet}`;
        if (planetsData[planet].visibility) {
            document.getElementById(idNameVis).innerHTML = `Visible`;
            document.getElementById(idNameVis).style.backgroundColor = '#03334F';

        }
        else {
            document.getElementById(idNameVis).innerHTML = `Non visible`;
            document.getElementById(idNameVis).style.backgroundColor = '#600429';
        }
        const date = planetsData[planet].until.toString();
        try {
            document.getElementById(idNameUntil).innerHTML = `jusqu'au ${formatDate(date)}`;
        } catch (error) {
            document.getElementById(idNameUntil).innerHTML = `pour plus de 250 jours`;
        }

    }
}

function magRiseSet(planet) {
    let idNameVis = `rise_${planet}`;
    document.getElementById(idNameVis).innerHTML = `<span style="color: grey;">Lever: </span><span style="color: white;">${formatTime(planetsData[planet].rise)}</span>`;

    idNameVis = `culm_${planet}`;
    document.getElementById(idNameVis).innerHTML = `<span style="color: grey;">Pt. Culm.: </span><span style="color: white;">${formatTime(planetsData[planet].culm)}</span>`;

    idNameVis = `set_${planet}`;
    document.getElementById(idNameVis).innerHTML = `<span style="color: grey;">Coucher: </span><span style="color: white;">${formatTime(planetsData[planet].set)}</span>`;

    idNameVis = `magnitude_${planet}`;
    document.getElementById(idNameVis).innerHTML = `<span style="color: grey;">Magnitude: </span><span style="color: white;">${planetsData[planet].magnitude}</span>`;

    idNameVis = `constellation_${planet}`;
    document.getElementById(idNameVis).innerHTML = `<span style="color: grey;">Constellation: </span><span style="color: white;">${constellations[planetsData[planet].constellation[0]]}</span>`;

    idNameVis = `from_${planet}`;
    let text = "";
    if (planetsData[planet].visibility) {
        text = formatTime(planetsData[planet].from.toString());
    }
    document.getElementById(idNameVis).innerHTML = `<span style="color: grey;">Observable de: </span><span style="color: white;">${text}</span>`;

    if (planetsData[planet].visibility) {
        text = formatTime(planetsData[planet].to.toString());
    }
    idNameVis = `until_${planet}`;
    document.getElementById(idNameVis).innerHTML = `<span style="color: grey;">Jusqu'à: </span><span style="color: white;">${text}</span>`;
}

function todaysDate() {
    const date = planetsData["venus"].date[0].toString();
    document.getElementById("title-date").innerHTML = `Montréal - ${formatDate(date)}`;
}

function formatDate(dateString) {
    // Define the months in French
    const months = {
        jan: "janvier",
        feb: "février",
        mar: "mars",
        apr: "avril",
        may: "mai",
        jun: "juin",
        jul: "juillet",
        aug: "août",
        sep: "septembre",
        oct: "octobre",
        nov: "novembre",
        dec: "décembre"
    };

    // Split the input date string
    const [year, month, day] = dateString.split(' ');

    // Convert the month to French
    const monthInFrench = months[month.toLowerCase()];

    // Remove leading zero from days
    const formattedDay = parseInt(day, 10);

    // Return the formatted date in French
    return `${formattedDay} ${monthInFrench} ${year}`;
}

function formatTime(time) {
    // Split the time string into hours and minutes
    const [hours, minutes] = time.toString().split(':');
    // Remove leading zero from hours
    const formattedHours = parseInt(hours, 10);
    // Return the formatted time string
    return `${formattedHours}h${minutes}`;
}

function drawConstellationGraph(planet, constellation) {
    //console.log(constellationsData[constellation]);
    let idNameConst = `constellation_${planet}_img`;
    const imgPath = constellationsPath[constellation].toString();
    //console.log(imgPath);
    const svgWidth = 600;
    const svgHeight = 600;
    const planetPos = planetOnConstellationTEST(constellationsData[constellation], raStringToDegrees(planetsData[planet].ra[0]), decStringToDegrees(planetsData[planet].dec[0]));
    //console.log(`${planet} ra: ${planetsData[planet].ra[0]} dec: ${planetsData[planet].dec[0]}`);
    //console.log(`x: ${planetPos.x} y: ${planetPos.y}`);
    // Create SVG elements
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgWidth} ${svgHeight}" preserveAspectRatio="xMidYMid meet" width="100%" height="100%">`;
    // Add the constellation image
    svg += `<image xlink:href="${imgPath}" width="${svgWidth}" height="${svgHeight}" onerror="this.style.display='none'" />`;
    // Add the circle and the planet point
    //console.log(planetPos);
    if (planet != "sun" && planet != "moon") {
        svg += `<circle cx="${planetPos.x}" cy="${planetPos.y}" r="5" fill="orange" />`; // Point
        svg += `<circle cx="${planetPos.x}" cy="${planetPos.y}" r="60" fill="none" stroke="#03334F" stroke-width="8" />`; // Circle around the point
        // Add text
        svg += `<text x="${svgWidth / 2}" y="50" font-size="30" text-anchor="middle" fill="grey">à 22h ce soir</text>`;
    }
    // Terminate the svg string
    svg += `</svg>`;

    // Insert SVG into the DOM
    const element = document.getElementById(idNameConst);
    if (element) {
        element.innerHTML = svg;
        //console.log("SVG inserted successfully");
    } else {
        console.error("Element not found:", idNameConst);
    }

}

//function drawElevationGraph(elevation, azimuth, visStartIndex, visEndIndex, visible, time, graphName, currentTime, from, until ) {
function drawElevationGraph(obj, graphName, currentTime,) {


    const elevation = obj.elevation;
    const azimuth = obj.azimuth;
    const visStartIndex = obj.visibilityStartIndex;
    const visEndIndex = obj.visibilityEndIndex;
    const visible = obj.visibility;
    const rise = obj.rise; // time at which the planet rises from the horizon
    const set = obj.set;   // time at which the planet sets from the horizon
    const time = obj.time; // time array from rise to set
    const from = obj.from; // time at wich the planet starts to be visible depending on the time of the day and it's elevation 
    const until = obj.to;  // time at wich the planet starts to disappear if it was visible 
    const sunRiseIndex = obj.sunRiseAzimuthIndex !== undefined ? obj.sunRiseAzimuthIndex : 0; // time index for this particular planet corresponding to the closest time at which the sun rises
    const sunCulmIndex = obj.sunCulmAzimuthIndex !== undefined ? obj.sunCulmAzimuthIndex : 0; // time index for this particular planet corresponding to the closest time at which the sun culminates
    const sunSetIndex = obj.sunSetAzimuthIndex !== undefined ? obj.sunSetAzimuthIndex : 0;   // time index for this particular planet corresponding to the closest time at which the sun sets
    const midnightAzimuthIndex = obj.midnightAzimuthIndex !== undefined ? obj.midnightAzimuthIndex : 0;

    // Create data array with azimuth and elevation pairs
    const data = azimuth.map((az, index) => {
        return { azimuth: az, elevation: elevation[index] };
    });

    // Determine the SVG dimensions
    const svgWidth = 600;
    const svgHeight = 300;
    const topMargin = 30; // Add a top margin to accommodate the text
    const padding = 50; // Add padding to the left and right sides of the graph
    const yBottomOffset = 20; // offset for the text and line from the bottom

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
    let svg = `<svg viewBox="0 0 ${svgWidth} ${svgHeight}" preserveAspectRatio="xMidYMid meet" width="100%" height="100%">`;



    // Draw the path for the elevation graph using cubic Bézier curves
    let pathData = `M ${scaledAzimuth[0]},${scaledElevation[0]}`;
    for (let i = 1; i < numValues - 1; i++) {
        const xMid = (scaledAzimuth[i] + scaledAzimuth[i + 1]) / 2;
        const yMid = (scaledElevation[i] + scaledElevation[i + 1]) / 2;
        pathData += ` Q ${scaledAzimuth[i]},${scaledElevation[i]} ${xMid},${yMid}`;
    }
    pathData += ` T ${scaledAzimuth[numValues - 1]},${scaledElevation[numValues - 1]}`;
    svg += `<path d="${pathData}" style="fill:none;stroke:white;stroke-width:1"/>`;

    // Add y-axis labels
    const yLabelInterval = (maxElevation - minElevation) / 5; // Adjust for more or fewer labels
    for (let i = 0; i <= 5; i++) {
        const yValue = minElevation + i * yLabelInterval;
        const yPos = svgHeight - topMargin - ((yValue - minElevation) / (maxElevation - minElevation)) * (svgHeight - topMargin);
        svg += `<text x="-15" y="${yPos}" font-size="10" text-anchor="end">${yValue.toFixed(1)}</text>`;
    }

    // Function to find the intersection point
    const findIntersection = (x, scaledAzimuth, scaledElevation) => {
        for (let i = 0; i < scaledAzimuth.length - 1; i++) {
            if (x >= scaledAzimuth[i] && x <= scaledAzimuth[i + 1]) {
                const y = scaledElevation[i] + (scaledElevation[i + 1] - scaledElevation[i]) * (x - scaledAzimuth[i]) / (scaledAzimuth[i + 1] - scaledAzimuth[i]);
                return { x, y };
            }
        }
        return null;
    };

    // Find the y-coordinate for zero elevation
    const zeroElevationY = svgHeight - topMargin - padding - ((0 - minElevation) / (maxElevation - minElevation)) * (svgHeight - topMargin - padding) + 50;

    //console.log(`planet:${graphName} rise:${rise} set: ${set} from:${from} until${until} sunRiseIndex${sunRiseIndex} corresponding time to sunRiseIndex: ${time[sunRiseIndex]} sunCulmIndex${sunCulmIndex} corresponding time to sunCulmIndex: ${time[sunCulmIndex]}  sunSetIndex${sunSetIndex} corresponding time to sunSetIndex: ${time[sunSetIndex]}`);


    console.log(`${graphName} minuit:${midnightAzimuthIndex} time at index: ${time[midnightAzimuthIndex]}`);

    // Gradient setup
    let stops = [];

    if (sunSetIndex < sunRiseIndex) {
        // Sunset before sunrise (wrap-around scenario)
        stops.push({ offset: Math.floor(sunSetIndex * 100 / time.length), color: 'black' });
        stops.push({ offset: Math.min(100, Math.floor(sunSetIndex * 100 / time.length) + 2), color: 'blue' });
        stops.push({ offset: Math.max(0, Math.floor(sunRiseIndex * 100 / time.length) - 2), color: 'blue' });
        stops.push({ offset: Math.floor(sunRiseIndex * 100 / time.length), color: 'blue' });
        stops.push({ offset: Math.floor(sunCulmIndex * 100 / time.length), color: '#06C1F9' });
        stops.push({ offset: Math.floor(sunCulmIndex * 100 / time.length), color: 'blue' });
        stops.push({ offset: 100, color: 'black' });
    } else {
        // Normal scenario
        stops.push({ offset: 0, color: 'black' });
        stops.push({ offset: Math.max(0, Math.floor(sunRiseIndex * 100 / time.length) - 2), color: 'black' });
        stops.push({ offset: Math.floor(sunRiseIndex * 100 / time.length), color: 'blue' });
        stops.push({ offset: Math.floor(sunCulmIndex * 100 / time.length), color: '#06C1F9' });
        stops.push({ offset: Math.floor(sunSetIndex * 100 / time.length), color: 'blue' });
        stops.push({ offset: Math.min(100, Math.floor(sunSetIndex * 100 / time.length) + 2), color: 'black' });
        stops.push({ offset: 100, color: 'black' });
    }

    // Add stops around midnight if it's not zero
    if (midnightAzimuthIndex !== 0) {
        const midnightOffset = Math.floor(midnightAzimuthIndex * 100 / time.length);
        stops.push({ offset: Math.max(0, midnightOffset - 2), color: 'black' });
        stops.push({ offset: midnightOffset, color: 'black' });
        stops.push({ offset: Math.min(100, midnightOffset + 2), color: 'black' });
    }

    // Sort stops by offset to ensure correct order
    stops.sort((a, b) => a.offset - b.offset);

    // Generate the gradient stops
    let gradientStops = stops.map(stop => `<stop offset="${stop.offset}%" style="stop-color: ${stop.color}; stop-opacity: 1" />`).join('\n');

    // Generate a unique ID for each gradient
    const uniqueId = `multiColorGradient_${Math.random().toString(36).substr(2, 9)}`;

    // Define the gradient
    svg += `
 <defs>
     <linearGradient id="${uniqueId}" x1="0%" y1="0%" x2="100%" y2="0%">
                 ${gradientStops}
    </linearGradient>
</defs>
    `;


    // Draw the gradient bar
    svg += `<rect x="0" y="${zeroElevationY - 6}" width="${svgWidth}" height="6" fill="url(#${uniqueId})" />`;


    // Draw the horizontal line at zero elevation
    svg += `<line x1="0" y1="${zeroElevationY}" x2="${svgWidth}" y2="${zeroElevationY}" style="stroke:darkgrey;stroke-width:1;stroke-dasharray:5,5"/>`;

    if (visible) {
        // Add the vertical line at the specified azimuth
        if (visStartIndex != null) {

            const verticalLineX = scaledAzimuth[visStartIndex];
            // Find and add the intersection point
            const intersection = findIntersection(verticalLineX, scaledAzimuth, scaledElevation);

            svg += `<line x1="${verticalLineX}" y1="${zeroElevationY}" x2="${verticalLineX}" y2="${intersection.y}" style="stroke:grey;stroke-width:2"/>`;


            if (intersection) {
                svg += `<circle cx="${intersection.x}" cy="${intersection.y}" r="5" fill="grey"/>`;
                svg += `<text x="${intersection.x + 30}" y="${intersection.y + 5}" text-anchor="middle" font-size="12px" fill="white">${formatTime(from)}</text>`;
            }
        }

        // Add the vertical line at the specified azimuth
        if (visEndIndex != null) {
            //console.log(visEndIndex);
            const verticalLineX = scaledAzimuth[visEndIndex];

            // Find and add the intersection point
            const intersection = findIntersection(verticalLineX, scaledAzimuth, scaledElevation);

            svg += `<line x1="${verticalLineX}" y1="${zeroElevationY}" x2="${verticalLineX}" y2="${intersection.y}" style="stroke:grey;stroke-width:2"/>`;

            if (intersection) {
                svg += `<circle cx="${intersection.x}" cy="${intersection.y}" r="5" fill="grey"/>`;
                svg += `<text x="${intersection.x + 30}" y="${intersection.y + 5}" text-anchor="middle" font-size="12px" fill="white">${formatTime(until)}</text>`;
            }
        }
        //svg += `<text x="${svgWidth / 2}" y="${svgHeight / 2}" text-anchor="middle" font-size="14px" fill="green">Visible en ce moment</text>`;
    } else {
        //svg += `<text x="${svgWidth / 2}" y="${svgHeight / 2}" text-anchor="middle" font-size="14px" fill="red">NON visible en ce moment</text>`;
        const text = "Non visible en ce moment";
        const fontSize = 14;
        svg += `<rect x="${svgWidth / 2 - (text.length * fontSize / 4)}" y="${svgHeight / 2 - fontSize}" width="${text.length * fontSize / 2}" height="${fontSize * 1.5}" fill="#600429"></rect>`;
        svg += `<text x="${svgWidth / 2}" y="${svgHeight / 2}" text-anchor="middle" font-size="${fontSize}px" fill="white">${text}</text>`;

    }

    // Add text for max elevation
    const maxElevationIndex = elevation.indexOf(maxElevation);
    const maxElevationX = scaledAzimuth[maxElevationIndex];
    const maxElevationY = scaledElevation[maxElevationIndex]  // Position it above the max elevation point
    // Altitude Heading text above the max
    svg += `<text x="${maxElevationX}" y="${maxElevationY - 5}" text-anchor="middle" font-size="12px" fill="grey">A H: ${maxElevation.toFixed(2)}°</text>`;
    // Zero elevation
    svg += `<text x="${maxElevationX - 40}" y="${zeroElevationY + 13}" text-anchor="right" font-size="12px" fill="grey">Horizon (0°)</text>`;
    // Add the vertical line at max elevation
    //svg += `<line x1="${maxElevationX}" y1="${zeroElevationY - 2}" x2="${maxElevationX}" y2="${maxElevationY}" style="stroke:grey;stroke-width:0,5;stroke-dasharray:5,5"/>`;

    // Add azimuth direction text below the first, middle, and last points
    const firstAzimuthX = scaledAzimuth[0];
    const middleAzimuthX = scaledAzimuth[Math.floor((numValues - 1) / 2)];
    const lastAzimuthX = scaledAzimuth[numValues - 1];
    const minElevationY = svgHeight - yBottomOffset; // Position it below the graph

    // azimuth and time
    svg += `<text x="${firstAzimuthX}" y="${minElevationY + 20}" text-anchor="middle" font-size="14px" fill="white">${getAzimuthLabel(azimuth[0])}</text>`;
    svg += `<text x="${firstAzimuthX}" y="${minElevationY + 2}" text-anchor="middle" font-size="14px" fill="lightgrey">${formatTime(rise.toString())}</text>`;
    svg += `<text x="${middleAzimuthX}" y="${minElevationY + 20}" text-anchor="middle" font-size="14px" fill="white">${getAzimuthLabel(azimuth[Math.floor((numValues - 1) / 2)])}</text>`;
    svg += `<text x="${lastAzimuthX}" y="${minElevationY + 20}" text-anchor="middle" font-size="14px" fill="white">${getAzimuthLabel(azimuth[numValues - 1])}</text>`;
    svg += `<text x="${lastAzimuthX}" y="${minElevationY + 2}" text-anchor="middle" font-size="14px" fill="lightgrey">${formatTime(set.toString())}</text>`;

    // Moon and Sun icons
    if (midnightAzimuthIndex > 0 && midnightAzimuthIndex < scaledAzimuth.length - 1) {
        svg += `<image href="images/resources/smallMoon.png" x="${scaledAzimuth[midnightAzimuthIndex]}" y="${zeroElevationY - 20}" width="15" height="15" />`;
    }
    if (sunCulmIndex> 0 && sunCulmIndex < scaledAzimuth.length - 1) {
    svg += `<image href="images/resources/smallSun.png" x="${scaledAzimuth[sunCulmIndex]}" y="${zeroElevationY - 20}" width="15" height="15" opacity="1" />`;
    }

    svg += `</svg>`;

    // Insert SVG into the DOM
    document.getElementById(graphName).innerHTML = svg;
}

function drawGraph(obj) {
    const object = planetsData[obj];
    const graphName = `${obj}_graph`;
    drawElevationGraph(object, graphName, currentTime());
}

function getAzimuthLabel(azimuth) {
    for (const { range, label } of azimuthLabels) {
        if (azimuth >= range[0] && azimuth < range[1]) {
            return label;
        }
    }
    return "Unknown"; // Fallback
}

function planetOnConstellation(constellation, _ra, _dec) {
    //console.log(`ra: ${_ra} dec: ${_dec}`);
    const pi = Math.PI;
    const dtor = pi / 180.0;
    const ref_ra = constellation.ref_ra; // Set this value
    const ref_dec = constellation.ref_dec; // Set this value
    const cdi_00 = constellation.cdi_00; // Set this value
    const cdi_01 = constellation.cdi_01; // Set this value
    const cdi_10 = constellation.cdi_10; // Set this value
    const cdi_11 = constellation.cdi_11; // Set this value
    const ra = _ra; // Set this value
    const dec = _dec; // Set this value
    const ref_xsize = 600; // Set this value
    const ref_ysize = 600; // Set this value
    const scaled_xsize = 600; // Set this value
    const scaled_ysize = 600; // Set this value
    const ref_x = constellation.ref_x;
    const ref_y = constellation.ref_y;

    const r00 = Math.cos(ref_ra * dtor) * Math.sin(ref_dec * dtor);
    const r10 = Math.sin(ref_ra * dtor) * Math.sin(ref_dec * dtor);
    const r20 = -Math.cos(ref_dec * dtor);
    const r01 = -Math.sin(ref_ra * dtor);
    const r11 = Math.cos(ref_ra * dtor);
    const r02 = Math.cos(ref_ra * dtor) * Math.cos(ref_dec * dtor);
    const r12 = Math.sin(ref_ra * dtor) * Math.cos(ref_dec * dtor);
    const r22 = Math.sin(ref_dec * dtor);

    const l = Math.cos(dec * dtor) * Math.cos(ra * dtor);
    const m = Math.cos(dec * dtor) * Math.sin(ra * dtor);
    const n = Math.sin(dec * dtor);

    const b0 = r00 * l + r10 * m + r20 * n;
    const b1 = r01 * l + r11 * m;
    const b2 = r02 * l + r12 * m + r22 * n;

    const theta = Math.asin(b2);
    const phi = Math.atan2(b1, b0);

    const r_theta = 1.0 / (dtor * Math.tan(theta));
    const u = r_theta * Math.sin(phi);
    const v = -r_theta * Math.cos(phi);

    const xdif = cdi_00 * u + cdi_01 * v;
    const ydif = cdi_10 * u + cdi_11 * v;

    const x = xdif + (ref_x - 1);
    const y = ydif + (ref_y - 1);

    const xscaled = x / ref_xsize * scaled_xsize;
    const yscaled = y / ref_ysize * scaled_ysize;
    //console.log("x:", xscaled);
    //console.log("y:", yscaled);
    const pos = { x: xscaled, y: yscaled };
    return pos;

}
function raStringToDegrees(raString) {
    // Split the string into hours, minutes, and seconds
    const [hours, minutes, seconds] = raString.split(':').map(Number);

    // Convert to decimal hours
    const decimalHours = hours + (minutes / 60) + (seconds / 3600);

    // Convert to degrees
    const degrees = decimalHours * 15;

    return degrees;
}
function decStringToDegrees(decString) {
    // Split the string into degrees, minutes, and seconds
    const sign = decString.startsWith('-') ? -1 : 1;
    const [degrees, minutes, seconds] = decString.replace(/^[+-]/, '').split(':').map(Number);

    // Convert to decimal degrees
    const decimalDegrees = degrees + (minutes / 60) + (seconds / 3600);
    // Adjust for the sign
    return decimalDegrees * sign;
}


function planetOnConstellationTEST(constellation, _ra, _dec) {
    //console.log(`constellation: ${constellation} ra: ${_ra} dec: ${_dec}`);
    const pi = Math.PI;
    const dtor = pi / 180.0;
    const ref_ra = constellation.ref_ra; // Set this value
    const ref_dec = constellation.ref_dec; // Set this value
    const cdi_00 = constellation.cdi_00; // Set this value
    const cdi_01 = constellation.cdi_01; // Set this value
    const cdi_10 = constellation.cdi_10; // Set this value
    const cdi_11 = constellation.cdi_11; // Set this value
    const ra = _ra; // Set this value
    const dec = _dec; // Set this value
    const ref_xsize = 600; // Set this value
    const ref_ysize = 600; // Set this value
    const scaled_xsize = 600; // Set this value
    const scaled_ysize = 600; // Set this value
    const ref_x = constellation.ref_x;
    const ref_y = constellation.ref_y;
    let xscaled = 0.0;
    let yscaled = 0.0;

    let x, y;
    if (constellation.simplesoln === 0) {
        const r00 = Math.cos(ref_ra * dtor) * Math.sin(ref_dec * dtor);
        const r10 = Math.sin(ref_ra * dtor) * Math.sin(ref_dec * dtor);
        const r20 = -Math.cos(ref_dec * dtor);
        const r01 = -Math.sin(ref_ra * dtor);
        const r11 = Math.cos(ref_ra * dtor);
        const r02 = Math.cos(ref_ra * dtor) * Math.cos(ref_dec * dtor);
        const r12 = Math.sin(ref_ra * dtor) * Math.cos(ref_dec * dtor);
        const r22 = Math.sin(ref_dec * dtor);
        const l = Math.cos(dec * dtor) * Math.cos(ra * dtor);
        const m = Math.cos(dec * dtor) * Math.sin(ra * dtor);
        const n = Math.sin(dec * dtor);
        const b0 = r00 * l + r10 * m + r20 * n;
        const b1 = r01 * l + r11 * m;
        const b2 = r02 * l + r12 * m + r22 * n;
        const theta = Math.asin(b2);
        const phi = Math.atan2(b1, b0);
        const r_theta = 1.0 / (dtor * Math.tan(theta));
        const u = r_theta * Math.sin(phi);
        const v = -r_theta * Math.cos(phi);
        const xdif = cdi_00 * u + cdi_01 * v;
        const ydif = cdi_10 * u + cdi_11 * v;
        const x = xdif + (ref_x - 1);
        const y = ydif + (ref_y - 1);
        xscaled = x / ref_xsize * scaled_xsize;
        yscaled = y / ref_ysize * scaled_ysize;
    } else {
        const u = (ra - ref_ra) * Math.cos(ref_dec * dtor);
        const v = (dec - ref_dec);
        const xdif = cdi_00 * u + cdi_01 * v;
        const ydif = cdi_10 * u + cdi_11 * v;
        x = xdif + ref_x;
        y = ydif + ref_y;
        xscaled = x / ref_xsize * scaled_xsize;
        yscaled = (ref_ysize - y) / ref_ysize * scaled_ysize;
    }
    //console.log("x:", xscaled);
    //console.log("y:", yscaled);
    const pos = { x: xscaled, y: yscaled };
    return pos;
}



document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch data for all planets using the keys
        await Promise.all(Object.keys(planets).map(planet => fetchData(planet)));
        console.log(planetsData);
        Object.keys(planets).forEach(planet => displayData(planet));
        //console.log(planetOnConstellationTEST(constellationsData.Cap, 295.85417, -23.790556));
        //planetOnConstellation(constellationsData.Aqr, 322.88971698347876, -5.5711748282114666);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
