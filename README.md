# web_interface

This project is part of a connected weather station.

See also :
 - [Embedded (Python)](https://github.com/Pier4413/embeddedPythonWeatherStation.git)
 - [Data Server (Node.js/Mongo.db)](https://github.com/Pier4413/dataServerWeatherStation)

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Files
#### .env
You need to create a file with the minimal in it :
```
VITE_API_KEY=<Your api key to data server>
VITE_SERVER_URL=http://<hostname of data server>:<port of data server>
VITE_TEMPERATURE=1
VITE_PRESSURE=1
VITE_HUMIDITY=1
VITE_WIND_SPEED=0
VITE_WIND_DIRECTION=0
```

For the 0 or 1 values a 0 indicated that we don't want to see the chart and 1 that we want to print the chart