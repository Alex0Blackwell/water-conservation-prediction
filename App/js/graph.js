const URL = "http://127.0.0.1:5000/"


/**
 * Gets API data, provided a URL. Returns as a 2D-array
 * where each row is the requested data from each entity.
 * Requested data is specified in the indexes list.
 * 
 * @param {string} url  the URL to request data from
 * @param {array} indexes a list of requested indexes [optional]
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
        for(let i = 0; i < response.length; ++i){
          innerList = []
          for(let ii = 0; ii < indexes.length; ++ii) {
            innerList.push(response[i][indexes[ii]]);
          }
          data.push(innerList);
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
 * Returns a list of cities on success, otherwise return an
 * error.
 * 
 * @returns a list of cities 
 */
async function getCities() {
  let url = URL + "api/city/all";

  let myPromise = new Promise(function(myResolve, myReject) {
    getApiData(url).then(
      function(cities) {
        console.log(cities);
        myResolve(cities);
      },
      function(error) {
        myReject("Failed to get cities\n" + error);
      }
    );
  })

  return myPromise;
}


function getBoroughs() {  }



/**
 * Get the user water, Borough water, and City water of a given time-frame.
 * By default, the user water is returned. Specify a Borough to get or 
 * City to get otherwise.
 * 
 * Cities: "new york"
 * 
 * Boroughs: "bronx", "brooklyn", "fha", "manhattan", "queens", "staten island"
 * 
 * @param {string} startDate  the first date to consider
 * @param {string} endDate  the last date to consider
 * @param {string} region the region [optional]
 */
async function getWaterData(startDate, endDate, region=None) {
  // const URL = "http://127.0.0.1:5000/"  // default local Flask URL

  let cities = await getCities();
  let boroughs;

}

getWaterData(0, 0, 0);

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
