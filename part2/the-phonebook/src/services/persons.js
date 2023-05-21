import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

function getAllPersons() {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
}

function createNewPerson(newPerson) {
  const request = axios.post(baseUrl, newPerson);
  return request.then((response) => response.data);
}

function updatePerson(id, updatedPerson) {
  const request = axios.put(`${baseUrl}/${id}`, updatedPerson);
  return request.then((response) => response.data);
}

export { getAllPersons, createNewPerson, updatePerson };