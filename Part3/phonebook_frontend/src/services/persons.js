import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () =>
  axios
    .get(baseUrl)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data.error;
    });

const addPerson = (person) =>
  axios
    .post(baseUrl, person)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data.error;
    });

const deletePerson = (id) =>
  axios
    .delete(`${baseUrl}/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data.error;
    });

const updatePerson = (person, number) =>
  axios
    .put(`${baseUrl}/${person.id}`, { ...person, number })
    .then((response) => response.data);

export default {
  getAll,
  addPerson,
  deletePerson,
  updatePerson,
};
