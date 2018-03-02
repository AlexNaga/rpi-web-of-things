window.onload = function () {
  const socket = io('ws://192.168.10.223:3000');

  socket.on('bmp180_temp', (data) => {
    let sensorModel = data.sensor_type;
    let sensorType = data.type;
    let sensorValue = data.value;
    updateChart(sensorValue);
    console.log(data);
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
    var count = count || 1;
    // count is number of times loop runs to generate random dataPoints.
    for (let j = 0; j < count; j++) {
      yVal = sensorValue;
      dps.push({
        x: xVal,
        y: yVal
      });
      xVal++;
    }
    if (dps.length > dataLength) {
      dps.shift();
    }
    chart.render();
  };

  updateChart(dataLength);
  setInterval(() => { updateChart() }, updateInterval);

}
