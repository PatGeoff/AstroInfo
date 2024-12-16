import express from "express";
import path from "path";
import fetchAll from './fetching.js';
import parsing from './parsing.js';

const ONE_DAY = 24 * 60 * 60 * 1000;
const PORT = process.env.PORT || 3000;

export const app = express();

// End-point to get local JSONs
app.get('/data/:planet', parsing);

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Serve the index.html file at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Press Ctrl+C to quit.');
});

// Fetch all data now
fetchAll().then(() => setInterval(() => {
    console.log("REFETCH")
    fetchAll();
}, ONE_DAY))

export default app;