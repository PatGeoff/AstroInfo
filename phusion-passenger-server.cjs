async function loadApp() {
    const { app } = await import("./main.js");
}
loadApp()