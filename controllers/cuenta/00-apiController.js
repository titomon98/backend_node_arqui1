const axios = require('axios');
const urlAPIs = 'https://pokeapi.co/api/v2/pokemon/charizard';
// const urlAPIs = 'https://pokeapi.co/api/v2/ability/battle-armor';

module.exports = {
    async find(req, res) {
        const response = await axios.get(urlAPIs);
        return res.send(response.data);
    },
    async create(req, res) {
        const data = req.body;
        const response = await axios.post(urlAPIs, data);
        return res.send(response.data);
    },
    async update(req, res) {
        const data = req.body;
        const response = await axios.put(urlAPIs + data.id, data);
        return res.send(response.data);
    }
};