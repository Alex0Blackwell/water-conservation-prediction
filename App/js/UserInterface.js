/**
 * Parameters for the graph.
 */
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


/**
 * Responsible for setting the possible locations based on the
 * data in the database, and for updating the graph.
 */
class UserInterface {
  startDate;
  endDate;
  region;
  api;

  /**
   * The state the user interface should respond to.
   * The state is defined by the time-fram and region.
   * 
   * Cities: "new york"
   * Boroughs: "bronx", "brooklyn", "fha", "manhattan", "queens", "staten island"
   * 
   * @param {string} startDate  the first date "YYYY-MM-DD"
   * @param {string} endDate  the last date "YYYY-MM-DD"
   * @param {string} region the region, which may be a city or borough
   */
  constructor(startDate, endDate, region) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.region = region;

    this.api = new Api('http://127.0.0.1:5000/');  // default for local Flask
  }

  setStartDate(newStartDate) {
    this.startDate = newStartDate;
  }

  setEndDate(newEndDate) {
    this.endDate = newEndDate;
  }

  setRegion(newRegion) {
    this.region = newRegion;
  }

  getNewDate(value) {
    const newDate = new Date('2013-01-01')
    newDate.setDate(newDate.getDate() + parseInt(value))
    return newDate
  }

  /**
   * Capitalize the first letter of a string.
   * 
   * @param {String} str  the string to be capitalized
   * @returns the first letter capitalized
   */
  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Set the location dropdown menu to include regions supported
   * in the database.
   */
  async setLocationDropdown() {
    let regions = await this.api.getRegions();

    let dropdown = document.getElementById('regionDropdown');
    let regionToAdd;

    for(let i = 0; i < regions.length; ++i) {
      regionToAdd = document.createElement('option');
      regionToAdd.text = regions[i].split(' ').map(this.capitalize).join(' ');
      dropdown.add(regionToAdd);
    }
  }

  /**
   * Setup custom "multiColourLine" type to show known and
   * predicted water consumption on the same graph.
   * 
   * @param {Number} predictStartIndex  the start index for the prediction
   */
  setupMultiColorLine(predictStartIndex = 30) {
    Chart.defaults.multiColourLine = Chart.defaults.line
    Chart.controllers.multiColourLine = Chart.controllers.line.extend({
      draw: function (ease) {
        const meta = this.getMeta()
        const points = meta.data || []
        const area = this.chart.chartArea
        const originalDataset = meta.dataset._children.filter(
          (data) => !isNaN(data._view.y)
        )

        // Plot the known water consumption
        meta.dataset._view.borderColor = PLOTS.KNOWN_WATER_CONSUMPTION.colour
        meta.dataset._children = originalDataset.slice(
          0,
          predictStartIndex + 1
        )
        meta.dataset.draw()

        // Plot the predicted water consumption
        meta.dataset._view.borderColor = PLOTS.PREDICTED_WATER_CONSUMPTION.colour
        meta.dataset._children = originalDataset.slice(
          predictStartIndex
        )
        meta.dataset.draw()

        meta.dataset._children = originalDataset
        points.forEach(function (point) {
          point.draw(area)
        })
      },
    })
  }

  /**
   * If we do not reset the graph hidden data points from previous
   * graphs are still selectable. 
   */
  resetGraph() {
    document.getElementById('graph').remove();
    let graphContainer = document.getElementById('graphContainer');
    let canvas = document.createElement('canvas');
    canvas.id = 'graph'
    canvas.className = 'graph';
    graphContainer.appendChild(canvas);
  }

  /**
   * Creates a graph of water consumption over time with the location
   * dropdown menu, and the time span slider.
   */
  async setGraph() {
    let regionData = await this.api.getWaterData(this.startDate, this.endDate, this.region);

    let times = []
    let waterData = []
    let predictionIndex = 0;
    let lastKnownDate = new Date('2020-04-01');
    regionData.forEach((element) => {
      if(Date.parse(element[0]) < lastKnownDate)
        ++predictionIndex;

      // Truncates date to only the month and year 
      times.push(element[0].slice(8,16))
      waterData.push(element[1])
    })

    // now graph!
    this.setupMultiColorLine(predictionIndex);
    this.resetGraph();
    const ctx = document.getElementById('graph').getContext('2d')

    new Chart(ctx, {
      type: 'multiColourLine',
      data: {
        labels: times,
        datasets: [
          {
            label: PLOTS.KNOWN_WATER_CONSUMPTION.label,
            backgroundColor: 'transparent',
            borderColor: PLOTS.KNOWN_WATER_CONSUMPTION.colour,
            data: waterData,
          },
          // Extra label for predicted water consumption (non-functional)
          {
            label: PLOTS.PREDICTED_WATER_CONSUMPTION.label,
            borderColor: PLOTS.PREDICTED_WATER_CONSUMPTION.colour,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    })
  }

  setDoubleSlider() {
    const inputLeft = document.getElementById("slider-left")
    const inputRight = document.getElementById("slider-right")

    const thumbLeft = document.querySelector(".slider > .thumb.slider-left")
    const thumbRight = document.querySelector(".slider > .thumb.slider-right")
    const range = document.querySelector(".slider > .range")

    const startDateDisplay = document.querySelector(".date-range-display.start-date")
    const endDateDisplay = document.querySelector(".date-range-display.end-date")

    const setLeftValue = () => {
      const min = parseInt(inputLeft.min)
      const max = parseInt(inputLeft.max)
      const newDate = this.getNewDate(inputLeft.value)

      inputLeft.value = Math.min(parseInt(inputLeft.value), parseInt(inputRight.value) - 1)

      const percent = ((inputLeft.value - min) / (max - min)) * 100

      thumbLeft.style.left = percent + "%"
      range.style.left = percent + "%"
      startDateDisplay.textContent = newDate.toDateString()
    }
    setLeftValue();

    const setRightValue = () => {
      const min = parseInt(inputRight.min)
      const max = parseInt(inputRight.max)
      const newDate = this.getNewDate(inputRight.value)

      inputRight.value = Math.max(parseInt(inputRight.value), parseInt(inputLeft.value) + 1)
      
      const percent = ((inputRight.value - min) / (max - min)) * 100
      
      thumbRight.style.right = (100 - percent) + "%"
      range.style.right = (100 - percent) + "%"
      endDateDisplay.textContent = newDate.toDateString()
    }
    setRightValue()

    inputLeft.addEventListener("input", setLeftValue)
    inputRight.addEventListener("input", setRightValue)
  }

  /**
   * Set the stats (consumption and pricing) to reflect the current
   * location and time.
   */
  setStats() {
    document.getElementById('avg-consume').innerHTML = `${this.api.getAvgConsumption().toLocaleString('en')} HCF`;
    document.getElementById('max-consume').innerHTML = `${this.api.getMaxConsumption().toLocaleString('en')} HCF`;
    document.getElementById('min-consume').innerHTML = `${this.api.getMinConsumption().toLocaleString('en')} HCF`;
    document.getElementById('avg-price').innerHTML = `$${this.api.getAvgPrice().toLocaleString('en')} USD`;
    document.getElementById('max-price').innerHTML = `$${this.api.getMaxPrice().toLocaleString('en')} USD`;
    document.getElementById('min-price').innerHTML = `$${this.api.getMinPrice().toLocaleString('en')} USD`;
  }
}
