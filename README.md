# SensorView
## About

This repository was created for the course 1DV527: The web as an application platform.
Linnaeus University, Sweden.

You can find the assignment [here.](https://coursepress.lnu.se/kurs/the-web-as-an-application-platform/examination-3)

This Web of Thing is a real-time overview for a bunch of sensors connected to a Raspberry Pi 3 Model B.

- Temperature and humidity (AM2302).
- Air pressure (BMP180).
- Light sensor (TSL2561).

![SensorView](https://github.com/AlexNaga/rpi-web-of-things/raw/master/img/sensorview_overview.png)

## Usage

This application depends on the [BCM2835](http://www.airspayce.com/mikem/bcm2835/) library that must be installed on your board before you can actually use this application.  
You also need to have Node.js installed. [How to install Node.js on Raspberry Pi](https://github.com/cncjs/cncjs/wiki/Setup-Guide:-Raspberry-Pi-%7C-Install-Node.js-Manually)

1. Clone this repository or download the `.zip` file.
2. Extract folder to preferred location.
3. Open up the terminal in the extracted folder.
4. Install the required dependencies by typing `npm install`
5. Start the server by typing `npm start`
6. The server is now running at [http://localhost:3000](http://localhost:3000)

#### API
| Method | Route                   | Description                                    |
|--------|-------------------------|------------------------------------------------|
| GET    | /model                  | List metadata about this WoT.                  |
| GET    | /properties             | List all available properties.                 |
| GET    | /properties/temperature | Get current value from the temperature sensor. |
| GET    | /properties/humidity    | Get current value from the humidity sensor.    |
| GET    | /properties/pressure    | Get current value from the pressure sensor.    |
| GET    | /properties/brightness  | Get current value from the brightness sensor.  |

#### WebSockets  
| WebSocket channel | Description                                    |
|-------------------|------------------------------------------------|
| temperature       | Get current value from the temperature sensor. |
| humidity          | Get current value from the humidity sensor.    |
| pressure          | Get current value from the pressure sensor.    |
| brightness        | Get current value from the brightness sensor.  |

## License
MIT License

Copyright (c) [2018] [Alex Naga]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
