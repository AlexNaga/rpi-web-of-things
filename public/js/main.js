window.onload = function () {
  const socket = io('ws://192.168.10.223:3000');

  socket.on('bmp180_temp', (data) => {
    let sensorModel = data.sensor_type;
    let sensorType = data.type;
    let sensorValue = data.value;

    updateChart(sensorValue);
    console.log(data);
  });

  socket.on('bmp180_pressure', (data) => {
    // console.log(data);
  });

  socket.on('DHT22', (data) => {
    // console.log(data);
  });

  socket.on('TSL2561', (data) => {
    // console.log(data);
  });

  let dps = [];
  let chart = new CanvasJS.Chart("chart_bmp180_temp", {
    exportEnabled: true,
    title: {
      text: "Temperature via BMP180"
    },
    axisY: {
      includeZero: true
    },
    data: [{
      type: "spline",
      markerSize: 5,
      dataPoints: dps
    }]
  });

  let xVal = 0;
  let yVal = 0;
  let updateInterval = 1000;
  let dataLength = 15; // number of dataPoints visible at any point

  let updateChart = (sensorValue) => {
    yVal = sensorValue;
    dps.push({
      x: xVal,
      y: yVal
    });

    if (dps.length > dataLength) {
      dps.shift();
    }

    chart.render();
  };

  updateChart(dataLength);
  setInterval(() => {
    updateChart();
    xVal++
  }, updateInterval);


  var ctx = document.getElementById("myChart").getContext('2d');

  var myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
      label: "Temperature via BMP180"
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
