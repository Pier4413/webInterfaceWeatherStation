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
            let tempsChartData = createChart(this.weathers.map(d => d.temperature), this.$tc, "temperature", (t => t - 273.15), "current", "feels_like");
            let pressureChartData = createChart(this.weathers.map(d => d.misc), this.$tc, "pressure", null, "pressure");
            let humidityChartData = createChart(this.weathers.map(d => d.misc),  this.$tc,"humidity", null, "humidity");
            let windSpeedChartData = createChart(this.weathers.map(d => d.wind), this.$tc, "speed", (v => v * 3.6), "speed");
            let windDirectionChartData = createChart(this.weathers.map(d => d.wind), this.$tc, "direction", null, "direction");

            // Filter to get the latest data in the weathers. Faster than a call to API /weather/latest
            let latestTemp = filterLatest(this.weathers.map(d => d.temperature), "°C", (t => t - 273.15), "current", "feels_like");
            let latestPressure = filterLatest(this.weathers.map(d => d.misc), "hPa", null, "pressure");
            let latestHumidity = filterLatest(this.weathers.map(d => d.misc), "%", null, "humidity");
            let latestWindSpeed = filterLatest(this.weathers.map(d => d.wind), "km/h", (v => v * 3.6), "speed");
            let latestWindDirection = filterLatest(this.weathers.map(d => d.wind), "°", null, "direction");

            // Tell all data component to update
            this.$refs.tempsChild.printChart(tempsChartData, latestTemp);
            this.$refs.pressureChild.printChart(pressureChartData, latestPressure);
            this.$refs.humidityChild.printChart(humidityChartData, latestHumidity);
            this.$refs.windSpeedChild.printChart(windSpeedChartData, latestWindSpeed);
            this.$refs.windDirectionChild.printChart(windDirectionChartData, latestWindDirection);
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
