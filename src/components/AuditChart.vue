<template>
  <q-card class="my-card">
    <q-card-section class="bg-purple-8 q-mb-lg">
      <div class="row items-center no-wrap ">
        <div class="col text-white">
          <div class="text-h6">Monthly Total Audit Reports</div>
          <!-- <div class="text-subtitle2">by John Doe</div> -->
        </div>

        <!-- <div class="col-auto "> -->
        <q-select
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
          <!-- <template v-slot:append>
          <q-icon name="event" color="orange" />
        </template> -->
        </q-select>
      </div>
      <!-- </div> -->
    </q-card-section>
    <!-- <div class="q-pa-sm row">
      <q-space></q-space>
      <q-select
        class="col-3"
        outlined
        dense
        transition-show="scale"
        transition-hide="scale"
        label-color="orange"
        v-model="month"
        value="Month"
        :options="months"
        @input="getReports(month.value)"
      >
        <template v-slot:append>
          <q-icon name="event" color="orange" />
        </template>
      </q-select>
    </div> -->
    <canvas id="myChart" class="chart"></canvas>
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
    };
  },
  methods: {
    onItemClick() {},
    getReports(month) {
      console.log('getReports ', month);

      const now = new Date();
      this.reports = [];
      this.allReports = [];

      this.chartData = [];
      console.log('this.chartData ', this.chartData);
      this.chartLabels = [];
      this.chartLabels = [
        ...Array(
          new Date(now.getFullYear(), month + 1, 0).getDate() + 1
        ).keys(),
      ];

      this.$axios({
        url: `${process.env.API_URL}/report/allReports/${month}`,
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

      //   this.$firestore
      //     .collection('reports')
      //     .orderBy('createdAt')
      //     .where(this.role, '==', this.name)
      //     .onSnapshot(querySnapshot => {
      //       reports = [];
      //       this.chartData = [];
      //       console.log('snapShot ran and char data is', this.chartData);
      //       querySnapshot.forEach(doc => {
      //         reports.push(doc.data());
      //       });
      //       console.log('reports ', reports[0].createdAt.toDate().getDate());

      //       for (let i in this.chartLabels) {
      //         let numberOfAudits = 0;
      //         reports.forEach(report => {
      //           if (
      //             report.createdAt &&
      //             report.createdAt.toDate().getMonth() == month
      //           ) {
      //             console.log('report month is equal to selected month');
      //             if (report.createdAt.toDate().getDate() == i) {
      //               numberOfAudits++;
      //             }
      //           }
      //         });
      //         this.chartData.push(numberOfAudits);
      //         // console.log('this.chartData ', this.chartData);
      //       }

      //       var ctx = document.getElementById('myChart');
      //       var myChart = new Chart(ctx, {
      //         type: 'line',
      //         data: {
      //           labels: this.chartLabels,
      //           datasets: [
      //             {
      //               label: '# of Audits',
      //               data: this.chartData,
      //               backgroundColor: 'rgba(255, 99, 132, 1)',
      //               borderColor: 'rgba(54, 162, 235, 1)',
      //               borderWidth: 5,
      //               fill: false,
      //               lineTension: 0,
      //               //   pointHoverRadius: 3,
      //             },
      //           ],
      //         },
      //         options: {
      //           scales: {
      //             yAxes: [
      //               {
      //                 ticks: {
      //                   beginAtZero: false,
      //                 },
      //               },
      //             ],
      //           },
      //         },
      //       });
      //     });

      //alternate method

      // this.$auth.onAuthStateChanged(user => {
      //   if (user) {
      //     const currentUser = this.$auth.currentUser;

      //     console.log('current user ', currentUser.uid);

      //     this.$firestore
      //       .collection('users')
      //       .doc(currentUser.uid)
      //       .onSnapshot(doc => {
      //         const data = doc.data();
      //         this.dashboardView = data.dashboardView;
      //         if (data.clockInTime) {
      //           this.clockInTime = data.clockInTime
      //             .toDate()
      //             .toLocaleTimeString();
      //         }
      //         console.log(
      //           'dashboard components visible to the user',
      //           this.dashboardView
      //         );

      //         this.role = doc.data().role;
      //         this.name = doc.data().name;
      //         this.permissions = doc.data().permissions;
      //         console.log('pers ', this.permissions);

      //         if (
      //           this.permissions.includes('viewAll') ||
      //           this.permissions.includes('admin')
      //         ) {
      //           this.$firestore
      //             .collection('reports')
      //             //   .where(this.role, '==', this.name)
      //             .orderBy('createdAt')
      //             // .limit(10)
      //             .onSnapshot(querySnapshot => {
      //               this.allReports = [];
      //               querySnapshot.forEach(doc => {
      //                 this.allReports = _.union(this.allReports, [
      //                   { ...doc.data(), id: doc.id },
      //                 ]);
      //                 // console.log('data ', doc.data());
      //               });
      //               this.reports = _.union(this.reports, this.allReports);
      //               this.generateChart(month);
      //             });
      //         } else {
      //           if (this.permissions.includes('viewMy')) {
      //             this.$firestore
      //               .collection('reports')
      //               .orderBy('createdAt')
      //               .where(this.role, '==', this.name)
      //               //   .limit(10)
      //               .onSnapshot(querySnapshot => {
      //                 //   this.allReports = [];
      //                 querySnapshot.forEach(doc => {
      //                   this.allReports = _.union(this.allReports, [
      //                     { ...doc.data(), id: doc.id },
      //                   ]);
      //                 });
      //                 //   this.reports = this.allReports;
      //                 this.reports = _.union(this.reports, this.allReports);
      //                 this.generateChart(month);
      //               });
      //           }

      //           if (this.permissions.includes('viewTl')) {
      //             this.$firestore
      //               .collection('reports')
      //               .orderBy('createdAt')
      //               .where('teamLead', '==', this.name)
      //               //   .limit(10)
      //               .onSnapshot(querySnapshot => {
      //                 //   this.allReports = [];
      //                 querySnapshot.forEach(doc => {
      //                   this.allReports = _.union(this.allReports, [
      //                     { ...doc.data(), id: doc.id },
      //                   ]);
      //                 });
      //                 //   this.reports = this.allReports;
      //                 this.reports = _.union(this.reports, this.allReports);
      //                 this.generateChart(month);
      //               });
      //           }

      //           if (this.permissions.includes('viewSm')) {
      //             this.$firestore
      //               .collection('reports')
      //               .orderBy('createdAt')
      //               .where('seniorManager', '==', this.name)
      //               //   .limit(10)
      //               .onSnapshot(querySnapshot => {
      //                 //   this.allReports = [];
      //                 querySnapshot.forEach(doc => {
      //                   this.allReports.push({ ...doc.data(), id: doc.id });
      //                 });
      //                 //   this.reports = this.allReports;
      //                 this.reports = _.union(this.reports, this.allReports);
      //                 this.generateChart(month);
      //               });
      //           }
      //         }
      //       });
      //   }
      // });
    },

    generateChart() {
      this.chartData = [];

      for (let i in this.chartLabels) {
        let numberOfAudits = 0;
        this.reports &&
          this.reports.forEach(report => {
            report.createdAt = new Date(report.createdAt);
            //   console.log('report.createdAt ', report.createdAt);

            // if (
            //   report.createdAt &&
            //   report.createdAt.toDate().getMonth() == month
            // ) {
            // console.log('report month is equal to selected month');
            if (report.createdAt.getDate() == i) {
              numberOfAudits++;
              console.log('numberOfAudits ', numberOfAudits);
              // }
            }
          });
        this.chartData.push(numberOfAudits);
        // console.log('this.chartData ', this.chartData);
      }

      console.log('this.chartData generateChart', this.chartData);

      var ctx = document.getElementById('myChart');
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.chartLabels,
          datasets: [
            {
              label: '# of Audits',
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

    this.getReports(new Date().getMonth());
  },
};
</script>

<style scoped>
.chart {
  width: 100%;
  height: 300px;
}
</style>
