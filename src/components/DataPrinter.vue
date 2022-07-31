<template>
  <div>
    <canvas :id="chartId" height="50"></canvas>
  </div>
  <div v-if="latestValues.length" class="container">
    <div class="row">
      <div class="col d-flex justify-content-center text-center">
        {{ $tc("current_value", latestValues.length) }}
      </div>
    </div>
    <div class="row" >
      <div class="col d-flex justify-content-center text-center" v-for="data in latestValues">
        {{ data }}
      </div>
    </div>
  </div>
</template>

<script>
  import Chart from 'chart.js/auto'

  export default {
    data() {
      return {
        latestValues: [],
        chartData: null,
        chart: null
      }
    },
    props: ['chartId'],
    methods: {
      printChart(chartData, latestValues) {
        this.chartData = chartData;
        this.latestValues = latestValues;

        let ctx = document.getElementById(this.chartId);
        if(this.chart !== null) {
          this.chart.destroy();
        }
        this.chart = new Chart(ctx, this.chartData);
      }
    }
  }
</script>