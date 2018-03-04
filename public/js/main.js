// Create array for initial values
let temperatureInit = Array(10).fill(0);
let humidityInit = Array(10).fill(0);
let pressureInit = Array(10).fill(0);
let lightInit = Array(10).fill(0);

// The data of the chart, config styling here
let temperatureData = {
  labels: temperatureInit,
  datasets: [
    {
      label: 'Temperature (°C)',
      data: temperatureInit,

      // Styling for the temperature chart
      backgroundColor: '#F02311',
      borderColor: '#F02311',
      fill: false,
      pointRadius: 5
    }
  ]
};

let humidityData = {
  labels: humidityInit,
  datasets: [
    {
      label: 'Humidity (%)',
      data: humidityInit,

      // Styling for the humidity chart
      backgroundColor: '#036B79',
      borderColor: '#036B79',
      fill: false,
      pointRadius: 5
    }
  ]
};

let pressureData = {
  labels: pressureInit,
  datasets: [
    {
      label: 'Pressure (Pa)',
      data: pressureInit,

      // Styling for the pressure chart
      backgroundColor: '#24A140',
      borderColor: '#24A140',
      fill: false,
      pointRadius: 5
    }
  ]
};

let lightData = {
  labels: lightInit,
  datasets: [
    {
      label: 'Brightness (Lux)',
      data: lightInit,

      // Styling for the brightness chart
      backgroundColor: '#FFCC00',
      borderColor: '#FFCC00',
      fill: false,
      pointRadius: 5
    }
  ]
};


window.onload = () => {
  const socket = io('ws://192.168.10.223:3000');

  socket.on('dht22_temperature', (data) => {
    let sensorModel = data.sensor_type;
    let sensorType = data.type;
    let sensorValue = data.value.toFixed(1);
    updateChart(temperatureChart, sensorValue);
  });

  socket.on('dht22_humidity', (data) => {
    let sensorValue = data.value.toFixed(1);
    updateChart(humidityChart, sensorValue);
  });

  socket.on('bmp180_pressure', (data) => {
    let sensorValue = data.value;
    updateChart(pressureChart, sensorValue);
  });

  socket.on('tsl2561_light', (data) => {
    let sensorValue = data.value;
    updateChart(lightChart, sensorValue);
  });


  Chart.defaults.global.defaultFontFamily = 'Ubuntu';
  Chart.defaults.global.responsive = true;

  let temperatureCanvas = document.getElementById('chart_temperature').getContext('2d');
  let temperatureChart = new Chart(temperatureCanvas, {
    type: 'line',
    data: temperatureData,
    options: {
      title: {
        display: true,
        text: 'Temperature via DHT22'
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
            labelString: 'Degree Celsius'
          }
        }]
      }
    }
  });

  let humidityCanvas = document.getElementById('chart_humidity').getContext('2d');
  let humidityChart = new Chart(humidityCanvas, {
    type: 'line',
    data: humidityData,
    options: {
      title: {
        display: true,
        text: 'Humidity via DHT22'
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
            labelString: 'Percent'
          }
        }]
      }
    }
  });

  let pressureCanvas = document.getElementById('chart_pressure').getContext('2d');
  let pressureChart = new Chart(pressureCanvas, {
    type: 'line',
    data: pressureData,
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

  let lightCanvas = document.getElementById('chart_light').getContext('2d');
  let lightChart = new Chart(lightCanvas, {
    type: 'line',
    data: lightData,
    options: {
      title: {
        display: true,
        text: 'Brightness via TSL2561'
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
            labelString: 'Lux'
          }
        }]
      }
    }
  });

  function updateChart(chart, sensorValue) {

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

    addData(chart, sensorValue);
    removeData(chart);
  }
}