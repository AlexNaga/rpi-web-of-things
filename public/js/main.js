const socket = io('ws://localhost:3000');

socket.on('BMP180', (data) => {
  let sensorModel = data.sensor_type;
  let sensorType = data.type;

  console.log(sensorModel);
  console.log(sensorType);  
});

socket.on('DHT22', (data) => {
  console.log(data);
});

socket.on('TSL2561', (data) => {
  console.log(data);
});

var ctx = document.getElementById("chart").getContext('2d');

var chartCanvas = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
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
