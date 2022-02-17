const getUsers = () => {
    interceptRequests()
  axios
    .get("https://jsonplaceholder.typicode.com/users/1")
    .then((response) => {
      displayOutput(response)
      return response
    })
    .catch((err) => console.log(err));
};

const postUser = () => {
    interceptRequests()
  axios
    .post("https://jsonplaceholder.typicode.com/users", {
      id: 11,
      name: "Tom Brady",
      username: "Brad",
      email: "tombrad@asd.com",
    })
    .then((response) => displayOutput(response))
    .catch((err) => console.log(err));
};

const concurrentRequests = () => {
    interceptRequests()
  axios
    .all([
      axios.get("https://jsonplaceholder.typicode.com/users?_limit=5"),
      axios.get("https://jsonplaceholder.typicode.com/albums?_limit=5"),
    ])
    .then(
      axios.spread((users, albums) => {
        displayOutput(albums);
      })
    )
    .catch((err) => console.log(err));
};


// Interceptors
const interceptRequests = () => {
  axios.interceptors.request.use(
      (config) => {
          const today = new Date()
      console.log(
        `${config.method.toUpperCase()} request sent to ${
          config.url
        } at ${today.getHours()} : ${today.getMinutes()}`
          );
          return config
    },
    (error) => {
        console.log(error);
    }
  );
};

// Display the output in the browser
const displayOutput = (responseDisplay) => {
  document.getElementById("responseDisplay").innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${responseDisplay.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(responseDisplay.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(responseDisplay.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(responseDisplay.config, null, 2)}</pre>
    </div>
  </div>;`
};

// Event listeners
document.getElementById("get").addEventListener("click", getUsers);
document.getElementById("post").addEventListener("click", postUser);
document.getElementById("concurrent").addEventListener("click", concurrentRequests);
