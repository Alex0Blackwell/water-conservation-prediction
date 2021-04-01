const URL = "http://127.0.0.1:5000/"


/**
 * Gets API data, provided a URL. Returns as a 2D-array
 * where each row is the requested data from each entity.
 * Requested data is specified in the indexes list.
 * 
 * @param {string} url  the URL to request data from
 * @param {int} indexes a list of requested indexes [optional]
 * @returns a 2D-array of data from the requested endpoint
 */
let getApiData = function(url, indexes = [0]) {
  return new Promise(function(myResolve, myReject) {

    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();

    xhr.onload = function() {
      if (xhr.status != 200) {
        console.error(`Error ${xhr.status}: ${xhr.statusText}`);
      } else {
        let data = [];

        let response = JSON.parse(xhr.response);
        for(let i = 0; i < response.length; ++i) {
          data.push([]);
          // innerList = []
          for(let ii = 0; ii < indexes.length; ++ii) {
            // innerList.push(response[i][indexes[ii]]);
            data[i].push(response[i][indexes[ii]]);
          }
        }

        myResolve(data);
      }
    };

    xhr.onerror = function() {
      myReject("GET request failed");
    };
  });
}


/**
 * Returns a list of a given region on success,
 * otherwise return an error.
 * 
 * @param {string} region "city" or "borough"
 * @returns a list of cities 
 */
async function getRegion(region) {
  let url = URL + `api/${region}/all`;

  let promise = new Promise(function(resolve, reject) {
    getApiData(url).then(
      function(data) {
        let res = [];

        for(let i = 0; i < data.length; ++i)
          res.push(data[i][0].toLowerCase());
        
        resolve(res);
      },
      function(error) {
        reject("Failed to get region data.\n" + error);
      }
    );
  });

  return promise;
}


/**
 * Get the user water, Borough water, and City water of a given time-frame.
 * By default, the user water is returned. Specify a Borough to get or 
 * City to get otherwise.
 * 
 * Cities: "new york"
 * 
 * Boroughs: "bronx", "brooklyn", "fha", "manhattan", "queens", "staten island"
 * 
 * @param {string} startDate  the first date "YYYY-MM-DD"
 * @param {string} endDate  the last date "YYYY-MM-DD"
 * @param {string} region the region
 */
async function getWaterData(startDate, endDate, region) {
  // scalable, but slow... also prevents SQL injection - should do this in API
  let promise = null;
  let cities = await getRegion("city");
  let boroughs = await getRegion("borough");

  let url = URL + 'api/';
  let indexes = [0];

  if(cities.indexOf(region) >= 0) {
    // a city is being requested
    url += `citywater?intervalStart=${startDate}&intervalEnd=${endDate}` 
    indexes = [3, 5];
  }
  else if(boroughs.indexOf(region) >= 0) {
    // a borough is being requested
    url += `boroughwater?name=${region}&intervalStart=${startDate}&intervalEnd=${endDate}` 
    indexes = [4, 6];
  }

  if(cities.indexOf(region) + boroughs.indexOf(region) >= 0) {
    // if a valid region
    promise = new Promise(function(resolve, reject) {
      getApiData(url, indexes).then(
        function(data) {
          resolve(data);
        },
        function(error) {
          reject("Failed to get region data.\n" + error);
        }
      );
    });
  }

  return promise;
}


/**
 * Creates a graph of water consumption over time with the location
 * dropdown menu, and the time span slider.
 */
async function createGraph() {
  // get data first and create graph all at once
  let waterData = await getWaterData("2015-01-01", "2019-01-01", "queens");  // example
  console.log(waterData);

  const ctx = document.getElementById('graph').getContext('2d')

  const PLOTS = Object.freeze({
    KNOWN_WATER_CONSUMPTION: {
      label: 'Known Water Consumption',
      colour: '#118DFF',
    },
    PREDICTED_WATER_CONSUMPTION: {
      label: 'Predicted Water Consumption',
      colour: '#FF1167',
    },
  })

  let graph = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [
        'January/21',
        'February/21',
        'March/21',
        'April/21',
        'May/21',
        'June/21',
        'July/21',
      ],
      datasets: [
        {
          label: PLOTS.KNOWN_WATER_CONSUMPTION.label,
          backgroundColor: 'transparent',
          borderColor: PLOTS.KNOWN_WATER_CONSUMPTION.colour,
          data: [0, 10, 5, 2, 20, 30, 45],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  })
}

createGraph();
