
import { Navigate } from 'react-router-dom';
const {BACKEND_PORT} = require("../constants.js");

// calls backend /scanin function
async function fetchScanin() {
    const response = await fetch("http://localhost:" + BACKEND_PORT + "/scanin");
}

// PageThree is used to add an entry to DB, then redirect to main page
function PageThree(req, res) {
    fetchScanin();
    //redirects to main page
    return <Navigate to="/"/>;
}

export default PageThree;
