<template>
  <q-page class="q-pa-lg q-pa-md-xl  bg-grey-2">
    <div class="q-ml-md-lg q-ml-lg-xl q-mr-md-lg q-mr-lg-xl q-pa-sm-md">
      <div
        class=" row items-center justify-center q-col-gutter-lg q-col-gutter-lg-xl"
      >
        <div v-if="dashboardView.includes('clock')" class="col-12 col-sm-4">
          <time-clock :clockInTime="clockInTime"></time-clock>
        </div>
        <div v-if="dashboardView.includes('auditDone')" class="col-12 col-sm-4">
          <audit-count :cardData="todaysCount"></audit-count>
        </div>
        <div
          v-if="dashboardView.includes('targetAudits')"
          class="col-12 col-sm-4"
        >
          <audit-count :cardData="todaysRemaining"></audit-count>
        </div>
      </div>

      <div
        class="q-pt-lg row items-start justify-between q-col-gutter-lg q-col-gutter-lg-xl"
      >
        <div
          v-if="dashboardView.includes('recentAuditsPass')"
          class="col-12 col-md-4"
        >
          <recent-audits
            :reports="reports"
            :title="'Recent Audits'"
          ></recent-audits>
        </div>
        <div
          v-if="dashboardView.includes('recentAuditsFail')"
          class="col-12 col-md-4"
        >
          <recent-audits
            :reports="failReports"
            :title="'Recent Fail Audits'"
          ></recent-audits>
        </div>

        <div v-if="dashboardView.includes('pieChart')" class="col-12 col-md-4">
          <audit-chart-pie></audit-chart-pie>
        </div>

        <div
          class="q-pt-lg row items-start justify-between q-col-gutter-lg q-col-gutter-lg-xl"
        >
          <div
            v-if="dashboardView.includes('auditChart')"
            class="col-12 col-md-4"
          >
            <audit-chart></audit-chart>
          </div>
          <div
            v-if="dashboardView.includes('auditChartCounsellor')"
            class="col-12 col-md-4"
          >
            <audit-chart-counsellor></audit-chart-counsellor>
          </div>

          <div
            v-if="dashboardView.includes('auditChartCounsellorTl')"
            class="col-12 col-md-4"
          >
            <audit-chart-counsellor-tl></audit-chart-counsellor-tl>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex';
import jwt_decode from 'jwt-decode';

import _ from 'lodash';
import AuditChartCounsellor from 'src/components/AuditChartCounsellor.vue';
export default {
  data() {
    return {
      todaysCount: {
        text: 'Audit done Today',
        count: 3,
        color: 'light-blue-6',
      },
      todaysRemaining: {
        text: "Today's target remaining",
        count: 8,
        color: 'yellow-8',
      },

      todaysTarget: 0,
      dashboardView: [],
      clockInTime: '',
      allReports: [],
      reports: [],
      failReports: [],
      pieChartData: [],
    };
  },
  components: {
    recentAudits: () => import('components/RecentAudits.vue'),
    timeClock: () => import('components/TimeClock.vue'),
    auditCount: () => import('components/AuditCount.vue'),
    auditChart: () => import('components/AuditChart.vue'),
    auditChartCounsellor: () => import('components/AuditChartCounsellor.vue'),
    auditChartCounsellorTl: () =>
      import('components/AuditChartCounsellorTl.vue'),
    auditChartPie: () => import('components/AuditChartPie.vue'),
  },

  methods: {
    ...mapActions('dataStore', ['fetchData']),
  },
  computed: {
    pieData() {
      return this.pieChartData;
    },
  },
  mounted() {
    const user = localStorage.getItem('access-token');
    if (user) {
      const userDetails = jwt_decode(user);
      this.permissions = userDetails.permissions;

      // if (this.permissions.includes('admin')) {
      this.$axios({
        url: `${process.env.API_URL}/getUser/${userDetails.id}`,
        method: 'GET',

        headers: {
          authorization: `Bearer${localStorage.getItem('access-token')}`,
        },
      })
        .then(res => {
          console.log('users ', res);
          const data = res.data.user;

          this.user = data.name;
          this.dashboardView = data.dashboardView;
          this.todaysTarget = data.todaysTarget ? data.todaysTarget : 0;
          console.log('user ', this.user);
          // this.user.id = doc.id;
          // if (doc.data().clockInTime) {
          //   this.user.clockInTime = doc
          //     .data()
          //     .clockInTime.toDate()
          //     .toLocaleTimeString();
          // }
        })
        .catch(err => {
          console.log('error ', err);
        });
      // }

      this.$axios({
        url: `${process.env.API_URL}/report/allRecentReports/10`,
        method: 'GET',

        headers: {
          authorization: `Bearer${localStorage.getItem('access-token')}`,
        },
      }).then(res => {
        console.log('response ', res);

        this.allReports = res.data.reports;
        this.reports = this.allReports;
      });

      this.$axios({
        url: `${process.env.API_URL}/report/allRecentReports/10/fail`,
        method: 'GET',

        headers: {
          authorization: `Bearer${localStorage.getItem('access-token')}`,
        },
      }).then(res => {
        console.log('response ', res);

        this.failReports = res.data.reports;
        // this.failReports = this.allReports;
      });

      this.$axios({
        url: `${
          process.env.API_URL
        }/report/allReports/${new Date().getMonth()}`,
        method: 'GET',

        headers: {
          authorization: `Bearer${localStorage.getItem('access-token')}`,
        },
      }).then(res => {
        console.log('response ', res);

        const today = new Date();
        const yesterDay = today.setDate(today.getDate() - 1);
        const tomorrow = today.setDate(today.getDate() + 1);
        this.todaysCount.count = 0;
        this.pieChartData = [0, 0];

        const now = new Date();

        res.data.reports.forEach(report => {
          report.createdAt = new Date(report.createdAt);
          console.log('report ', report.createdAt.getDate());
          if (report.result == 'F') this.pieChartData[1]++;
          else this.pieChartData[0]++;
          if (
            report.auditor == this.user &&
            report.createdAt.getDate() == now.getDate()
          ) {
            console.log('inside condition');
            this.todaysCount.count++;
          }
        });
        console.log(
          'todays count after iterating each report ',
          this.todaysCount.count
        );
        console.log('pieChartData ', this.pieChartData);
        this.todaysRemaining.count = this.todaysTarget - this.todaysCount.count;
      });
    }

    // this.$auth.onAuthStateChanged(async user => {
    //   const today = new Date();
    //   const yesterDay = today.setDate(today.getDate() - 1);
    //   const tomorrow = today.setDate(today.getDate() + 1);
    //   this.todaysCount.count = 0;
    //   if (user) {
    //     const currentUser = this.$auth.currentUser;

    //     console.log('current user ', currentUser.uid);

    //     // this.fetchData({});

    //     console.log('counsellors array');

    //     // this.$firestore
    //     //   .collection('users')
    //     //   .doc(currentUser.uid)
    //     //   .onSnapshot(doc => {
    //     //     const data = doc.data();
    //     //     this.dashboardView = data.dashboardView;
    //     //     if (data.clockInTime) {
    //     //       this.clockInTime = data.clockInTime.toDate().toLocaleTimeString();
    //     //     }
    //     //     console.log(
    //     //       'dashboard components visible to the user',
    //     //       this.dashboardView
    //     //     );
    //     //   });

    //     this.$firestore
    //       .collection('users')
    //       .doc(currentUser.uid)
    //       .onSnapshot(doc => {
    //         const data = doc.data();

    //         this.todaysTarget = parseInt(data.todaysTarget);
    //         console.log('inside mount todaysTarget ', this.todaysTarget);

    //         this.dashboardView = data.dashboardView;
    //         if (data.clockInTime) {
    //           this.clockInTime = data.clockInTime.toDate().toLocaleTimeString();
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
    //             .orderBy('createdAt', 'desc')
    //             .limit(10)
    //             .onSnapshot(querySnapshot => {
    //               this.allReports = [];
    //               querySnapshot.forEach(doc => {
    //                 this.allReports.push({ ...doc.data(), id: doc.id });
    //                 // console.log('data ', doc.data());
    //                 this.reports = this.allReports;
    //               });
    //             });
    //         } else {
    //           if (this.permissions.includes('viewMy')) {
    //             let localReport = [];
    //             //   console.log('doc data in viewAll else ', doc.data());
    //             //   console.log('this.role ', this.role);
    //             //   console.log('this.name ', this.name);
    //             //   const role = this.role
    //             //     .toLowerCase()
    //             //     .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => {
    //             //       return chr.toUpperCase();
    //             //     }); //convert role seperated wiht space into a camel cased string

    //             //   console.log('role ', role);

    //             //   if (doc.data().counsellor == this.name) {
    //             //     this.allReports.push({ ...doc.data(), id: doc.id });
    //             // console.log('data ', doc.data());

    //             this.$firestore
    //               .collection('reports')
    //               //   .where(this.role, '==', this.name)
    //               .orderBy('createdAt', 'desc')
    //               .where(this.role, '==', this.name)
    //               .limit(10)
    //               .onSnapshot(querySnapshot => {
    //                 // this.allReports = [];
    //                 querySnapshot.forEach(doc => {
    //                   this.allReports = _.union(this.allReports, [
    //                     { ...doc.data(), id: doc.id },
    //                   ]);

    //                   if (
    //                     doc.data().createdAt > yesterDay &&
    //                     doc.data().createdAt < tomorrow
    //                   ) {
    //                     this.todaysCount.count++;
    //                   }
    //                 });
    //                 this.reports = _.union(this.reports, this.allReports);

    //                 this.todaysRemaining.count =
    //                   this.todaysTarget - this.todaysCount.count;
    //                 console.log('fkasdfj ', this.todaysTarget);
    //               });
    //           }

    //           if (this.permissions.includes('viewTl')) {
    //             //   if (doc.data().teamLead == this.name) {
    //             //     this.allReports.push({ ...doc.data(), id: doc.id });
    //             //     console.log('data ', doc.data());

    //             this.$firestore
    //               .collection('reports')
    //               //   .where(this.role, '==', this.name)
    //               .orderBy('createdAt', 'desc')
    //               .where('teamLead', '==', this.name)
    //               .limit(10)
    //               .onSnapshot(querySnapshot => {
    //                 // this.allReports = [];
    //                 querySnapshot.forEach(doc => {
    //                   //   this.allReports.push({ ...doc.data(), id: doc.id });
    //                   this.allReports = _.union(this.allReports, [
    //                     { ...doc.data(), id: doc.id },
    //                   ]);

    //                   //   this.reports = this.allReports;
    //                 });
    //                 this.reports = _.union(this.reports, this.allReports);
    //               });
    //           }

    //           if (this.permissions.includes('viewSm')) {
    //             //   if (doc.data().seniorManager == this.name) {
    //             //     this.allReports.push({ ...doc.data(), id: doc.id });
    //             //     console.log('data ', doc.data());
    //             this.$firestore
    //               .collection('reports')
    //               //   .where(this.role, '==', this.name)
    //               .orderBy('createdAt', 'desc')
    //               .where('seniorManager', '==', this.name)
    //               .limit(10)
    //               .onSnapshot(querySnapshot => {
    //                 this.allReports = [];
    //                 querySnapshot.forEach(doc => {
    //                   //   this.allReports.push({ ...doc.data(), id: doc.id });
    //                   this.allReports = _.union(this.allReports, [
    //                     { ...doc.data(), id: doc.id },
    //                   ]);
    //                 });
    //                 this.reports = _.union(this.reports, this.allReports);

    //                 // this.reports = this.allReports;
    //               });
    //           }
    //         }
    //       });
    //   }
    // });
  },
};
</script>

<style></style>
