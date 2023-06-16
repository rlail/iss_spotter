const { fetchMyIP, fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

fetchCoordsByIP(ip, (error, data) => { //API Call #2
    if (error) {
      console.log("Error:", error);
      return;
    }
    console.log("Data:", data);
  });
  
});