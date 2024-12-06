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

const fetchData = async (planet) => {
    try {
        const response = await fetch(`data/${planet}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        planetsData[planet] = data;
        console.log(`${planet} data:`, data);
    } catch (error) {
        console.error(`Error fetching data for ${planet}:`, error);
    }
};

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch data for all planets using the keys
        Object.keys(planets).forEach(planet => fetchData(planet));
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
