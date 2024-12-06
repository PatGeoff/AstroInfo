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
}

function visibility(planet) {
    let idNameVis = `visibility_${planet}`; 
    let idNameUntil = `visibility_until_${planet}`;
    if (planetsData[planet].visibility){
        document.getElementById(idNameVis).innerHTML = `Visible`;
    }
    else{
        document.getElementById(idNameVis).innerHTML = `Non visible`;        
    }
    const date = planetsData[planet].until.toString();
    document.getElementById(idNameUntil).innerHTML = `jusqu'au ${formatDate(date)}`;     
}

function formatDate(dateString){
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

    // Return the formatted date in French
    return `${day} ${monthInFrench} ${year}`;
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch data for all planets using the keys
        await Promise.all(Object.keys(planets).map(planet => fetchData(planet)));
        console.log(planetsData);
        Object.keys(planets).forEach(planet => displayData(planet));


    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
