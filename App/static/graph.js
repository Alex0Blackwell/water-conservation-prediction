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
