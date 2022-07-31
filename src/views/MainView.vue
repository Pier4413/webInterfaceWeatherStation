<template>
  <data-printer ref="tempsChild" chart-id="temps-chart"/>
  <data-printer ref="pressureChild" chart-id="pressure-chart"/>
  <data-printer ref="humidityChild" chart-id="humidity-chart"/>
  <data-printer ref="windSpeedChild" chart-id="wind-speed-chart"/>
  <data-printer ref="windDirectionChild" chart-id="wind-direction-chart"/>
</template>

<script>
import { getRequest } from "../functions/data_connection.js"
import { createChart } from "../functions/charts.js"
import { filterLatest } from "../functions/filters.js"
import DataPrinter from "../components/DataPrinter.vue"
export default {
  data() {
    return {
      weathers: [],
      error: null
    };
  },
  components: {
    'data-printer': DataPrinter
  },
  mounted() {
    this.requestHistory();
  },
  methods: {
    requestHistory: function () {
      getRequest('weather/last_hour', null)
        .then(data => {

          try {
            this.weathers = data;

            // Create the data for the charts
            // Temperature
            if(import.meta.env.VITE_TEMPERATURE==1) {
              let tempsChartData = createChart(this.weathers.map(d => d.temperature), this.$tc, "temperature", (t => t - 273.15), "current", "feels_like");
              let latestTemp = filterLatest(this.weathers.map(d => d.temperature), "°C", (t => t - 273.15), "current", "feels_like");
              this.$refs.tempsChild.printChart(tempsChartData, latestTemp);
            }

            // Pressure
            if(import.meta.env.VITE_PRESSURE==1) {
              let pressureChartData = createChart(this.weathers.map(d => d.misc), this.$tc, "pressure", null, "pressure");
              let latestPressure = filterLatest(this.weathers.map(d => d.misc), "hPa", null, "pressure");
              this.$refs.pressureChild.printChart(pressureChartData, latestPressure);
            }
            
            // Humidity
            if(import.meta.env.VITE_HUMIDITY==1) {
              let humidityChartData = createChart(this.weathers.map(d => d.misc),  this.$tc,"humidity", null, "humidity");
              let latestHumidity = filterLatest(this.weathers.map(d => d.misc), "%", null, "humidity");
              this.$refs.humidityChild.printChart(humidityChartData, latestHumidity);
            }

            // Wind Speed
            if(import.meta.env.VITE_WIND_SPEED==1) {
              let windSpeedChartData = createChart(this.weathers.map(d => d.wind), this.$tc, "speed", (v => v * 3.6), "speed");
              let latestWindSpeed = filterLatest(this.weathers.map(d => d.wind), "km/h", (v => v * 3.6), "speed");
              this.$refs.windSpeedChild.printChart(windSpeedChartData, latestWindSpeed);
            }
            
            // Wind direction
            if(import.meta.env.VITE_WIND_DIRECTION==1) {
              let windDirectionChartData = createChart(this.weathers.map(d => d.wind), this.$tc, "direction", null, "direction");
              let latestWindDirection = filterLatest(this.weathers.map(d => d.wind), "°", null, "direction");
              this.$refs.windDirectionChild.printChart(windDirectionChartData, latestWindDirection);
            }
          }
          catch(e) {
            console.error(e);
          }
        })
        .catch(err => {
          this.error = err;
        })
    }
  }
};
</script>
