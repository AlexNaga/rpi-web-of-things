// Create array for initial values
let initValues = Array(10).fill(0);

// The data of the chart, describe the differents sets of data you want with points, colors...
let data = {
  labels: initValues,
  datasets: [
    {
      label: "Pressure (Pa)",
      data: initValues,

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

  socket.on('bmp180_pressure', (data) => {
    let sensorModel = data.sensor_type;
    let sensorType = data.type;
    let sensorValue = data.value;
    console.log(data);

    updateChart(sensorValue);
  });

  let pressureCanvas = document.getElementById("chart_temperature").getContext("2d");
  let humidityCanvas = document.getElementById("chart_humidity").getContext("2d");
  let pressureCanvas = document.getElementById("chart_pressure").getContext("2d");
  let lightCanvas = document.getElementById("chart_light").getContext("2d");

  let pressureChart = new Chart(pressureCanvas, {
    type: 'line',
    data: data,
    options: {
      title: {
        display: true,
        text: 'Pressure via BMP180'
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Pascal'
          }
        }]
      }
    }
  });

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

    addData(pressureChart, sensorValue);
    removeData(pressureChart);
  }
}