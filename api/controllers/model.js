exports.model_index = (req, res, next) => {
  res.status(200).json({
    "id": process.env.DOMAIN + 'api',
    "name": "A WoT Raspberry Pi",
    "description": "A Raspberry Pi with a bunch of sensors connected to it.",
    "tags": [
      "raspberry",
      "pi",
      "WoT"
    ],
    "links": {
      "product": {
        "link": "https://www.raspberrypi.org/products/raspberry-pi-3-model-b",
        "title": "Product this Web Thing is based on."
      },
      "properties": {
        "link": "/properties",
        "title": "List of Properties",
        "resources": {
          "temperature": {
            "name": "Temperature Sensor",
            "description": "A temperature sensor.",
            "values": {
              "t": {
                "name": "Temperature sensor",
                "description": "The temperature in celsius",
                "unit": "celsius"
              }
            },
            "tags": [
              "sensor"
            ]
          },
          "humidity": {
            "name": "Humidity Sensor",
            "description": "A humidity sensor.",
            "values": {
              "h": {
                "name": "Humidity",
                "description": "Percentage of Humidity",
                "unit": "%"
              }
            },
            "tags": [
              "sensor"
            ]
          },
          "pressure": {
            "name": "Pressure Sensor",
            "description": "A pressure sensor.",
            "values": {
              "t": {
                "name": "Pressure sensor",
                "description": "The pressure in pascal",
                "unit": "pa"
              }
            },
            "tags": [
              "sensor"
            ]
          },
          "brightness": {
            "name": "Brightness Sensor",
            "description": "A brightness sensor.",
            "values": {
              "t": {
                "name": "Brightness sensor",
                "description": "The brightness in Lux",
                "unit": "lux"
              }
            },
            "tags": [
              "sensor"
            ]
          }
        }
      },
      "help": {
        "link": "https://github.com/1dv527/grupp04-vt18",
        "title": "Documentation"
      },
      "ui": {
        "link": "/",
        "title": "User Interface"
      }
    }
  });
};