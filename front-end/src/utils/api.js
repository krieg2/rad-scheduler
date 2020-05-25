const axios = require('axios');
const API_URL = 'https://qwn87tjy6l.execute-api.us-east-2.amazonaws.com';

export const getAllEvents = async () => {
  const url = `${API_URL}/events`;
  return await axios.get(url);
};

export const addEvent = async (values) => {
  const url = `${API_URL}/events`;
  return await axios.post(url, JSON.stringify(values));
};