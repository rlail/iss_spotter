const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((error, ip) => { // API Call 1
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  // const ipAddress = '96.49.198.250'; // Replace with the desired IP address (API Call 2)

  fetchCoordsByIP(ip, (error, data) => { //API Call 2
    if (error) {
      console.log("Error:", error);
      return;
    }

    const { latitude, longitude } = data;
    const coords = { latitude, longitude };

    fetchISSFlyOverTimes(coords, (error, flyOverTimes) => { //API Call 3
      if (error) {
        console.log("Error:", error);
        return;
      }

      console.log("Fly Over Times:", flyOverTimes);
    });
  });
});