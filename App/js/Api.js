/**
 * Handles the interfacing with the API endpoints.
 */
class Api {
  baseUrl = null;
  cities = [];
  boroughs = [];
  regions = [];
  avgConsume = 0;
  maxConsume = 0;
  minConsume = 0;
  avgPrice = 0;
  maxPrice = 0;
  minPrice = 0;

  /**
   * Creates an Api object with the base url referencing the
   * domain the api shares.
   * 
   * @param {string} baseUrl  the url of the api
   */
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  /**
   * Login authentication
   * 
   * @param {string} username used for Username login credential
   * @param {string} password used for Password login credential
   */
   authLogin(username, password){
    let url = this.baseUrl + `api/auth/login?`
    let params = `username=${username}&password=${password}`
    let promise = new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest()
      xhr.open('POST', url+params)
      xhr.send()

      xhr.onload = function () {
        if (xhr.status != 200) {
          console.error(`Error ${xhr.status}: ${xhr.statusText}`)
        } else {
          let response = JSON.parse(xhr.response)
          resolve(response)
        }
      }

      xhr.onerror = function () {
        reject('POST login request failed')
      }
    })

    return promise;
  }

  /**
   * Logout authentication
   */
   authLogout(){
    let url = this.baseUrl + `api/auth/logout`
    let promise = new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest()
      xhr.open('POST', url)
      xhr.send()

      xhr.onload = function () {
        if (xhr.status != 200) {
          console.error(`Error ${xhr.status}: ${xhr.statusText}`)
        } else {
          let response = JSON.parse(xhr.response)
          resolve(response)
        }
      }

      xhr.onerror = function () {
        reject('POST logout request failed')
      }
    })

    return promise;
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
    let apiReference = this;

    let promise = new Promise(function (resolve, reject) {
      apiReference.getApiData(url).then(
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
   * Assumes the data in the database does not continuously
   * update.
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
   * Assumes the data in the database does not continuously
   * update.
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
   * Assumes the data in the database does not continuously
   * update.
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
   * Internal method for updating cities, boroughs, and
   * regions fields.
   */
  async updateFieldsHelper() {
    // we can utilize concurrency here!
    await Promise.all([
      this.getCities(),
      this.getBoroughs(),
      this.getRegions()
    ]);
  }


  /**
   * Internal method to get a region's data in a given time-frame.
   * Specify data to be "stats" to get the region's stats.
   * 
   * Cities: "new york"
   * Boroughs: "bronx", "brooklyn", "fha", "manhattan", "queens", "staten island"
   *
   * @param {string} startDate  the first date "YYYY-MM-DD"
   * @param {string} endDate  the last date "YYYY-MM-DD"
   * @param {string} region the region, which may be a city or borough
   * @param {string} data "stats" to get stats [optional]
   * @returns the region's stats or water data
   */
  async getRegionData(startDate, endDate, region, data = null) {
    await this.updateFieldsHelper();

    let promise = null;
    let url = this.baseUrl + 'api/';
    let indexes = [0];

    let appendUrl = '';
    let regionUrl = '';
    if (this.cities.indexOf(region) >= 0) {
      // a city is being requested
      regionUrl = 'citywater';
      appendUrl = `intervalStart=${startDate}&intervalEnd=${endDate}`;
      indexes = [3, 5];
    } else if (this.boroughs.indexOf(region) >= 0) {
      // a borough is being requested
      regionUrl = 'boroughwater';
      appendUrl = `name=${region}&intervalStart=${startDate}&intervalEnd=${endDate}`;
      indexes = [4, 6];
    }

    let specifier = '';
    switch(data) {
      case 'stats':
        specifier = '/stats';
        indexes = [0,1,2,3,4,5];
        break;
    }
    url += `${regionUrl}${specifier}?${appendUrl}`;

    if (this.regions.indexOf(region) >= 0) {
      // if a valid region
      let apiReference = this;
      promise = new Promise(function (resolve, reject) {
        apiReference.getApiData(url, indexes).then(
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

  /**
   * Get the Borough water or City water of a given time-frame.
   *
   * Cities: "new york"
   * Boroughs: "bronx", "brooklyn", "fha", "manhattan", "queens", "staten island"
   *
   * @param {string} startDate  the first date "YYYY-MM-DD"
   * @param {string} endDate  the last date "YYYY-MM-DD"
   * @param {string} region the region, which may be a city or borough
   */
  async getWaterData(startDate, endDate, region) {
    let stats = await this.getRegionData(startDate, endDate, region, 'stats');
    stats = stats[0];
    this.avgConsume = stats[0];
    this.maxConsume = stats[1];
    this.minConsume = stats[2];
    this.avgPrice = stats[3];
    this.maxPrice = stats[4];
    this.minPrice = stats[5];
    return await this.getRegionData(startDate, endDate, region); 
  }

  /**
   * Get the average water consumption of a city or borough in
   * a given time-frame.
   */
  getAvgConsumption() { return this.avgConsume; }

  /**
   * Get the minimum water consumption of a city or borough in
   * a given time-frame.
   */
  getMinConsumption() { return this.minConsume }

  /**
   * Get the maximum water consumption of a city or borough in
   * a given time-frame.
   */
  getMaxConsumption() { return this.maxConsume }

  /**
   * Get the average price a city or borough paid for 
   * their water consumption in a given time-frame.
   */
  getAvgPrice() { return this.avgPrice }

  /**
   * Get the minimum price a city or borough paid for 
   * their water consumption in a given time-frame.
   */
  getMinPrice() { return this.minPrice }

  /**
   * Get the maximum price a city or borough paid for 
   * their water consumption in a given time-frame.
   */
  getMaxPrice() { return this.maxPrice }
}
