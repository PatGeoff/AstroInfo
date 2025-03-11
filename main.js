import express from "express";
import path from "path";
import fetchAll from './fetching.js';
import parsing from './parsing.js';
import nunjucks from "nunjucks";

const ONE_DAY = 24 * 60 * 60 * 1000;
const PORT = process.env.PORT || 3000;

export const app = express();

// End-point to get local JSONs
app.get('/data/:planet', parsing);

// Enable nunjucks templating
// https://mozilla.github.io/nunjucks/getting-started.html
nunjucks.configure('views', {
    autoescape: true,
    express: app,
    // TODO Use environment variable for caching, and disable on production server
    noCache: true
});

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Serve any page from the views folder
app.get('/:page', (req, res) => {
    res.render(req.params.page);
});

// Serve the index.html file at the root URL
app.get('/', (req, res) => {
    res.render('index.html');
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
