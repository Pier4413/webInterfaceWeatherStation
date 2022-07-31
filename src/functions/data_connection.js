import axios from 'axios'

function createConnection() {
  var conn = axios.create({
    headers: {
      "api_key": import.meta.env.VITE_API_KEY
    }
  });

  return conn;
}

function getRequest(path, queryParams) {
  var fullUri = import.meta.env.VITE_SERVER_URL + "/" + path

  if (queryParams) {
    fullUri = fullUri + "?"
  }

  var conn = createConnection();
  return new Promise((resolve, reject) => {
    conn
      .get(fullUri)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      })
  })

}

export { getRequest }