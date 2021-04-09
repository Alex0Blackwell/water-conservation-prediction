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

  /**
   * Set the location dropdown menu to include regions supported
   * in the database.
   */
  async setLocationDropdown() {  }

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
   * Creates a graph of water consumption over time with the location
   * dropdown menu, and the time span slider.
   */
  async setGraph() {
    // TODO: get location and time span data from client side

    this.setupMultiColorLine();
    let regionData = await this.api.getWaterData(this.startDate, this.endDate, this.region);

    let times = []
    let waterData = []
    regionData.forEach((element) => {
      times.push(element[0])
      waterData.push(element[1])
    })

    // now graph!
    const ctx = document.getElementById('graph').getContext('2d')

    const graph = new Chart(ctx, {
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
}
