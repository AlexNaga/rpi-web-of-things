# 1DV527: Project
## About

This repository was created for the course 1DV527: The web as an application platform.
Linnaeus University, Sweden.

You can find the assignment [here.](https://coursepress.lnu.se/kurs/the-web-as-an-application-platform/examination-3)

A live demo of this application can be found at [https://rpi.alexnaga.se](https://rpi.alexnaga.se)

## Usage

This application depends on the [BCM2835](http://www.airspayce.com/mikem/bcm2835/) library that must be installed on your board before you can actually use this application.  
You also need to have Node.js installed. [How to install Node.js on Raspberry Pi](https://github.com/cncjs/cncjs/wiki/Setup-Guide:-Raspberry-Pi-%7C-Install-Node.js-Manually)

1. Clone this repository or download the `.zip` file.
2. Extract folder to preferred location.
3. Open up the terminal in the extracted folder.
4. Install the required dependencies by typing `npm install`
5. Start the server by typing `npm start`
6. The server is now running at [http://localhost:3000](http://localhost:3000)

## Report

### *Vad gör din "web of thing?"*
Jag har kopplat tre sensorer till en Raspberry Pi 3b, som sedan presenteras i realtid via ett webbgränssnitt.
- Temperaturmätare och luftfuktighet (AM2302).
- Lufttryck (BMP180).
- Ljussensor (TSL2561).

### *Hur fungerar applikationen?*
Informationen från sensorerna hämtas med en sekunds intervall och skickas vidare via WebSocket till en klient. Därefter presenteras informationen via ett webbgränssnitt till användaren.

### *Hur stödjer implementeringen teorierna kring "web of things"?*

Om man pratar i de termer som tas upp i kurslitteraturen så använder jag mig av en så kallad *Gateway intergration-pattern*. Raspberry Pi'n fungerar då som en brygga mellan Internet och de tre sensorerna.

#### Access Layer (WoT architecture stack)
Servern använder sig av WebSockets för att skicka ut information från sensorerna varje sekund.  
Klienter kan lyssna efter event på `wss://rpi.alexnaga.se`. Där det finns olika kanaler för att få realtidsdata.
 
| WebSocket channel | Description                                    |
|-------------------|------------------------------------------------|
| temperature       | Get current value from the temperature sensor. |
| humidity          | Get current value from the humidity sensor.    |
| pressure          | Get current value from the pressure sensor.    |
| brightness        | Get current value from the brightness sensor.  |
<br>
Jag har även skapat ett RESTful API, där användaren kan hämta värden från sensorerna med en GET-request.

### /api
| Method | Route                    | Description                                     |
|--------|--------------------------|-------------------------------------------------|
| GET    | /api                     | Main entry point. Lists all routes.             |
| GET    | /api/sensors             | Lists all available sensors.                    |
| GET    | /api/sensors/temperature | Gets current value from the temperature sensor. |
| GET    | /api/sensors/humidity    | Gets current value from the humidity sensor.    |
| GET    | /api/sensors/pressure    | Gets current value from the pressure sensor.    |
| GET    | /api/sensors/brightness  | Gets current value from the brightness sensor.  |

#### Find Layer (WoT architecture stack)
För att lättare kunna navigera sig i APIt så har jag implementerat HATEOAS. Oavsett vart användaren befinner sig i APIt så ska det finnas en rutt som tar användaren vidare någonstans.

```
  "index": {
    "href": "https://rpi.alexnaga.se/api",
    "method": "GET",
    "desc": "Main entry point. Overview of routes."
  },
  "self": {
    "href": "https://rpi.alexnaga.se/api/sensors",
    "method": "GET",
    "desc": "Route for listing all sensors."
  },
  "temperature": {
    "href": "https://rpi.alexnaga.se/api/sensors/temperature",
    "method": "GET",
    "desc": "Route for getting current value from the temperature sensor."
  },
  "humidity": {
    "href": "https://rpi.alexnaga.se/api/sensors/humidity",
    "method": "GET",
    "desc": "Route for getting current value from the humidity sensor."
  },
  "pressure": {
    "href": "https://rpi.alexnaga.se/api/sensors/pressure",
    "method": "GET",
    "desc": "Route for getting current value from the pressure sensor."
  },
  "brightness": {
    "href": "https://rpi.alexnaga.se/api/sensors/brightness",
    "method": "GET",
    "desc": "Route for getting current value from the brightness sensor."
  }
```

### *Vad har gått dåligt / bra med projektet?*
Det som jag har lagt mest tid på i detta projekt är egentlig debuggning. Det inkluderar prylar som var gamla och inte fungerade till 100%. Satt och debuggade en hel dag eftersom en sensor inte hittades, det visade sig att det var själva kopplingsdäcket som var slitet och trasigt.

Det som jag har fått ut mest av detta projekt är egentligen att jag har ökat min förståelse kring hur servern, klienten osv. hänger ihop med varandra.
