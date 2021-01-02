<template>
  <div>
    <q-card flat class="my-card">
      <q-card-section class=" q-mb-lg">
        <div class="row items-center no-wrap ">
          <div class="col text-grey-8">
            <div class="text-h6">
              Monthly Statistics of reports -
              {{ months[0].label }}
            </div>
          </div>

          <!-- <q-select
            class="col-3"
            outlined
            dense
            bg-color="grey-3"
            transition-show="scale"
            transition-hide="scale"
            label-color="orange"
            v-model="month"
            value="Month"
            :options="months"
            @input="getReports(month.value)"
          >
          </q-select> -->
        </div>
      </q-card-section>
    </q-card>
    <canvas id="myChartPie" class="chart"></canvas>
  </div>
</template>

<script>
import { Chart } from 'chart.js';
import _ from 'lodash';

export default {
  // props: ['pieChartData'],
  data() {
    return {
      months: [
        { label: 'January', value: 0 },
        { label: 'Fabuary', value: 1 },
        { label: 'March', value: 2 },
        { label: 'April', value: 3 },
        { label: 'May', value: 4 },
        { label: 'June', value: 5 },
        { label: 'July', value: 6 },
        { label: 'August', value: 7 },
        { label: 'September', value: 8 },
        { label: 'October', value: 9 },
        { label: 'November', value: 10 },
        { label: 'December', value: 11 },
      ],
      month: 'Month',
      pieChartData: [],
    };
  },
  methods: {
    onItemClick() {},
    getReports(month) {
      console.log('getReports ', month);

      const now = new Date();
      this.reports = [];
      this.allReports = [];

      this.$axios({
        url: `${process.env.API_URL}/report/allReports/${month}`,
        method: 'GET',

        headers: {
          authorization: `Bearer${localStorage.getItem('access-token')}`,
        },
      }).then(res => {
        console.log('response ', res);

        // const today = new Date();
        // const yesterDay = today.setDate(today.getDate() - 1);
        // const tomorrow = today.setDate(today.getDate() + 1);

        this.pieChartData = [0, 0];

        // const now = new Date();

        res.data.reports.forEach(report => {
          // report.createdAt = new Date(report.createdAt);
          console.log('report ', report.createdAt);
          if (report.result == 'F') this.pieChartData[1]++;
          else this.pieChartData[0]++;
        });

        console.log('pieChartData ', this.pieChartData);
        this.generateChart();
      });
    },

    generateChart() {
      console.log('this.chartData generateChart', this.pieChartData);

      var ctx = document.getElementById('myChartPie');
      var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Pass', 'Fail'],
          datasets: [
            {
              label: '# of Audits',
              data: this.pieChartData,
              backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
              ],
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 0,
            },
            // {
            //   label: '# of Audits',
            //   data: this.pieChartData,
            //   backgroundColor: 'rgba(54, 162, 235, 1)',
            //   borderColor: 'rgba(54, 162, 235, 1)',
            //   borderWidth: 1,
            // },
          ],
        },
        options: {
          // scales: {
          //   yAxes: [
          //     {
          //       ticks: {
          //         beginAtZero: false,
          //       },
          //     },
          //   ],
          // },
        },
      });
    },
  },
  mounted() {
    this.months = [];
    const monthsArray = [
      'January',
      'Febuary',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    for (let i = 0; i < 6; i++) {
      const now = new Date();

      now.setMonth(now.getMonth() - i);
      this.months.push({
        label: `${monthsArray[now.getMonth()]} ${now.getFullYear()}`,
        value: now.getMonth(),
      });
    }
    this.month = this.months[0];

    this.getReports(new Date().getMonth());
  },
};
</script>

<style scoped>
.chart {
  width: 300px;
  height: 300px;
}
</style>
