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
```

As those are environment variables they can be provided by any other means that are available for environment variables on your system