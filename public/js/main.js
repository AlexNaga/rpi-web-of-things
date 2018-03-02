// Create array for initial values
let initValues = Array(10).fill(0);

// The data of the chart, describe the differents sets of data you want with points, colors...
let data = {
  labels: initValues,
  datasets: [
    {
      label: "Temperature",
      data: initValues, // data to represent
      // Styling for the chart
      backgroundColor: "#F02311",
      borderColor: "#F02311",
      fill: false,
      pointRadius: 5
    }
  ]
};

window.onload = () => {
  const socket = io('ws://192.168.10.223:3000');

  socket.on('bmp180_temp', (data) => {
    let sensorModel = data.sensor_type;
    let sensorType = data.type;
    let sensorValue = data.value;

    updateChart(sensorValue);
  });

  socket.on('bmp180_pressure', (data) => {
    // console.log(data);
  });

  socket.on('DHT22', (data) => {
    // console.log(data);
  });

  socket.on('tsl2561_light', (data) => {
    let sensorModel = data.sensor_type;
    let sensorType = data.type;
    let sensorValue = data.value;
    
    updateChart(sensorValue);
    console.log(data);
  });


  let ctx = document.getElementById("chart_bmp180_temp").getContext("2d");

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

  function updateChart(sensorValue) {

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

    addData(chartBMP180, sensorValue);
    removeData(chartBMP180);
  }
}