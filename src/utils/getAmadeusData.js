// services/amadeus.js

// export const getAmadeusData = async (params) => {
//   const { keyword = "", page = 0, city = true, airport = true } = params;
//   const subTypeCheck =
//     city && airport ? "CITY,AIRPORT" : city ? "CITY" : airport ? "AIRPORT" : "";

//   const url = `http://localhost:5000/api/flight/iata-code?keyword=${keyword}&subType=${subTypeCheck}&page=${page}`;

//   try {
//     const response = await fetch(url);

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching IATA code", error);
//   }
// };

import axios from "axios";

const CancelToken = axios.CancelToken;

// This function allow you to make GET request to backend with params we need
export const getAmadeusData = (params) => {
  // Destructuring params
  const { keyword = "", page = 0, city = true, airport = true } = params;

  // Checking for proper subType
  const subTypeCheck =
    city && airport ? "CITY,AIRPORT" : city ? "CITY" : airport ? "AIRPORT" : "";

  // Amadeus API require at least 1 character, so with this we can be sure that we can make this request
  const searchQuery = keyword ? keyword : "a";

  // This is extra tool for cancelation request, to avoid overload API
  const source = CancelToken.source();

  // GET request with all params we need
  const url = `http://localhost:5000/api/flight/iata-code?keyword=${searchQuery}&page=${page}&subType=${subTypeCheck}`;

  const out = axios.get(url, {
    cancelToken: source.token,
  });

  return { out, source };
};
