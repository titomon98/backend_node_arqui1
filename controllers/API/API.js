'use strict'
const axios = require('axios')

module.exports = {
    apiPOST (req, res) {
            // Send a POST request
        axios({
            method: 'post',
            url: '/user/12345',
            data: {
            firstName: 'Fred',
            lastName: 'Flintstone'
            }
        });
    },
    apiGET (req, res) {
            // Send a GET request
        axios({
            method: 'get',
            url: '/user/12345'
        });
    },
    apiPUT (req, res) {
            // Send a PUT request
        axios({
            method: 'put',
            url: '/user/12345',
            data: {
            firstName: 'Fred',
            lastName: 'Flintstone'
            }
        });
    },
}