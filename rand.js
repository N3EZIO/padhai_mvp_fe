// import axios from "axios";
const axios = require("axios");

axios
  .get("http://localhost:8000/question/3")
  .then((response) => console.log(response));
