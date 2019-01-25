const geoCodeMock = require('../mocks/geo-location.mock');
const nearestLocationsMock = require('../mocks/nearest-locations.mock');
const waterMock = require('../mocks/water.mock');
const wheatherMock = require('../mocks/wheather.mock');
const location = require('./location');

const gotMock = (url, opts) => {
    if (url.indexOf('geocode.xyz') !== -1) {
        geoCodeMock.successResponse(url, opts);
    } else if(url.indexOf('lattlong') !== -1) {
        nearestLocationsMock.successResponse(url, opts);
    } else if(url.indexOf('onwater') !== -1) {
        waterMock.successResponse(url, opts);
    } else if(url.indexOf('location/2488853') !== -1) {
        wheatherMock.successResponse(url, opts);
    }
}

jest.setMock('got', gotMock)

describe('Testing Location', () => {
    beforeEach(()=> {
        jest.resetModules()
    })

    it('covers findLocation', async () => {
        const response = await location.findLocation('New York');
        expect(response).toBeDefined();
    });

    it('covers findNearestCities', async () => {
        const response = await location.findNearestCities(36.96,-122.02);
        expect(response).toBeDefined();
    });

    it('covers water info', async () => {
        const response = await location.findWaterInfo({latt_long: '36.96,-122.02'});
        expect(response).toBeDefined();
    });

    it('covers water info', async () => {
        const response = await location.findWheather({woeid: 2488853});
        expect(response).toBeDefined();
    });
});