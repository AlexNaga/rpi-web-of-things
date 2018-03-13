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
Om man pratar i de termer som tas upp i kurslitteraturen så använder jag mig av en så kallad *Gateway integration-pattern*. Raspberry Pi'n fungerar då som en brygga mellan Internet och de tre sensorerna.

#### Access Layer (WoT architecture stack)
Servern använder sig av WebSockets för att skicka ut information från sensorerna varje sekund.  
Klienter kan lyssna efter event på `wss://rpi.alexnaga.se`. Där det finns olika kanaler för att få realtidsdata.
  
| WebSocket channel | Description                                    |
|-------------------|------------------------------------------------|
| temperature       | Get current value from the temperature sensor. |
| humidity          | Get current value from the humidity sensor.    |
| pressure          | Get current value from the pressure sensor.    |
| brightness        | Get current value from the brightness sensor.  |

&nbsp;

Jag har försökt utgå från förslagen som boken nämner angående hur man ska beskriva en *web of thing*.  
Användaren kan hämta värden från sensorerna med en GET-request.  

| Method | Route                   | Description                                    |
|--------|-------------------------|------------------------------------------------|
| GET    | /model                  | List metadata about this WoT.                  |
| GET    | /properties             | List all available properties.                 |
| GET    | /properties/temperature | Get current value from the temperature sensor. |
| GET    | /properties/humidity    | Get current value from the humidity sensor.    |
| GET    | /properties/pressure    | Get current value from the pressure sensor.    |
| GET    | /properties/brightness  | Get current value from the brightness sensor.  |

#### Find Layer (WoT architecture stack)
För att lättare kunna navigera sig i APIt och dela med mig av resurser så har jag implementerat en variant av HATEOAS.

```
  "index": {
    "href": "https://rpi.alexnaga.se/model",
    "method": "GET",
    "desc": "Route for listing metadata about this WoT."
  },
  "self": {
    "href": "https://rpi.alexnaga.se/properties",
    "method": "GET",
    "desc": "Route for listing all properties."
  },
  "temperature": {
    "href": "https://rpi.alexnaga.se/properties/temperature",
    "method": "GET",
    "desc": "Route for getting current value from the temperature sensor."
  },
  "humidity": {
    "href": "https://rpi.alexnaga.se/properties/humidity",
    "method": "GET",
    "desc": "Route for getting current value from the humidity sensor."
  },
  "pressure": {
    "href": "https://rpi.alexnaga.se/properties/pressure",
    "method": "GET",
    "desc": "Route for getting current value from the pressure sensor."
  },
  "brightness": {
    "href": "https://rpi.alexnaga.se/properties/brightness",
    "method": "GET",
    "desc": "Route for getting current value from the brightness sensor."
  }
```

### *Personlig reflektion*
Det som jag har lagt mest tid på i detta projekt är egentlig debuggning. Det inkluderar prylar som var gamla och inte fungerade till 100%. Satt och debuggade en hel dag eftersom en sensor inte hittades, det visade sig att det var själva kopplingsdäcket som var slitet och trasigt.

Det som jag har fått ut mest av detta projekt är egentligen att jag har ökat min förståelse kring hur servern, klienten osv. hänger ihop med varandra. Att koppla ihop hårdvara med med mjukvara känns inte längre så skrämmande.
