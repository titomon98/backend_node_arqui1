'use strict'
const axios = require('axios')

module.exports = {
    APIPOST (req, res) {
            // Send a POST request
        axios({
            method: 'post',
            url: '/user/202108047',
            data: {
            firstName: 'Angely',
            lastName: 'Thomas'
            }
        });
    },

    APIGET (req, res) {
        // Send a GET request
        axios({
            method: 'get',
            url: '/user/202108047',
            data: {
            firstName: 'Angely',
            lastName: 'Thomas'
            }
        });
    },

    APIPUT (req, res) {
        // Send a PUT request
        axios({
            method: 'put',
            url: '/user/202108047',
            data: {
            firstName: 'Angely',
            lastName: 'Thomas'
            }
        });
    }
}