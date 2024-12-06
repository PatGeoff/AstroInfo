import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3000;

app.get('/data/:planet', (req, res) => {
    const planet = req.params.planet;
    const filePath = path.join(process.cwd(), 'public', 'data', `${planet}.json`);
    console.log(`Fetching data for: ${planet}`);
    console.log(`File path: ${filePath}`);
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file ${filePath}:`, err);
            res.status(500).send(`Error reading file ${filePath}: ${err.message}`);
            return;
        }
        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        } catch (parseError) {
            console.error(`Error parsing JSON data from file ${filePath}:`, parseError);
            res.status(500).send(`Error parsing JSON data from file ${filePath}: ${parseError.message}`);
        }
    });
});

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Serve the index.html file at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});