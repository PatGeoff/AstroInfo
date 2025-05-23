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
    Oph: "Ophiuchus", // The 13th zodiacal constellation
    Cet: "Baleine"
};

const constellationsPath = {
    Ari: "images/constellations/Aries.png",
    Aqr: "images/constellations/Aquarius.png",
    Cnc: "images/constellations/Cancer.png",
    Cet: "images/constellations/Cetus.png",
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
    },
    Cet: { //Cetus done on Apr 24 2025 with astrometry net zero tweak downsample 4
        simplesoln: 0,
        cdi_00: -11.598472, 
        cdi_10: -0.097696112, 
        cdi_01: 0.097696112, 
        cdi_11: -11.598472, 
        ref_ra: 37.628917, 
        ref_dec: -2.8725051, 
        ref_x: 156.71026, 
        ref_y: 270.42703
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

const venusPhasesPaths = [
    { range: [[195, 360], [0, 5]], MediaSource: "images/venus/phases/VenusPhases_00.png" },
    { range: [5, 15], MediaSource: "images/venus/phases/VenusPhases_01.png" },
    { range: [15, 25], MediaSource: "images/venus/phases/VenusPhases_02.png" },
    { range: [25, 35], MediaSource: "images/venus/phases/VenusPhases_03.png" },
    { range: [35, 45], MediaSource: "images/venus/phases/VenusPhases_04.png" },
    { range: [45, 55], MediaSource: "images/venus/phases/VenusPhases_05.png" },
    { range: [55, 65], MediaSource: "images/venus/phases/VenusPhases_06.png" },
    { range: [65, 75], MediaSource: "images/venus/phases/VenusPhases_07.png" },
    { range: [75, 85], MediaSource: "images/venus/phases/VenusPhases_08.png" },
    { range: [85, 95], MediaSource: "images/venus/phases/VenusPhases_09.png" },
    { range: [95, 105], MediaSource: "images/venus/phases/VenusPhases_19.png" },
    { range: [105, 115], MediaSource: "images/venus/phases/VenusPhases_18.png" },
    { range: [115, 125], MediaSource: "images/venus/phases/VenusPhases_17.png" },
    { range: [125, 135], MediaSource: "images/venus/phases/VenusPhases_16.png" },
    { range: [135, 145], MediaSource: "images/venus/phases/VenusPhases_15.png" },
    { range: [145, 155], MediaSource: "images/venus/phases/VenusPhases_14.png" },
    { range: [155, 165], MediaSource: "images/venus/phases/VenusPhases_13.png" },
    { range: [165, 175], MediaSource: "images/venus/phases/VenusPhases_12.png" },
    { range: [175, 185], MediaSource: "images/venus/phases/VenusPhases_11.png" },
    { range: [185, 195], MediaSource: "images/venus/phases/VenusPhases_10.png" }
];


const mercuryPhasesPaths = [
    { range: [[193, 360], [0, 6]], MediaSource: "images/mercury/phases/mercuryPhases_00.png" },
    { range: [6, 10], MediaSource: "images/mercury/phases/mercuryPhases_01.png" },
    { range: [10, 20], MediaSource: "images/mercury/phases/mercuryPhases_02.png" },
    { range: [20, 27], MediaSource: "images/mercury/phases/mercuryPhases_03.png" },
    { range: [27, 34], MediaSource: "images/mercury/phases/mercuryPhases_04.png" },
    { range: [34, 41], MediaSource: "images/mercury/phases/mercuryPhases_05.png" },
    { range: [41, 48], MediaSource: "images/mercury/phases/mercuryPhases_06.png" },
    { range: [48, 55], MediaSource: "images/mercury/phases/mercuryPhases_07.png" },
    { range: [55, 62], MediaSource: "images/mercury/phases/mercuryPhases_08.png" },
    { range: [62, 69], MediaSource: "images/mercury/phases/mercuryPhases_09.png" },
    { range: [69, 76], MediaSource: "images/mercury/phases/mercuryPhases_10.png" },
    { range: [76, 83], MediaSource: "images/mercury/phases/mercuryPhases_11.png" },
    { range: [83, 90], MediaSource: "images/mercury/phases/mercuryPhases_12.png" },
    { range: [90, 97], MediaSource: "images/mercury/phases/mercuryPhases_13.png" },
    { range: [97, 104], MediaSource: "images/mercury/phases/mercuryPhases_14.png" },
    { range: [104, 111], MediaSource: "images/mercury/phases/mercuryPhases_15.png" },
    { range: [111, 118], MediaSource: "images/mercury/phases/mercuryPhases_16.png" },
    { range: [118, 125], MediaSource: "images/mercury/phases/mercuryPhases_17.png" },
    { range: [125, 132], MediaSource: "images/mercury/phases/mercuryPhases_18.png" },
    { range: [132, 139], MediaSource: "images/mercury/phases/mercuryPhases_19.png" },
    { range: [139, 146], MediaSource: "images/mercury/phases/mercuryPhases_20.png" },
    { range: [146, 153], MediaSource: "images/mercury/phases/mercuryPhases_21.png" },
    { range: [153, 160], MediaSource: "images/mercury/phases/mercuryPhases_22.png" },
    { range: [160, 167], MediaSource: "images/mercury/phases/mercuryPhases_23.png" },
    { range: [167, 174], MediaSource: "images/mercury/phases/mercuryPhases_24.png" },
    { range: [174, 181], MediaSource: "images/mercury/phases/mercuryPhases_25.png" },
    { range: [181, 187], MediaSource: "images/mercury/phases/mercuryPhases_26.png" },
    { range: [187, 196], MediaSource: "images/mercury/phases/mercuryPhases_27.png" }
];

const moonPhasesPaths = [
    { range: [[195, 360], [0, 8]], MediaSource: "images/moon/phases/MoonPhases_00.png" },
    { range: [8, 16], MediaSource: "images/moon/phases/MoonPhases_01.png" },
    { range: [16, 24], MediaSource: "images/moon/phases/MoonPhases_02.png" },
    { range: [24, 32], MediaSource: "images/moon/phases/MoonPhases_03.png" },
    { range: [32, 40], MediaSource: "images/moon/phases/MoonPhases_04.png" },
    { range: [40, 48], MediaSource: "images/moon/phases/MoonPhases_05.png" },
    { range: [48, 56], MediaSource: "images/moon/phases/MoonPhases_06.png" },
    { range: [56, 64], MediaSource: "images/moon/phases/MoonPhases_07.png" },
    { range: [64, 72], MediaSource: "images/moon/phases/MoonPhases_08.png" },
    { range: [72, 80], MediaSource: "images/moon/phases/MoonPhases_09.png" },
    { range: [80, 88], MediaSource: "images/moon/phases/MoonPhases_10.png" },
    { range: [88, 96], MediaSource: "images/moon/phases/MoonPhases_11.png" },
    { range: [96, 104], MediaSource: "images/moon/phases/MoonPhases_12.png" },
    { range: [104, 112], MediaSource: "images/moon/phases/MoonPhases_13.png" },
    { range: [112, 120], MediaSource: "images/moon/phases/MoonPhases_14.png" },
    { range: [120, 128], MediaSource: "images/moon/phases/MoonPhases_15.png" },
    { range: [128, 136], MediaSource: "images/moon/phases/MoonPhases_16.png" },
    { range: [136, 144], MediaSource: "images/moon/phases/MoonPhases_17.png" },
    { range: [144, 152], MediaSource: "images/moon/phases/MoonPhases_18.png" },
    { range: [152, 160], MediaSource: "images/moon/phases/MoonPhases_19.png" },
    { range: [160, 168], MediaSource: "images/moon/phases/MoonPhases_20.png" },
    { range: [168, 176], MediaSource: "images/moon/phases/MoonPhases_21.png" },
    { range: [176, 184], MediaSource: "images/moon/phases/MoonPhases_22.png" },
    { range: [184, 187], MediaSource: "images/moon/phases/MoonPhases_23.png" }
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
        //console.log(`planet rise: ${data.rise}`);
        //console.log(`planet set: ${data.set}`);
    } catch (error) {
        console.error(`Error fetching data for ${planet}:`, error);
    }
};

function displayData(planet) {
    visibility(planet);
    todaysDate();
    console.log(planet, planetsData[planet].constellation[0]);
    if (planet !== "sun") {
    drawConstellationGraph(planet, planetsData[planet].constellation[0]);
    }
    drawGraph(planet);
    magRiseSet(planet);
}

// Update the grah and time every minute
//setInterval(updateGrah, 60000);



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
            //document.getElementById(idNameVis).style.backgroundColor = '#03334F';
            document.getElementById(idNameVis).style.backgroundColor = '#388E3C';
            

        }
        else {
            document.getElementById(idNameVis).innerHTML = `Non visible à l'oeil nu`;
            document.getElementById(idNameVis).fontSize = `0.2em`;
            document.getElementById(idNameVis).style.backgroundColor = '#600429';
        }
        const date = planetsData[planet].until.toString();
        try {
            document.getElementById(idNameUntil).innerHTML = `jusqu'au ${formatDate(date)}`;
        } catch (error) {
            document.getElementById(idNameUntil).innerHTML = `pour au moins 250 jours`;
        }

    }
}

function magRiseSet(planet) {
    let idNameVis = `rise_${planet}`;
    document.getElementById(idNameVis).innerHTML += `<span style="color: white;">${formatTime(planetsData[planet].rise)}</span>`;

    // const elevation = planetsData[planet].elevation;
    // const maxElevation = Math.max(...elevation);

    idNameVis = `culm_${planet}`;
    // document.getElementById(idNameVis).innerHTML += `<span style="color: white;">${formatTime(planetsData[planet].culm)} (${maxElevation.toFixed(2)}°)</span>`;
    document.getElementById(idNameVis).innerHTML += `<span style="color: white;">${formatTime(planetsData[planet].culm)}</span>`;

    idNameVis = `set_${planet}`;
    document.getElementById(idNameVis).innerHTML += `<span style="color: white;">${formatTime(planetsData[planet].set)}</span>`;

    idNameVis = `phase_${planet}`;
    document.getElementById(idNameVis).innerHTML += `<span style="color: white;">${planetsData[planet].phase}°</span>`;

    idNameVis = `magnitude_${planet}`;
    document.getElementById(idNameVis).innerHTML += `<span style="color: white;">${planetsData[planet].magnitude}</span>`;

    idNameVis = `diameter_${planet}`;
    document.getElementById(idNameVis).innerHTML += `<span style="color: white;">${planetsData[planet].diameter}"</span>`;


    idNameVis = `distance_${planet}`;
    let distanceAU = parseFloat(planetsData[planet].distance).toFixed(2);
    document.getElementById(idNameVis).innerHTML += `
        <span style="color: white;">${distanceAU} UA</span>
        <div>ou ${convertAUtoKM(planetsData[planet].distance)} km</div>

    `;

    idNameVis = `constellation_${planet}`;
    if(document.getElementById(idNameVis)) document.getElementById(idNameVis).innerHTML += `<span style="color: white;">${constellations[planetsData[planet].constellation[0]]}</span>`;

    idNameVis = `from_${planet}`;
    let text = "";
    if (planetsData[planet].visibility) {
        text = formatTime(planetsData[planet].from.toString());
    }
    document.getElementById(idNameVis).innerHTML += `<span style="color: white;">${text}</span>`;

    if (planetsData[planet].visibility) {
        text = formatTime(planetsData[planet].to.toString());
    }
    idNameVis = `until_${planet}`;
    document.getElementById(idNameVis).innerHTML += `<span style="color: white;">${text}</span>`;
    if (planet == "sun"){
        const rise = planetsData[planet].rise[0];
        const set = planetsData[planet].set[0];
        const nauticalSunrise = adjustTimeByMinutes(rise, -35);
        const nauticalSunset = adjustTimeByMinutes(set, +35);

        let idNameVis = "nautical_sunrise";
        document.getElementById(idNameVis).innerHTML += `<span style="color: white;">${formatTime(nauticalSunrise)}</span>`;

        idNameVis = "nautical_sunset";
        document.getElementById(idNameVis).innerHTML += `<span style="color: white;">${formatTime(nauticalSunset)}</span>`;
    }
}


function adjustTimeByMinutes(timeStr, minutes) {
    // Split the time string into hours and minutes
    let [hours, mins] = timeStr.split(':').map(Number);

    // Create a new Date object with the given time
    let date = new Date();
    date.setHours(hours);
    date.setMinutes(mins);

    // Adjust the time by the specified number of minutes
    date.setMinutes(date.getMinutes() + minutes);

    // Format the new time back to a string
    let newHours = String(date.getHours()).padStart(2, '0');
    let newMinutes = String(date.getMinutes()).padStart(2, '0');

    return `${newHours}:${newMinutes}`;
}

function todaysDate() {
    const date = planetsData["venus"].date[0].toString();
    document.getElementById("title-date").innerHTML = `${formatDate(date)}`;
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

function convertAUtoKM(dist) {
    const AU_TO_KM = 149597870.7;
    const km = Math.round(dist * AU_TO_KM);
    return km.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function planetOnConstellation(constellation, _ra, _dec) {
    //console.log(`constellation: ${constellation.bodyName} ra: ${_ra} dec: ${_dec}`);
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

function drawConstellationGraph(planet, constellation) {
    console.log(constellationsData[constellation]);
    let idNameConst = `constellation_${planet}_img`;
    const imgPath = constellationsPath[constellation].toString();
    //console.log(imgPath);

    let svgWidth = 600;
    let svgHeight = 600;
    const planetPos = planetOnConstellation(constellationsData[constellation], raStringToDegrees(planetsData[planet].ra[0]), decStringToDegrees(planetsData[planet].dec[0]));
    //console.log(`${planet} ra: ${planetsData[planet].ra[0]} dec: ${planetsData[planet].dec[0]}`);
    //console.log(`x: ${planetPos.x} y: ${planetPos.y}`);
    // Create SVG elements
    let width = 200;
    let height = 200;
    let xPos = 20;
    if (constellation == "Ari") {
        if (planetPos.x < -200) {
            xPos = -150;
            width = 140;
            height = 140;
        }
        else if (planetPos.x > 200) {
            width = 140;
            height = 140;
            xPos = 150;
        }
    }
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${xPos} -130 ${svgWidth} ${svgHeight}" preserveAspectRatio="xMidYMid meet" width="${width}%" height="${height}%" style="overflow: visible; position: absolute;">`;;
    // Add the constellation image
    svg += `<image xlink:href="${imgPath}" width="${svgWidth}" height="${svgHeight}" onerror="this.style.display='none'" />`;
    // Add the circle and the planet point
    //console.log(planetPos);
    //if (planet != "sun" && planet != "moon") {
    svg += `<circle cx="${planetPos.x}" cy="${planetPos.y}" r="5" fill="orange" />`; // Point
    svg += `<circle cx="${planetPos.x}" cy="${planetPos.y}" r="60" fill="none" stroke="#03334F" stroke-width="8" />`; // Circle around the point
    // Add text
    svg += `<text x="${(svgWidth / 2) -20}" y="-80" font-size="40" text-anchor="middle" fill="white">à 22h ce soir</text>`;
    //}
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
    const noonAzimuthIndex = obj.noonAzimuthIndex !== undefined ? obj.noonAzimuthIndex : 0;

    // Create data array with azimuth and elevation pairs
    const data = azimuth.map((az, index) => {
        return { azimuth: az, elevation: elevation[index] };
    });

    // Determine the SVG dimensions
    const svgWidth = 600;
    const svgHeight = 300;
    const topMargin = 30; // Add a top margin to accommodate the text
    const padding = 65; // Add padding to the left and right sides of the graph
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
    let svg = `<svg viewBox="0 30 ${svgWidth} ${svgHeight}" preserveAspectRatio="xMidYMid meet" width="100%" height="100%">`;

    ///////
    // Generate a unique ID for each gradient
    const uniqueId = `multiColorGradient_${Math.random().toString(36).substr(2, 9)}`;

    // Find the y-coordinate for zero elevation
    const zeroElevationY = svgHeight - topMargin - padding - ((0 - minElevation) / (maxElevation - minElevation)) * (svgHeight - topMargin - padding) + 50;


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    // Gradient setup
    let stops = [];


    if (sunSetIndex < sunRiseIndex) {
        // Sunset before sunrise (wrap-around scenario)
        stops.push({ offset: 0, color: 'black' });
        stops.push({ offset: Math.floor(sunSetIndex * 100 / time.length) + 5, color: 'black' });
        stops.push({ offset: Math.floor(sunRiseIndex * 100 / time.length) + 5, color: 'black' });
        stops.push({ offset: Math.floor(sunRiseIndex * 100 / time.length) + 5, color: 'blue' });
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

    // Sort stops by offset to ensure correct order
    stops.sort((a, b) => a.offset - b.offset);

    // Generate the gradient stops
    let gradientStops = stops.map(stop => `<stop offset="${stop.offset}%" style="stop-color: ${stop.color}; stop-opacity: 1" />`).join('\n');

    // Define the gradient
    svg += `
<defs>
   <linearGradient id="${uniqueId}" x1="0%" y1="0%" x2="100%" y2="0%">
               ${gradientStops}
  </linearGradient>
</defs>
  `;

    // Draw the gradient bar
    svg += `<rect x="${padding}" y="${zeroElevationY - 4}" width="${svgWidth - 2 * padding}" height="2" fill="url(#${uniqueId})" />`;
    //svg += `<rect x="0" y="${zeroElevationY - 4}" width="${svgWidth}" height="2" fill="url(#${uniqueId})" />`;


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



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


    // Draw the horizontal line at zero elevation
    svg += `<line x1="0" y1="${zeroElevationY}" x2="${svgWidth}" y2="${zeroElevationY}" style="stroke:darkgrey;stroke-width:1;stroke-dasharray:5,5"/>`;

    if (visible) {
        // Add the vertical line at the specified azimuth
        if (visStartIndex != null) {

            const verticalLineX = scaledAzimuth[visStartIndex];
            // Find and add the intersection point
            const intersection = findIntersection(verticalLineX, scaledAzimuth, scaledElevation);

            svg += `<line x1="${verticalLineX}" y1="${zeroElevationY}" x2="${verticalLineX}" y2="${intersection.y}" style="stroke:white;stroke-width:2"/>`;


            if (intersection) {
                svg += `<circle cx="${intersection.x}" cy="${intersection.y}" r="5" fill="grey"/>`;
                svg += `<text x="${intersection.x + 10}" y="${intersection.y + 5}" text-anchor="start" font-size="12px" fill="white">${Math.trunc(elevation[visStartIndex])}°</text>`;
                svg += `<text x="${intersection.x}" y="${zeroElevationY + 15}" text-anchor="middle" font-size="12px" fill="white">${formatTime(from)}</text>`;
            }
        }

        // Add the vertical line at the specified azimuth
        if (visEndIndex != null) {
            //console.log(visEndIndex);
            const verticalLineX = scaledAzimuth[visEndIndex];

            // Find and add the intersection point
            const intersection = findIntersection(verticalLineX, scaledAzimuth, scaledElevation);

            svg += `<line x1="${verticalLineX}" y1="${zeroElevationY}" x2="${verticalLineX}" y2="${intersection.y}" style="stroke:white;stroke-width:2"/>`;

            if (intersection) {
                svg += `<circle cx="${intersection.x}" cy="${intersection.y}" r="5" fill="grey"/>`;
                svg += `<text x="${intersection.x + 10}" y="${intersection.y + 5}" text-anchor="start" font-size="12px" fill="white">${Math.trunc(elevation[visEndIndex])}°</text>`;
                svg += `<text x="${intersection.x}" y="${zeroElevationY + 15}" text-anchor="middle" font-size="12px" fill="white">${formatTime(until)}</text>`;

            }
        }


    } else {
        const text = "Non visible  à l'oeil nu";
        const fontSize = 16;
        svg += `<rect x="${svgWidth / 2 + (svgWidth / 3) - (text.length * fontSize / 4)}" y="${50 - fontSize}" width="${text.length * fontSize / 2}" height="${fontSize * 1.5}" fill="#600429" text-anchor="start"></rect>`;
        svg += `<text x="${svgWidth / 2 + (svgWidth / 3)}" y="${50}" text-anchor="middle" font-size="${fontSize}px" fill="white">${text}</text>`;

    }

    // Function to draw diagonal lines
    function drawDiagonals(svg, scaledAzimuth, scaledElevation, visStartIndex, visEndIndex, zeroElevationY) {

        const totalWidth = scaledAzimuth[visEndIndex] - scaledAzimuth[visStartIndex];

        let divider = totalWidth > 50.0 ? 20 : 10;

        const numDiagonals = Math.floor(totalWidth / divider); // Adjust the divisor to control spacing
        const stepX = totalWidth / numDiagonals;

        for (let i = 1; i <= numDiagonals - 1; i++) {
            const x = scaledAzimuth[visStartIndex] + i * stepX;
            const intersection = findIntersection(x, scaledAzimuth, scaledElevation);
            if (intersection) {
                svg += `<line x1="${x}" y1="${intersection.y + 2}" x2="${x}" y2="${zeroElevationY - 6}" style="stroke:#2A3044;stroke-width:1;stroke-dasharray:5,5"/>`;
            }
        }
        return svg;
    }
    if ((visible && visStartIndex != null && visEndIndex != null) || obj.bodyName == "sun") {
        if (obj.bodyName == "sun") {
            svg = drawDiagonals(svg, scaledAzimuth, scaledElevation, 1, time.length - 1, zeroElevationY);
        }
        else {
            svg = drawDiagonals(svg, scaledAzimuth, scaledElevation, visStartIndex, visEndIndex, zeroElevationY);
        }
    }

    // Add text in visible area
    if (visStartIndex != null && visEndIndex != null) {
        svg += `<text x="${scaledAzimuth[Math.floor((visStartIndex + visEndIndex) / 2)]}" y="175" text-anchor="middle" font-size="12px" fill="white">visible</text>`; //#7A8CC6
    }
    else if (obj.bodyName == "sun") {
        svg += `<text x="${scaledAzimuth[sunCulmIndex]}" y="175" text-anchor="white" font-size="12px" fill="white">visible</text>`;
    }


    // Add text for max elevation
    const maxElevationIndex = elevation.indexOf(maxElevation);
    const maxElevationX = scaledAzimuth[maxElevationIndex];
    const maxElevationY = scaledElevation[maxElevationIndex]  // Position it above the max elevation point
    // Altitude Heading text above the max
    svg += `<text x="${maxElevationX + 18}" y="${maxElevationY - 5}" text-anchor="end" font-size="10px" fill="grey">culm : ${Math.trunc(maxElevation)}°</text>`;
    // Zero elevation
    svg += `<text x="0" y="${zeroElevationY - 5}" text-anchor="right" font-size="10px" fill="grey">Horizon : 0°</text>`;
    // Add the vertical line at max elevation
    //svg += `<line x1="${maxElevationX}" y1="${zeroElevationY - 2}" x2="${maxElevationX}" y2="${maxElevationY}" style="stroke:grey;stroke-width:0,5;stroke-dasharray:5,5"/>`;

    // Add azimuth direction text below the first, middle, and last points
    const firstAzimuthX = scaledAzimuth[0];
    const middleAzimuthX = scaledAzimuth[Math.floor((numValues - 1) / 2)];
    const lastAzimuthX = scaledAzimuth[numValues - 1];
    const minElevationY = svgHeight - yBottomOffset; // Position it below the graph

    // azimuth and time
    svg += `<text x="${firstAzimuthX}" y="${minElevationY + 18}" text-anchor="middle" font-size="14px" fill="grey">${getAzimuthLabel(azimuth[0])}</text>`;
    svg += `<text x="${firstAzimuthX}" y="${minElevationY + 2}" text-anchor="middle" font-size="12px" fill="grey">${formatTime(rise.toString())}</text>`;
    svg += `<text x="${(middleAzimuthX + firstAzimuthX) / 2}" y="${minElevationY + 18}" text-anchor="middle" font-size="14px" fill="grey">${getAzimuthLabel(azimuth[Math.floor((numValues - 1) * 0.25)])}</text>`;
    svg += `<text x="${middleAzimuthX}" y="${minElevationY + 18}" text-anchor="middle" font-size="14px" fill="grey">${getAzimuthLabel(azimuth[Math.floor((numValues - 1) / 2)])}</text>`;
    svg += `<text x="${(middleAzimuthX + lastAzimuthX) / 2}" y="${minElevationY + 18}" text-anchor="middle" font-size="14px" fill="grey">${getAzimuthLabel(azimuth[Math.floor((numValues - 1) * 0.75)])}</text>`;
    svg += `<text x="${lastAzimuthX}" y="${minElevationY + 18}" text-anchor="middle" font-size="14px" fill="grey">${getAzimuthLabel(azimuth[numValues - 1])}</text>`;
    svg += `<text x="${lastAzimuthX}" y="${minElevationY + 2}" text-anchor="middle" font-size="12px" fill="grey">${formatTime(set.toString())}</text>`;

    // Moon and Sun icons
    if (midnightAzimuthIndex > 0 && midnightAzimuthIndex < scaledAzimuth.length - 1) {
        svg += `<image href="images/resources/smallMoon.png" x="${scaledAzimuth[midnightAzimuthIndex]}" y="${zeroElevationY - 22}" width="15" height="15" />`;
        svg += `<text x="${scaledAzimuth[midnightAzimuthIndex] - 8}" y="${zeroElevationY - 25}" text-anchor="start" font-size="10px" fill="grey">minuit</text>`;
        //svg += `<text x="${scaledAzimuth[midnightAzimuthIndex]}" y="${zeroElevationY - 22}" text-anchor="middle" font-size="14px" fill="lightgrey">minuit</text>`;
    }
    if (noonAzimuthIndex > 0 && noonAzimuthIndex < scaledAzimuth.length - 1) {
        svg += `<image href="images/resources/smallSun.png" x="${scaledAzimuth[noonAzimuthIndex]}" y="${zeroElevationY - 22}" width="15" height="15" opacity="1" />`;
        svg += `<text x="${scaledAzimuth[noonAzimuthIndex] - 2}"  y="${zeroElevationY - 25}" text-anchor="start" font-size="10px" fill="grey">midi</text>`;

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


async function getWeatherData() {
    const apiKey = 'fd05c92a7ac1463f9a3175814241512'; // Your WeatherAPI key
    const city = 'Montreal';
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=2`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);

        const weatherDiv = document.getElementById('weather');
        weatherDiv.innerHTML = ''; // Clear previous data

        // Get the sunset time for today
        const sunsetTime = data.forecast.forecastday[0].astro.sunset;

        // Parse the sunset time to get hours and minutes
        const [sunsetHour, sunsetMinute] = sunsetTime.split(':').map(time => parseInt(time, 10));
        const sunsetPeriod = sunsetTime.split(' ')[1]; // AM or PM

        // Convert to 24-hour format if necessary
        let sunsetHour24 = sunsetHour;
        if (sunsetPeriod === 'PM' && sunsetHour !== 12) {
            sunsetHour24 += 12;
        } else if (sunsetPeriod === 'AM' && sunsetHour === 12) {
            sunsetHour24 = 0;
        }

        // Create a Date object for today's sunset time
        const now = new Date();
        const sunsetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), sunsetHour24, sunsetMinute);

        // Filter the forecast data to start from sunset
        const todaysForecast = data.forecast.forecastday[0].hour.filter(hourData => {
            const forecastDate = new Date(hourData.time);
            return forecastDate >= sunsetDate;
        });

        // Parse the sunrise time from the second day's forecast
        const sunriseTimeString = data.forecast.forecastday[1].astro.sunrise;
        const [sunriseHour, sunriseMinute] = sunriseTimeString.split(':').map(time => parseInt(time, 10));
        const sunrisePeriod = sunriseTimeString.split(' ')[1]; // AM or PM

        // Convert to 24-hour format if necessary
        let sunriseHour24 = sunriseHour;
        if (sunrisePeriod === 'PM' && sunriseHour !== 12) {
            sunriseHour24 += 12;
        } else if (sunrisePeriod === 'AM' && sunriseHour === 12) {
            sunriseHour24 = 0;
        }

        // Create a Date object for tomorrow's sunrise time
        const sunriseDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, sunriseHour24, sunriseMinute);

        // Filter the forecast data to end at sunrise
        const tomorrowForecasts = data.forecast.forecastday[1].hour.filter(hourData => {
            const forecastDate = new Date(hourData.time);
            return forecastDate < sunriseDate;
        });

        // Combine today's and tomorrow's forecasts
        const forecasts = todaysForecast.concat(tomorrowForecasts);

        // Process the filtered forecast data and update the DOM
        forecasts.forEach(forecast => {
            const date = new Date(forecast.time);
            const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const icon = forecast.condition.icon;
            const temp = forecast.temp_c;

            weatherDiv.innerHTML += `
                <div class="forecast-item">
                    <h3 class="forecast-time">${timeString}</h3>
                    <img class="forecast-icon" src="${icon}">
                    <p class="forecast-temp">${temp}°C</p>
                </div>
            `;
        });

        return data; // Return the fetched data
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Failed to fetch weather data. Please try again later.');
    }
}

function isInRange(value, range) {
    if (Array.isArray(range[0])) {
        // Handle wrap-around range
        return (value >= range[0][0] && value <= range[0][1]) || (value >= range[1][0] && value <= range[1][1]);
    } else {
        // Handle normal range
        return value >= range[0] && value < range[1];
    }
}

function displayVenusPhases() {
    const venusData = planetsData["venus"];
    const illumination = venusData.illumination[0]; // Current illumination value
    const nextIllumination = venusData.illumination[1]; // Next illumination value

    //console.log('Current Illumination:', illumination);
    //console.log('Next Illumination:', nextIllumination);

    let phaseValue = illumination;
    if (nextIllumination < illumination) {
        // If the next illumination value is greater than the current, the left right is illuminated
        phaseValue += 90;
    }

    //console.log('Phase Value:', phaseValue);

    const phaseindex = venusPhasesPaths.find(p => {
        //console.log(`Checking range: ${p.range} for phase value: ${phaseValue}`);
        return isInRange(phaseValue, p.range);
    });
    console.log(phaseindex.MediaSource);
    if (phaseindex) {
        //console.log('Phase found:', phaseindex);
        document.getElementById('venus_phase_image').src = phaseindex.MediaSource;
    } else {
        console.error('No matching phase found for phase value:', phaseValue);
    }
}

function displayMercuryPhases() {
    const mercuryData = planetsData["mercury"];
    const illumination = mercuryData.illumination[0]; // Current illumination value
    const nextIllumination = mercuryData.illumination[1]; // Next illumination value

    //console.log('Current Illumination:', illumination);
    //console.log('Next Illumination:', nextIllumination);

    let phaseValue = illumination;
    if (nextIllumination < illumination) {
        // If the next illumination value is greater than the current, the left right is illuminated
        phaseValue += 90;
    }

    //console.log('Phase Value:', phaseValue);

    const phaseindex = mercuryPhasesPaths.find(p => {
        //console.log(`Checking range: ${p.range} for phase value: ${phaseValue}`);
        return isInRange(phaseValue, p.range);
    });
    console.log(phaseindex.MediaSource);
    if (phaseindex) {
        //console.log('Phase found:', phaseindex);
        document.getElementById('mercury_phase_image').src = phaseindex.MediaSource;
    } else {
        console.error('No matching phase found for phase value:', phaseValue);
    }
}

// function displayMoonPhases() {
//     const moonData = planetsData["moon"];
//     const illumination = moonData.illumination[0]; // Current illumination value
//     const nextIllumination = moonData.illumination[1]; // Next illumination value

//     //console.log('Current Illumination:', illumination);
//     //console.log('Next Illumination:', nextIllumination);

//     let phaseValue = illumination;
//     console.log("illumination: " + illumination + "   nextIllumination: " + nextIllumination);
//     if (nextIllumination > illumination) {
//         // If the next illumination value is greater than the current, the left right is illuminated
//         phaseValue += 180;
//     }
    

//     console.log('Phase Value:', phaseValue);

//     const phaseindex = moonPhasesPaths.find(p => {
//         //console.log(`Checking range: ${p.range} for phase value: ${phaseValue}`);
//         return isInRange(phaseValue, p.range);
//     });

//     console.log(phaseindex.MediaSource);
//     if (phaseindex) {
//         //console.log('Phase found:', phaseindex);
//         document.getElementById('moon_phase_image').src = phaseindex.MediaSource;
//     } else {
//         console.error('No matching phase found for phase value:', phaseValue);
//     }
// }
function displayMoonPhases() {
    // const moonData = planetsData["moon"];
    // const phase = moonData.phase % 360;
    // const illumination = moonData.illumination[0];
    // const nextIllumination = moonData.illumination[1];

    // // Determine if the moon is waning (optional, for debugging or future use)
    // const isWaning = nextIllumination < illumination;

    // // Rotate phase so that 0° = MoonPhases_11.png (New Moon)
    // let rotatedPhase = (phase + 195) % 360;

    // // Map to 24 images (each 15° wide)
    // let imageIndex = Math.floor(rotatedPhase / 15);

    // // Wrap around to 0–23
    // imageIndex = imageIndex % 24;

    // const imagePath = `images/moon/phases/MoonPhases_${String(imageIndex).padStart(2, '0')}.png`;

    // console.log("Phase:", phase);
    // console.log("Rotated Phase:", rotatedPhase);
    // console.log("Image Index:", imageIndex);
    // console.log("Image Path:", imagePath);
    const imagePath = `images/moon/phases/MoonPhases_10.png`;

    document.getElementById('moon_phase_image').src = imagePath;
}





document.addEventListener('DOMContentLoaded', async () => {
    try {
        getWeatherData();
        // Fetch data for all planets using the keys
        await Promise.all(Object.keys(planets).map(planet => fetchData(planet)));
        console.log(planetsData);
        Object.keys(planets).forEach(planet => displayData(planet));

        displayVenusPhases();
        displayMercuryPhases();
        displayMoonPhases();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
