const axios = require('axios');
const url = 'url_api';

module.exports = {
    async find(req, res) {
        const response = await axios.get(url);
        return res.status(200).send(response.data);
    },
    async create(req, res) {
        const data = req.body;
        const response = await axios.post(url, data);
        return res.status(201).send(response.data);
    },
    async update(req, res) {
        const data = req.body;
        const response = await axios.put(url + data.id, data);
        return res.status(200).send(response.data);
    }
};