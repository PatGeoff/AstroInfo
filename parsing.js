import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.route('/data/:planet').get(function (req, res) {
    const planet = req.params.planet;
    const filePath = path.join(process.cwd(), 'public', 'data', `${planet}.json`);
    console.log(`Fetching local data for: ${planet}`);
    console.log(`Local file path: ${filePath}`);

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

export default router;