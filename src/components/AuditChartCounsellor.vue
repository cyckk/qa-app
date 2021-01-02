<template>
  <q-card class="my-card">
    <q-card-section class="bg-purple-8 q-mb-lg">
      <div class="row items-center no-wrap ">
        <div class="col text-white">
          <div class="text-h6">
            Monthly Counselor Reports
          </div>
          <!-- <div class="text-subtitle2">by John Doe</div> -->
        </div>

        <!-- <div class="col-auto "> -->
        <q-select
          class="col-3"
          outlined
          dense
          bg-color="grey-3"
          transition-show="jump"
          transition-hide="jump"
          label-color="orange"
          v-model="month"
          value="Month"
          :options="months"
          @input="getReports(month.value, selectedCounsellor)"
        >
          <!-- <template v-slot:append>
          <q-icon name="event" color="orange" />
        </template> -->
        </q-select>

        <q-select
          class="col-3 q-ml-sm"
          outlined
          dense
          transition-show="jump"
          transition-hide="jump"
          label-color=""
          bg-color="grey-3"
          v-model="selectedCounsellor"
          value="Month"
          label="Counselor"
          :options="counsellors"
          @input="getReports(month.value, selectedCounsellor)"
        >
        </q-select>
      </div>
      <!-- </div> -->
    </q-card-section>

    <canvas id="counsellorChart" class="chart"></canvas>
  </q-card>
</template>

<script>
import { Chart } from 'chart.js';
import _ from 'lodash';

export default {
  data() {
    return {
      chartLabels: [],
      chartData: [],
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
      selectedCounsellor: null,
      counsellors: [],
      tls: [],
    };
  },
  methods: {
    onItemClick() {},
    pupulateData() {
      return new Promise((resolve, reject) => {
        this.counsellors = [];
        const user = localStorage.getItem('access-token');
        this.$axios({
          url: `${process.env.API_URL}/allUsersRole`,
          method: 'GET',

          headers: {
            authorization: `Bearer${user}`,
          },
        }).then(res => {
          res.data.users.forEach(user => {
            let data = user;

            if (data.role == 'counselor') {
              this.counsellors.push(data.name);

              //   console.log(this.counsellors);
            }
            // else if (data.role == 'team lead') {
            //   this.tls.push(data.name);
            // } else if (data.role == 'senior manager') {
            //   this.seniorManagers.push(data.name);
            // } else if (data.role == 'auditor') {
            //   this.auditors.push(data.name);
            // }
          });
          // this.counsellors.sort().reverse();
          // this.counsellors.push('NA');
          // this.counsellors.reverse();

          this.counsellors.sort();
          console.log('counsellors ', this.counsellors);
          this.selectedCounsellor = this.counsellors[0];

          // this.tls.sort();

          // this.seniorManagers.sort();

          // this.auditors.sort();

          resolve();
        });
      });
    },
    getReports(month, selectedCounsellor) {
      const now = new Date();

      this.chartLabels = [
        ...Array(
          new Date(now.getFullYear(), month + 1, 0).getDate() + 1
        ).keys(),
      ];
      // this.month = this.months[month];
      console.log('getReports ', month, selectedCounsellor);
      //   return new Pro();
      this.reports = [];
      this.allReports = [];

      if (true) {
        this.$axios({
          url: `${process.env.API_URL}/report/counselor/allReports/${month}/${selectedCounsellor}`,
          method: 'GET',

          headers: {
            authorization: `Bearer${localStorage.getItem('access-token')}`,
          },
        }).then(res => {
          console.log('response ', res);

          this.allReports = res.data.reports;
          this.reports = this.allReports;

          this.generateChart();
        });
      }
    },

    generateChart() {
      this.chartData = [];
      let counselorSum = 0;
      let counselorNum = 0;
      let fail = false;
      for (let i in this.chartLabels) {
        counselorSum = 0;
        counselorNum = 0;
        fail = false;
        this.reports.forEach(report => {
          report.createdAt = new Date(report.createdAt);

          //   console.log('report.createdAt ', report.createdAt);

          // console.log('report month is equal to selected month');
          // console.log('report created at ', report.createdAt.toDate().getDate());
          if (report.createdAt.getDate() == i) {
            if (report.result == 'F') {
              fail = true;
              counselorSum += 0;
              counselorNum++;
              return false;
            } else {
              counselorSum += report.result;
              counselorNum++;
              return false;
            }
          }
        });

        if (fail) {
          this.chartData.push(counselorSum / counselorNum);
        } else if (!counselorSum) this.chartData.push(-10);
        else this.chartData.push(counselorSum / counselorNum);
      }

      var ctx = document.getElementById('counsellorChart');
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.chartLabels,
          datasets: [
            {
              label: 'Audit score',
              data: this.chartData,
              backgroundColor: 'rgba(255, 99, 132, 1)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 5,
              fill: false,
              lineTension: 0,
              //   pointHoverRadius: 3,
            },
          ],
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: false,
                },
              },
            ],
          },
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
    (async () => {
      await this.pupulateData();

      this.getReports(new Date().getMonth(), this.selectedCounsellor);
    })();

    // this.counsellors = this.$store.state.counsellors;
  },
};
</script>

<style scoped>
.chart {
  width: 100%;
  height: 300px;
}
</style>
