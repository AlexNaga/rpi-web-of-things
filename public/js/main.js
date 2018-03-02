// Create array for initial values
let initValues = Array(10).fill(0);

// The data of the chart, describe the differents sets of data you want with points, colors...
let data = {
  labels: initValues,
  datasets: [
    {
      label: "Temperature",
      data: initValues, // data to represent
      backgroundColor: "#F02311",
      borderColor: "#F02311",
      fill: false,

      // Styling for the chart

    }
  ]
};

window.onload = () => {
  let ctx = document.getElementById("chart_bmp180_temp").getContext("2d");

  // Create the Chart object
  let chartBMP180 = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
      title: {
        display: true,
        text: 'Temperature via BMP180'
      }
    }
  });

  // Used for the labels on the X axis
  let value = 1;

  // Function to execute to remove then add a new random value to the chart
  function updateChart() {

    // Remove value from far left of the chart
    function removeData(chart) {
      // chart.data.labels.shift();
      chart.data.datasets.forEach((dataset) => {
        dataset.data.shift();
      });
      chart.update();
    }

    // Add a new value at the far right of the chart
    function addData(chart, data) {
      // chart.data.labels.push(label);
      chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
      });
      chart.update();
    }

    addData(chartBMP180, value);
    removeData(chartBMP180);

    value++;
  }

  // Run rand_value() every 2 seconds
  window.setInterval(updateChart, 3000);
}