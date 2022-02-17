const axios = require("axios");

const getUser = async () => {
  const getResponse = await axios
    .get("https://jsonplaceholder.typicode.com/users/1")
    .then((response) => response)
    .catch((err) => console.log(err));
  return getResponse;
};

const postUser = async () => {
  const postResponse = await axios
    .post("https://jsonplaceholder.typicode.com/users", {
      id: 11,
      name: "Tom Brady",
      username: "Brad",
      email: "tombrad@asd.com",
    })
    .then((response) => response)
    .catch((err) => console.log(err));
  return postResponse;
};

const concurrentRequests = async () => {
  const conResponse = await axios
    .all([
      axios.get("https://jsonplaceholder.typicode.com/users?_limit=5"),
      axios.get("https://jsonplaceholder.typicode.com/albums?_limit=5")
    ])
    .then(
      axios.spread((users, albums) => {
        return users
      })
    )
    .catch((err) => console.log(err));
  return conResponse
};


module.exports = { getUser, postUser, concurrentRequests };
