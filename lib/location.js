const got = require('got');

const GEO_CODE_AUTH_KEY = process.env.GEO_CODE_AUTH_KEY || '426779983597119346495x1676';
const GEO_CODE_LOCATION_API = process.env.GEO_CODE_LOCATION_API_ENDPOINT || 'https://geocode.xyz/{city_name}?json=1';

const MW_API = process.env.METAWEATHER_API || 'https://www.metaweather.com/api/location'
const MW_LOCATION_SEARCH_ENDPOINT = '/location/search/?lattlong={latt},{longt}';
const MW_WHEATHER_INFO_ENDPOINT = '/location/{woeid}';

const ONWATER_INFO_API_AUTH_KEY = process.env.ONWATER_INFO_API_AUTH_KEY || 'ay2p4AThs2Twh3Zn2oKM';
const ONWATER_INFO_API = process.env.ONWATER_INFO_API_ENDPOINT || 'https://api.onwater.io/api/v1/results/{latt_long}';

/**
 * Common function for request
 * 
 * @param {string} url 
 * @param {object} options 
 */
async function request(url, options = { json: true }) {
    return await got(url, options);
}

/**
 * Retruns city information.
 * @param {string} city_name 
 */
module.exports.findLocation = async (city_name) => {
    try {
        const url = `${GEO_CODE_LOCATION_API.replace("{city_name}", city_name)}&auth=${GEO_CODE_AUTH_KEY}`;    
        const city_location = await request(url);
        return city_location.body;
    } catch(e) {
        throw new Error(e);
    }   
}

/**
 * Retruns nearest cities of given lattitude and longitude
 * @param {number} latt
 * @param {number} longt 
 */
module.exports.findNearestCities = async (latt, longt) => {
    try {    
        const url = `${MW_API}${MW_LOCATION_SEARCH_ENDPOINT.replace('{latt}', latt).replace('{longt}', longt)}`
        const nearest_cities = await request(url);
        return nearest_cities.body;
    } catch(e) {
        throw new Error(e);
    }   
};

/**
 * Return wheather informations
 * @param {object} location 
 */
module.exports.findWheather = async (location) => {
    try {
        const url = `${MW_API}${MW_WHEATHER_INFO_ENDPOINT.replace('{woeid}', location.woeid)}`
        const location_wheather_info = await request(url);
        return { 
            [location.woeid]: location_wheather_info.body
        };
    } catch(e) {
        throw new Error(e);
    }
}

/**
 * Return water information of given lattitude and longtitude
 * @param {object} location 
 */
module.exports.findWaterInfo = async (location) => {
    try {
        const url = `${ONWATER_INFO_API.replace('{latt_long}', location.latt_long)}?access_token=${ONWATER_INFO_API_AUTH_KEY}`
        const location_water_info = await request(url);
        return { 
            [location.woeid]: location_water_info.body
        };
    } catch(e) {
        throw new Error(e);
    }
}

/**
 * Retruns combined data of same location
 * @param {array} location 
 */
module.exports.mergeLocationById = (locations) => {
    const response = {};
    Object.values(locations).map((d) => {
        const woeid = Object.keys(d)[0];
        if(!response.hasOwnProperty(woeid)) {
            response[woeid] = {};
        }
        response[woeid] = Object.assign({}, response[woeid], d[woeid]);
    });

    return Object.values(response);
}