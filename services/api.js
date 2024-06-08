import axios from 'axios'; // Import axios
// what is axios? 
// Axios is a promise-based HTTP client for the browser and Node.js. 
// It is a popular library because it provides a simple interface for making HTTP requests. 
// Axios is promise-based, which gives you the ability to take advantage of JavaScript's async and await for more readable asynchronous code.
// Axios is a library that helps us make HTTP requests to external resources.
// This code below creates an axios instance with a base URL pointing to the backend server.
// headers are set to 'Content-Type': 'application/json' which is the default content type
// This instance is then exported to be used in other files.

const api = axios.create({ // Create an axios instance
  baseURL: 'http://192.168.1.15:5000/api', // Use your backend URL
  headers: { // Set the headers
    'Content-Type': 'application/json', // Set the default content type
  },
});

export default api; // Export the api instance
