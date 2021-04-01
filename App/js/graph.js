
function getWaterData(region, startDate, endDate) {
  // 1. Create a new XMLHttpRequest object
  let xhr = new XMLHttpRequest();

  // 2. Configure it: GET-request for the URL /article/.../load
  xhr.open('GET', 'http://127.0.0.1:5000/api/');

  // 3. Send the request over the network
  xhr.send();

  // 4. This will be called after the response is received
  xhr.onload = function() {
    if (xhr.status != 200) { // analyze HTTP status of the response
      console.log(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
    } else { // show the result
      console.log(`Done, got ${xhr.response.length} bytes`); // response is the server response
    }
  };

  xhr.onprogress = function(event) {
    if (event.lengthComputable) {
      console.log(`Received ${event.loaded} of ${event.total} bytes`);
    } else {
      console.log(`Received ${event.loaded} bytes`); // no Content-Length
    }

  };

  xhr.onerror = function() {
    console.log("Request failed");
  };
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
