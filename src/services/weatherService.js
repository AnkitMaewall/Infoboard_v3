

function weatherService() {
  function getWeatherbyId() {
    return new Promise((resolve, reject) => {
      resolve({ forecast: 'our forecast' });
    });
  }
  return { getWeatherbyId };
}

module.exports = weatherService();
