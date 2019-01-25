const { 
    findLocation, 
    findNearestCities, 
    findWaterInfo, 
    findWheather, 
    mergeLocationById 
} = require('./location');

const getLocationInfo = async (req, res) => {

    try {
        if(!req.query || !req.query.q) {
            res.status(404).send("Location not found");
        }
        
        // Get the location details
        const location = await findLocation(req.query.q);

        // find the nearest cities
        const nearest_cities = await findNearestCities(location.latt, location.longt);
        const wheather_promises = [], water_promises = [];

        // Process the promises to find wheater conditions and water status of nearest cities
        nearest_cities.map(city => {
            wheather_promises.push(findWheather(city));
            water_promises.push(findWaterInfo(city));
        })

        const data = await Promise.all([...wheather_promises, ...water_promises]).then(response => mergeLocationById(response));
        res.send(data);
        
    } catch(e) {
        res.status(500).send(`Found some issues on server, please try again. ${e}`)
    }   
};

module.exports = {
    getLocationInfo
};