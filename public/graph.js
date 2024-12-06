// graph.js

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


function getAzimuthLabel(azimuth) {
    for (const { range, label } of azimuthLabels) {
        if (azimuth >= range[0] && azimuth < range[1]) {
            return label;
        }
    }
    return "Unknown"; // Fallback
}


export function drawElevationGraph(elevation, azimuth, visStartIndex, visEndIndex, visible, time, graphName,) {
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
    svg += `<path d="${pathData}" style="fill:none;stroke:black;stroke-width:2"/>`;

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

    if (visible) {
        // Add the vertical line at the specified azimuth
        if (visStartIndex !== 0) {
            const verticalLineX = scaledAzimuth[visStartIndex];
            svg += `<line x1="${verticalLineX}" y1="${svgHeight - yBottomOffset}" x2="${verticalLineX}" y2="0" style="stroke:grey;stroke-width:2"/>`;

            // Find and add the intersection point
            const intersection = findIntersection(verticalLineX, scaledAzimuth, scaledElevation);
            if (intersection) {
                svg += `<circle cx="${intersection.x}" cy="${intersection.y}" r="5" fill="grey"/>`;
                svg += `<text x="${intersection.x + 30}" y="${intersection.y + 5}" text-anchor="middle" font-size="12px" fill="black">${time[visStartIndex].replace(/'/g, '')}</text>`;
            }
        }

        // Add the vertical line at the specified azimuth
        if (visEndIndex !== 0) {
            const verticalLineX = scaledAzimuth[visEndIndex];
            svg += `<line x1="${verticalLineX}" y1="${svgHeight - yBottomOffset}" x2="${verticalLineX}" y2="0" style="stroke:grey;stroke-width:2"/>`;

            // Find and add the intersection point
            const intersection = findIntersection(verticalLineX, scaledAzimuth, scaledElevation);
            if (intersection) {
                svg += `<circle cx="${intersection.x}" cy="${intersection.y}" r="5" fill="grey"/>`;
                svg += `<text x="${intersection.x + 30}" y="${intersection.y + 5}" text-anchor="middle" font-size="12px" fill="black">${time[visEndIndex].replace(/'/g, '')}</text>`;
            }
        }
        //svg += `<text x="${svgWidth / 2}" y="${svgHeight / 2}" text-anchor="middle" font-size="14px" fill="black">Visible en ce moment</text>`;
    } else {
        //svg += `<text x="${svgWidth / 2}" y="${svgHeight / 2}" text-anchor="middle" font-size="14px" fill="black">NON visible en ce moment</text>`;
    }


    // Find the y-coordinate for zero elevation
    const zeroElevationY = svgHeight - topMargin - padding - ((0 - minElevation) / (maxElevation - minElevation)) * (svgHeight - topMargin - padding) + 50;

    // Draw the horizontal line at zero elevation
    svg += `<line x1="0" y1="${zeroElevationY}" x2="${svgWidth}" y2="${zeroElevationY}" style="stroke:darkgrey;stroke-width:1;stroke-dasharray:5,5"/>`;

    // Add text for max elevation
    const maxElevationIndex = elevation.indexOf(maxElevation);
    const maxElevationX = scaledAzimuth[maxElevationIndex];
    const maxElevationY = scaledElevation[maxElevationIndex]  // Position it above the max elevation point
    // Altitude Heading text above the max
    svg += `<text x="${maxElevationX}" y="${maxElevationY - 5}" text-anchor="middle" font-size="12px" fill="grey">A H: ${maxElevation.toFixed(2)}</text>`;
    // Zero elevation
    svg += `<text x="${maxElevationX +2}" y="${zeroElevationY - 2}" text-anchor="right" font-size="12px" fill="grey">0</text>`;
    // Add the vertical line
    svg += `<line x1="${maxElevationX}" y1="${zeroElevationY - 2}" x2="${maxElevationX}" y2="${maxElevationY}" style="stroke:grey;stroke-width:0,5;stroke-dasharray:5,5"/>`;




    // Add azimuth direction text below the first, middle, and last points
    const firstAzimuthX = scaledAzimuth[0];
    const middleAzimuthX = scaledAzimuth[Math.floor((numValues - 1) / 2)];
    const lastAzimuthX = scaledAzimuth[numValues - 1];
    const minElevationY = svgHeight - yBottomOffset; // Position it below the graph

    svg += `<text x="${firstAzimuthX}" y="${minElevationY}" text-anchor="middle" font-size="14px" fill="black">${getAzimuthLabel(azimuth[0])}</text>`;
    svg += `<text x="${middleAzimuthX}" y="${minElevationY}" text-anchor="middle" font-size="14px" fill="black">${getAzimuthLabel(azimuth[Math.floor((numValues - 1) / 2)])}</text>`;
    svg += `<text x="${lastAzimuthX}" y="${minElevationY}" text-anchor="middle" font-size="14px" fill="black">${getAzimuthLabel(azimuth[numValues - 1])}</text>`;

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
