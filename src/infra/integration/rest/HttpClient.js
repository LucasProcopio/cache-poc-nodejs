const axios = require('axios');

module.exports = () => ({ baseURL='', timeout=3000 }) => axios.create({ baseURL, timeout });
