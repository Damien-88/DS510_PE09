const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
    const city = req.body.queryResult.parameters["geo-city"];
    const type = req.body.queryResult.parameters["weather_type"];

    let responseText = "";

    if(type === "rain") {
        responseText = `It might rain in ${city} today.`;
    } else if(type === "temperature") {
        responseText = `The average temperature in ${city} is 75°F this time of year.`;
    } else if(type === "wind") {
        responseText = `Expect breezy conditions in ${city}.`;
    } else if(type === "snow") {
        responseText = `There is a chance of snow in ${city}.`;
    } else if(type === "storming") {
        responseText = `There will be scatter thunderstorms around ${city} this afternoon.`;
    } else {
        responseText = 
        `I can provide information about rain, temperature, snow, storms or wind. 
        Which one would you like?`;
    }

    return res.json({ fulfillmentText: responseText });
});

// Start the server
app.listen(3000, () => {
    console.log("Webhook server is running on port 3000");
});