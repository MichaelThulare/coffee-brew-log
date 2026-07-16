import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

export async function fetchBrews(method = '') {
  const response = await api.get('/brews', {
    params: method ? { brewMethod: method } : {},
  });
  return response.data;
}

export async function createBrew(payload) {
  const response = await api.post('/brews', payload);
  return response.data;
}

export async function updateBrew(id, payload) {
  const response = await api.put(`/brews/${id}`, payload);
  return response.data;
}

export async function deleteBrew(id) {
  await api.delete(`/brews/${id}`);
}
