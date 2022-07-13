//AXIOS GLOBALS
axios.defaults.headers.common["X-Auth-Token"] = "someToken";

// GET REQUEST
function getTodos() {
  axios({
    method: "GET",
    url: "https://jsonplaceholder.typicode.com/todos?_limit=5",
  })
    .then(function sucess(res) {
      console.log(res);
      showOutput(res);
    })
    .catch(function failure(rej) {
      console.log(rej);
    });
}

// POST REQUEST
function addTodo() {
  // console.log("POST Request");
  axios({
    method: "POST",
    url: "https://jsonplaceholder.typicode.com/todos",
    data: {
      title: "New Todo",
      completed: false,
    },
  })
    .then(function sucess(res) {
      showOutput(res);
    })
    .catch(function failure(error) {
      console.log(error);
    });
}

// PUT/PATCH REQUEST
function updateTodo() {
  // console.log("PUT/PATCH Request");
  axios
    .patch("https://jsonplaceholder.typicode.com/todos/1", {
      title: "Updated Todo",
      completed: true,
    })
    .then(function sucess(res) {
      showOutput(res);
    })
    .catch(function failure(error) {
      console.log(error);
    });
}

// DELETE REQUEST
function removeTodo() {
  // console.log("DELETE Request");
  axios
    .delete("https://jsonplaceholder.typicode.com/todos/1")
    .then(function sucess(res) {
      showOutput(res);
    })
    .catch(function failure(error) {
      console.log(error);
    });
}

// SIMULTANEOUS DATA
function getData() {
  // console.log("Simultaneous Request");
  axios
    .all([
      axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5"),
      axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5"),
    ])
    .then(
      //   function sucess(res) {
      //   console.log(res[0]);
      //   console.log(res[1]);
      // }
      axios.spread((todos, posts) => showOutput(posts))
    )
    .catch(function failure(error) {
      console.log(error);
    });
}

// CUSTOM HEADERS
function customHeaders() {
  // console.log("Custom Headers");
  let config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "some token",
    },
  };
  axios
    .post(
      "https://jsonplaceholder.typicode.com/todos",
      {
        title: "New Todo",
        completed: false,
      },
      config
    )
    .then(function sucess(res) {
      showOutput(res);
    })
    .catch(function failure(reject) {
      console.log(reject);
    });
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  // console.log("Transform Response");
  let options = {
    method: "POST",
    url: "https://jsonplaceholder.typicode.com/todos",
    data: {
      title: "Hello World",
    },

    transformResponse: axios.defaults.transformResponse.concat(function sucess(
      data
    ) {
      data.title = data.title.toUpperCase();
      return data;
    }),
  };

  axios(options).then(function sucess(res) {
    showOutput(res);
  });
}

// ERROR HANDLING
function errorHandling() {
  // console.log("Error Handling");
  axios({
    method: "GET",
    url: "https://jsonplaceholder.typicode.com/todoss",
  })
    .then(function sucess(res) {
      console.log(res);
      showOutput(res);
    })
    .catch(function failure(rej) {
      // console.log(rej);
      if (rej.response) {
        console.log(rej.response.data);
        console.log(rej.response.status);
        console.log(rej.response.headers);

        if (rej.response.status === 404) {
          alert("Error: Page Not Found");
        }
      }
    });
}

// CANCEL TOKEN
function cancelToken() {
  // console.log("Cancel Token");

  let source = axios.CancelToken.source();
  axios
    .get("https://jsonplaceholder.typicode.com/todos", {
      cancelToken: source.token,
    })
    .then(function sucess(res) {
      // console.log(res);
      showOutput(res);
    })
    .catch(function cancelMsg(thrown) {
      if (axios.isCancel(thrown)) {
        console.log("Request Cancel", thrown.message);
      }
    });

  if (true) {
    source.cancel("Reqest Cancel");
  }
}

// INTERCEPTING REQUESTS & RESPONSES

axios.interceptors.request.use(
  (config) => {
    console.log(
      `${config.method.toUpperCase()} request sent to ${
        config.url
      } at ${new Date().getTime()}`
    );

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
  document.getElementById("res").innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById("get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodo);
document.getElementById("update").addEventListener("click", updateTodo);
document.getElementById("delete").addEventListener("click", removeTodo);
document.getElementById("sim").addEventListener("click", getData);
document.getElementById("headers").addEventListener("click", customHeaders);
document
  .getElementById("transform")
  .addEventListener("click", transformResponse);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("cancel").addEventListener("click", cancelToken);
