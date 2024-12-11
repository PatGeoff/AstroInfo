// main.js


const planets = {
    mercury: "Mercure",
    venus: "Vénus",
    mars: "Mars",
    jupiter: "Jupiter",
    saturn: "Saturne",
    uranus: "Uranus",
    neptune: "Neptune"
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

const constellationsData = {
    Aqr: { // Aquarius
        cdi_00: -11.367683,
        cdi_10: -11.061433,
        cdi_01: 11.061433,
        cdi_11: -11.367683,
        ref_ra: 332.53346,
        ref_dec: -7.3112996,
        ref_x: 372.32342,
        ref_y: 253.0641
    },
    Tau: {
        cdi_00: -10.123456,
        cdi_10: -10.654321,
        cdi_01: 10.654321,
        cdi_11: -10.123456,
        ref_ra: 45.67890,
        ref_dec: -12.345678,
        ref_x: 123.45678,
        ref_y: 234.56789
    },
    // Add similar objects for other constellations
    Gem: {
        cdi_00: -9.876543,
        cdi_10: -9.543210,
        cdi_01: 9.543210,
        cdi_11: -9.876543,
        ref_ra: 67.89012,
        ref_dec: -23.456789,
        ref_x: 345.67890,
        ref_y: 456.78901
    }
    // ...
};


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

}

// Update the grah and time every minute
setInterval(updateGrah, 60000);

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
    document.getElementById(idNameUntil).innerHTML = `jusqu'au ${formatDate(date)}`;
}

function magRiseSet(planet) {
    let idNameVis = `rise_${planet}`;
    document.getElementById(idNameVis).innerHTML = `Lever: ${formatTime(planetsData[planet].rise)}`;
    idNameVis = `culm_${planet}`;
    document.getElementById(idNameVis).innerHTML = `Culm: ${formatTime(planetsData[planet].culm)}`;
    idNameVis = `set_${planet}`;
    document.getElementById(idNameVis).innerHTML = `Coucher: ${formatTime(planetsData[planet].set)}`;
    idNameVis = `magnitude_${planet}`;
    document.getElementById(idNameVis).innerHTML = `Magnitude: ${planetsData[planet].magnitude}`;
    idNameVis = `constellation_${planet}`;
    document.getElementById(idNameVis).innerHTML = `${constellations[planetsData[planet].constellation[0]]}`;
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

function displayConstellation(planet, constellation) {
    let idNameConst = `constellation_${planet}_img`;
    console.log(idNameConst);
    const pth = constellationsPath[constellation].toString();
    document.getElementById(idNameConst).src = pth;
}

function todaysDate() {
    const date = planetsData["venus"].date[0].toString();
    document.getElementById("title-date").innerHTML = `Montréal - ${formatDate(date)}`;
}

function drawElevationGraph(elevation, azimuth, visStartIndex, visEndIndex, visible, time, graphName, currentTime) {
    // Create data array with azimuth and elevation pairs
    const data = azimuth.map((az, index) => {
        return { azimuth: az, elevation: elevation[index] };
    });

    // Determine the SVG dimensions
    const svgWidth = 600;
    const svgHeight = 300;
    const topMargin = 30; // Add a top margin to accommodate the text
    const padding = 50; // Add padding to the left and right sides of the graph
    const yBottomOffset = 10; // offset for the text and line from the bottom

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
                svg += `<text x="${intersection.x + 30}" y="${intersection.y + 5}" text-anchor="middle" font-size="12px" fill="white">${formatTime(time[visStartIndex].replace(/'/g, ''))}</text>`;
            }
        }

        // Add the vertical line at the specified azimuth
        if (visEndIndex != null) {

            const verticalLineX = scaledAzimuth[visEndIndex];
            svg += `<line x1="${verticalLineX}" y1="${zeroElevationY}" x2="${verticalLineX}" y2="${intersection.y}" style="stroke:grey;stroke-width:2"/>`;

            // Find and add the intersection point
            const intersection = findIntersection(verticalLineX, scaledAzimuth, scaledElevation);
            if (intersection) {
                svg += `<circle cx="${intersection.x}" cy="${intersection.y}" r="5" fill="grey"/>`;
                svg += `<text x="${intersection.x + 30}" y="${intersection.y + 5}" text-anchor="middle" font-size="12px" fill="white">${time[visEndIndex].replace(/'/g, '')}</text>`;
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
    svg += `<text x="${maxElevationX - 150}" y="${zeroElevationY - 2}" text-anchor="right" font-size="12px" fill="grey">Horizon (0°)</text>`;
    // Add the vertical line at max elevation
    //svg += `<line x1="${maxElevationX}" y1="${zeroElevationY - 2}" x2="${maxElevationX}" y2="${maxElevationY}" style="stroke:grey;stroke-width:0,5;stroke-dasharray:5,5"/>`;

    // Add azimuth direction text below the first, middle, and last points
    const firstAzimuthX = scaledAzimuth[0];
    const middleAzimuthX = scaledAzimuth[Math.floor((numValues - 1) / 2)];
    const lastAzimuthX = scaledAzimuth[numValues - 1];
    const minElevationY = svgHeight - yBottomOffset; // Position it below the graph

    // azimuth and time
    svg += `<text x="${firstAzimuthX}" y="${minElevationY}" text-anchor="middle" font-size="14px" fill="white">${getAzimuthLabel(azimuth[0])}</text>`;
    svg += `<text x="${firstAzimuthX}" y="${minElevationY-50}" text-anchor="middle" font-size="14px" fill="lightgrey">${formatTime(time[0])}</text>`;
    svg += `<text x="${middleAzimuthX}" y="${minElevationY}" text-anchor="middle" font-size="14px" fill="white">${getAzimuthLabel(azimuth[Math.floor((numValues - 1) / 2)])}</text>`;
    svg += `<text x="${lastAzimuthX}" y="${minElevationY}" text-anchor="middle" font-size="14px" fill="white">${getAzimuthLabel(azimuth[numValues - 1])}</text>`; 
    svg += `<text x="${lastAzimuthX}" y="${minElevationY-50}" text-anchor="middle" font-size="14px" fill="lightgrey">${formatTime(time[time.length-1])}</text>`;   

    // Define the gradient
    svg += `
        <defs>
            <linearGradient id="multiColorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color: red; stop-opacity: 1" />
                <stop offset="50%" style="stop-color: yellow; stop-opacity: 1" />
                <stop offset="100%" style="stop-color: green; stop-opacity: 1" />
            </linearGradient>
        </defs>
    `;

    // Draw the gradient bar
    svg += `<rect x="${padding}" y="${svgHeight - yBottomOffset + 5}" width="${svgWidth - 2 * padding}" height="5" fill="url(#multiColorGradient)" />`;




    svg += `</svg>`;

    // Insert SVG into the DOM
    document.getElementById(graphName).innerHTML = svg;
}



function getAzimuthLabel(azimuth) {
    for (const { range, label } of azimuthLabels) {
        if (azimuth >= range[0] && azimuth < range[1]) {
            return label;
        }
    }
    return "Unknown"; // Fallback
}

function drawGraph(obj) {
    const object = planetsData[obj];
    const graphName = `${obj}_graph`;

    drawElevationGraph(object.elevation, object.azimuth, object.visibilityStartIndex, object.visibilityEndEndex, object.visibility, object.time, graphName, currentTime());
}

function toggleGraph(obj) {
    const graphContainer = document.getElementById(`${obj}_graph`);
    if (graphContainer.style.display === 'none') {
        graphContainer.style.display = 'block';
        drawGraph(obj);
    } else {
        graphContainer.style.display = 'none';
    }
}

function planetOnConstellation(constellation, _ra, _dec) {
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
    const scaled_xsize = 300; // Set this value
    const scaled_ysize = 300; // Set this value
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
    console.log("x:", xscaled);
    console.log("y:", yscaled);
    return(xscaled,yscaled);
    
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch data for all planets using the keys
        await Promise.all(Object.keys(planets).map(planet => fetchData(planet)));
        console.log(planetsData);
        Object.keys(planets).forEach(planet => displayData(planet));
        displayConstellation("mercury", planetsData.mercury.constellation[0]);
        displayConstellation("venus", planetsData.venus.constellation[0]);
        drawGraph("mercury");
        drawGraph("venus");
        magRiseSet("mercury");
        magRiseSet("venus");
        planetOnConstellation(constellationsData.Aqr,  322.88971698347876,  -5.5711748282114666 );

    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
