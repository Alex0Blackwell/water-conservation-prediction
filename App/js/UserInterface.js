class Api {
  baseUrl = null;
  cities = [];
  boroughs = [];
  regions = [];


  /**
   * Creates an Api object with the base url referencing the
   * domain the api shares.
   * 
   * @param {string} baseUrl  the url of the api
   */
  constructor(baseUrl) {
    this.baseUrl = baseUrl;

    // populate fields first to avoid repeating queries
    this.cities = this.getCities();
    this.boroughs = this.getBoroughs();
    this.regions = this.getRegions();
  }

  /**
   * Gets API data, provided a URL. Returns as a 2D-array
   * where each row is the requested data from each entity.
   * Requested data is specified in the indexes list.
   *
   * @param {string} url  the URL to request data from
   * @param {int} indexes a list of requested indexes [optional]
   * @returns a 2D-array of data from the requested endpoint
   */
  getApiData(url, indexes = [0]) {
    return new Promise(function (myResolve, myReject) {
      let xhr = new XMLHttpRequest()
      xhr.open('GET', url)
      xhr.send()

      xhr.onload = function () {
        if (xhr.status != 200) {
          console.error(`Error ${xhr.status}: ${xhr.statusText}`)
        } else {
          let data = []

          let response = JSON.parse(xhr.response)
          for (let i = 0; i < response.length; ++i) {
            data.push([])
            for (let ii = 0; ii < indexes.length; ++ii)
              data[i].push(response[i][indexes[ii]])
          }

          myResolve(data)
        }
      }

      xhr.onerror = function () {
        myReject('GET request failed')
      }
    })
  }

  /**
   * Internal method that returns a list of a given 
   * region on success, otherwise return an error.
   *
   * @param {string} region "city" or "borough"
   * @returns a list of cities
   */
  async getRegionHelper(region) {
    let url = this.baseUrl + `api/${region}/all`

    let promise = new Promise(function (resolve, reject) {
      getApiData(url).then(
        function (data) {
          let res = []

          for (let i = 0; i < data.length; ++i)
            res.push(data[i][0].toLowerCase())

          resolve(res)
        },
        function (error) {
          reject('Failed to get region data.\n' + error)
        }
      )
    })

    return promise
  }

  /**
   * Get all cities on success, otherwise return an error.
   * 
   * @returns an array of cities as strings
   */
  async getCities() {
    let _cities = [];
    if(!this.cities.length) {
      _cities.push(... await this.getRegionHelper('city'));
      this.cities = _cities;
    }

    return this.cities;
  }

  /**
   * Get all boroughs on success, otherwise return an error.
   * 
   * @returns an array of boroughs as strings
   */
  async getBoroughs() {
    let _boroughs = [];
    if(!this.boroughs.length) {
      _boroughs.push(... await this.getRegionHelper('borough'));
      this.boroughs = _boroughs;
    }

    return this.boroughs;
  }

  /**
   * Get all regions on success, otherwise return an error.
   * 
   * @returns an array of regions as strings
   */
  async getRegions() {
    if(!this.regions.length) {
      let _regions = [];
      _regions.push(... await this.getCities());
      _regions.push(... await this.getBoroughs());

      this.regions = _regions;
    }
    return this.regions;
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
  async getWaterData(startDate, endDate, region) {
    // scalable, but slow... also prevents SQL injection - should do this in API
    let promise = null

    let url = this.baseUrl + 'api/';
    let indexes = [0]

    if (this.cities.indexOf(region) >= 0) {
      // a city is being requested
      url += `citywater?intervalStart=${startDate}&intervalEnd=${endDate}`
      indexes = [3, 5]
    } else if (this.boroughs.indexOf(region) >= 0) {
      // a borough is being requested
      url += `boroughwater?name=${region}&intervalStart=${startDate}&intervalEnd=${endDate}`
      indexes = [4, 6]
    }

    if (this.cities.indexOf(region) + this.boroughs.indexOf(region) >= 0) {
      // if a valid region
      promise = new Promise(function (resolve, reject) {
        getApiData(url, indexes).then(
          function (data) {
            resolve(data)
          },
          function (error) {
            reject('Failed to get region data.\n' + error)
          }
        )
      })
    }

    return promise
  }

}

async function onStart() {
  let api = new Api('http://127.0.0.1:5000/');
  let cities = await api.getCities();
  let boroughs = await api.getBoroughs();
  let regions = await api.getRegions();
  console.log('cities', cities);
  console.log('boroughs', boroughs);
  console.log('regions', regions);
  let waterData = await api.getWaterData('2015-01-01', '2019-01-01', 'queens');  // example
  console.log('waterdata', waterData);
}

onStart();
