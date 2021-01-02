<template>
  <q-card class="my-card">
    <q-card-section class="bg-purple-8 q-mb-lg">
      <div class="row items-center no-wrap ">
        <div class="col text-white">
          <div class="text-h6">Monthly TeamLead Reports</div>
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
          @input="getReports(month.value, selectedTeamLead)"
        >
          <!-- <template v-slot:append>
          <q-icon name="event" color="orange" />
        </template> -->
        </q-select>

        <q-select
          class="col-3 q-ml-sm"
          outlined
          dense
          transition-show="slide"
          transition-hide="slide"
          label-color=""
          bg-color="grey-3"
          v-model="selectedTeamLead"
          value="Month"
          label="TeamLead"
          :options="tls"
          @input="getReports(month.value, selectedTeamLead)"
        >
          <!-- <template v-slot:append>
          <q-icon name="event" color="orange" />
        </template> -->
        </q-select>
      </div>
      <!-- </div> -->
    </q-card-section>

    <canvas id="counsellorTlChart" class="chart"></canvas>
  </q-card>
</template>

<script>
import { Chart } from 'chart.js';
import _ from 'lodash';

export default {
  data() {
    return {
      chartLabels: [],
      chartDataCounsellor: [],
      chartDataTl: [],
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
      selectedTeamLead: null,
      counsellors: [],
      tls: [],
    };
  },
  methods: {
    onItemClick() {},
    pupulateData() {
      return new Promise((resolve, reject) => {
        this.counsellors = [];
        this.tls = [];
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

            if (data.role == 'team lead') {
              this.tls.push(data.name);
            }
          });

          this.tls.sort();
          console.log('tls ', this.tls);
          this.selectedTeamLead = this.tls[0];

          resolve();
        });
      });
    },
    getReports(month, selectedTeamLead) {
      const now = new Date();

      // this.month = this.months[month];
      console.log('getReports ', month, selectedTeamLead);
      this.reports = [];
      this.allReports = [];

      this.chartDataCounsellor = [];
      this.chartLabels = [
        ...Array(
          new Date(now.getFullYear(), month + 1, 0).getDate() + 1
        ).keys(),
      ];
      console.log('chartLabels ', this.chartLabels);

      //alternate method
      if (true) {
        this.$axios({
          url: `${process.env.API_URL}/report/teamlead/allReports/${month}/${selectedTeamLead}`,
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
      // console.log('month ', month);
      //   this.reports = [];
      //   this.allReports = [];
      this.chartDataCounsellor = [];
      this.chartDataTl = [];
      // this.chartLabels = [];
      let chartLabelsCounselor = [];
      let chartLabelsTl = [];
      //   for (let i in this.chartLabels) {
      let number = 0;
      let counselorSum = 0;
      let counselorNum = 0;
      let teamLeadSum = 0;
      let teamLeadNum = 0;
      let failC = false;
      let failT = false;

      for (let i in this.chartLabels) {
        counselorSum = 0;
        counselorNum = 0;
        teamLeadSum = 0;
        teamLeadNum = 0;
        failC = false;
        failT = false;
        this.reports.forEach(report => {
          report.createdAt = new Date(report.createdAt);
          if (report.createdAt.getDate() == i) {
            if (report.counselor == 'NA') {
              if (report.result == 'F') {
                failT = true;
                teamLeadSum += 0;
                teamLeadNum++;
                return false;
              } else {
                teamLeadSum += report.result;
                teamLeadNum++;
                return false;
              }
            } else {
              if (report.result == 'F') {
                failC = true;
                counselorSum += 0;
                counselorNum++;
                return false;
              } else {
                counselorSum += report.result;
                counselorNum++;
                return false;
              }
            }
          }
        });
        // console.log(
        //   'counselorSum / counselorNum ',
        //   counselorSum / counselorNum
        // );
        if (failC) this.chartDataCounsellor.push(counselorSum / counselorNum);
        else if (!counselorSum) this.chartDataCounsellor.push(-10);
        else this.chartDataCounsellor.push(counselorSum / counselorNum);

        if (failT) this.chartDataTl.push(teamLeadSum / teamLeadNum);
        else if (!teamLeadSum) this.chartDataTl.push(-10);
        else this.chartDataTl.push(teamLeadSum / teamLeadNum);

        // if (fail) {
        //   this.chartData.push(counselorSum / counselorNum);
        // } else if (!counselorSum) this.chartData.push(-10);
        // else this.chartData.push(counselorSum / counselorNum);
      }

      // this.reports.forEach(report => {
      //   //   console.log('report.createdAt ', report.createdAt);

      //   if (report.createdAt && report.createdAt.toDate().getMonth() == month) {
      //     // console.log('report month is equal to selected month');
      //     console.log(
      //       'report created at ',
      //       report.createdAt.toDate().getDate()
      //     );
      //     //   this.chartLabels = _.union(this.chartLabels, [report.createdAt.toDate().getDate()])
      //     // if (report.createdAt.toDate().getDate() == i) {

      //     if (report.counsellor == 'NA') {
      //       number++;
      //       console.log(
      //         'report.createdAt.toDate().getDate()',
      //         report.createdAt.toDate().getDate()
      //       );
      //       // this.chartLabels.push(report.createdAt.toDate().getDate());
      //       chartLabelsTl.push(report.createdAt.toDate().getDate());
      //       chartLabelsCounselor.push(0);

      //       if (report.result == 'F') {
      //         this.chartDataTl.push(0);
      //         //   return false;
      //       } else {
      //         this.chartDataTl.push(report.result);
      //         //   return false;
      //       }
      //     } else {
      //       if (!chartLabelsCounselor.length) {
      //         //   this.chartLabels.push(report.createdAt.toDate().getDate());

      //         chartLabelsCounselor.push(report.createdAt.toDate().getDate());
      //         chartLabelsTl.push(0);

      //         if (report.result == 'F') {
      //           counsellorSum += 0;
      //           counsellorNum += 1;
      //         } else {
      //           counsellorSum += report.result;
      //           counsellorNum += 1;
      //         }
      //       } else if (
      //         chartLabelsCounselor[chartLabelsCounselor.length - 1] ==
      //         report.createdAt.toDate().getDate()
      //       ) {
      //         if (report.result == 'F') {
      //           counsellorSum += 0;
      //           counsellorNum += 1;
      //         } else {
      //           counsellorSum += report.result;
      //           counsellorNum += 1;
      //         }
      //       } else {
      //         let i = 0;

      //         do {
      //           if (!number) {
      //             console.log(
      //               'report.createdAt.toDate().getDate()',
      //               report.createdAt.toDate().getDate()
      //             );
      //             //   this.chartLabels.push(report.createdAt.toDate().getDate());
      //             chartLabelsCounselor.push(
      //               report.createdAt.toDate().getDate()
      //             );
      //             chartLabelsTl.push(0);

      //             this.chartDataTl.push(-10);
      //           }
      //           this.chartDataCounsellor.push(counsellorSum / counsellorNum);
      //           i++;
      //         } while (i < number);
      //         number = 0;
      //         counsellorSum = 0;
      //         counsellorNum = 0;
      //         if (report.result == 'F') {
      //           counsellorSum += 0;
      //           counsellorNum += 1;
      //         } else {
      //           counsellorSum += report.result;
      //           counsellorNum += 1;
      //         }
      //       }
      //     }
      //   }
      // });
      // console.log('chartLabelsCo ', chartLabelsCounselor);
      // console.log('chartLabelsTl ', chartLabelsTl);

      // for (let i = 0; i < chartLabelsCounselor.length - 1; i++) {
      //   if (
      //     chartLabelsCounselor[i] == chartLabelsCounselor[i + 1] &&
      //     chartLabelsTl[i + 1] == chartLabelsTl[i]
      //   ) {
      //     continue;
      //   } else if (
      //     chartLabelsCounselor[i] == chartLabelsTl[i + 1] &&
      //     chartLabelsCounselor[i + 1] == chartLabelsTl[i]
      //   ) {
      //     i++;
      //     this.chartLabels.push(
      //       chartLabelsCounselor[i] ? chartLabelsCounselor[i] : chartLabelsTl[i]
      //     );
      //   } else {
      //     this.chartLabels.push(
      //       chartLabelsCounselor[i] ? chartLabelsCounselor[i] : chartLabelsTl[i]
      //     );
      //   }
      // }

      // if (counsellorSum) {
      //   console.log('counsellor sum ', counsellorSum, counsellorNum);
      //   this.chartLabels.pop();
      //   let i = 0;
      //   do {
      //     this.chartDataCounsellor.push(counsellorSum / counsellorNum);
      //     i++;
      //   } while (i < number);
      //   number = 0;
      //   counsellorNum = 0;
      //   counsellorSum = 0;
      // }
      //   this.chartDataCounsellor.push(0);
      // this.chartDataCounsellor.push(numberOfAudits);
      // console.log('this.chartDataCounsellor ', this.chartDataCounsellor);
      //   }

      var ctx = document.getElementById('counsellorTlChart');
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.chartLabels,
          datasets: [
            {
              label: 'Audit score(Team lead)',
              data: this.chartDataTl,
              backgroundColor: 'rgba(255, 99, 132, 1)',
              borderColor: 'rgb(115, 197, 39)',
              borderWidth: 5,
              fill: false,
              lineTension: 0,
              //   pointHoverRadius: 3,
            },
            {
              label: 'Audit score(Counsellor)',
              data: this.chartDataCounsellor,
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

      this.getReports(new Date().getMonth(), this.selectedTeamLead);
    })();

    // this.counsellors = this.$store.state.counsellors;
  },
};
</script>

<style scoped>
.chart {
  width: 100%;
  height: 300px;
  color: rgb(115, 197, 39);
}
</style>
