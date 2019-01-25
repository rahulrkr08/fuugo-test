module.exports = {
    successResponse: (url, opts) => {
        return new Promise((resolve, reject) => {
            const response = {"lat":23.922975941646328,"lon":-66.30027793593565,"water":true};
            resolve(response)
        });
    }
}