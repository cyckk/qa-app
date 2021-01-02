<template>
  <q-page class="q-pa-lg q-pa-md-xl bg-grey-2">
    <div
      class="user-view q-pb-lg q-pt-lg"
      style="border-bottom: 1px solid grey;"
    >
      <q-item>Dashboard View for {{ user }}:</q-item>
      <div class=" row items-center justify-center q-col-gutter-lg">
        <div
          v-if="dashboardView.includes('clock')"
          @click="removeWidget('clock')"
          :clockInTime="0"
          class="col-12 col-sm-4"
        >
          <time-clock></time-clock>
        </div>
        <div
          v-if="dashboardView.includes('auditDone')"
          @click="removeWidget('auditDone')"
          class="col-12 col-sm-4"
        >
          <audit-count :cardData="todaysCount"></audit-count>
        </div>
        <div
          v-if="dashboardView.includes('targetAudits')"
          @click="removeWidget('targetAudits')"
          class="col-12 col-sm-4"
        >
          <audit-count :cardData="todaysRemaining"></audit-count>
        </div>
      </div>

      <div class="q-pt-lg row items-start justify-between q-col-gutter-lg">
        <div
          v-if="dashboardView.includes('recentAuditsPass')"
          @click="removeWidget('recentAuditsPass')"
          class="col-12 col-sm-5"
        >
          <recent-audits :title="'Recent Audits'"></recent-audits>
        </div>

        <div
          v-if="dashboardView.includes('recentAuditsFail')"
          @click="removeWidget('recentAuditsFail')"
          class="col-12 col-sm-5"
        >
          <recent-audits :title="'Recent Fail Audits'"></recent-audits>
        </div>
        <div
          v-if="dashboardView.includes('pieChart')"
          @click="removeWidget('pieChart')"
          class="col-auto"
        >
          <audit-chart-pie></audit-chart-pie>
        </div>

        <div class="q-pt-lg row items-start justify-between q-col-gutter-lg">
          <div
            v-if="dashboardView.includes('auditChart')"
            @click="removeWidget('auditChart')"
            class="col-auto"
          >
            <audit-chart></audit-chart>
          </div>

          <div
            v-if="dashboardView.includes('auditChartCounsellor')"
            @click="removeWidget('auditChartCounsellor')"
            class="col-12 col-md-6"
          >
            <audit-chart-counsellor></audit-chart-counsellor>
          </div>

          <div
            v-if="dashboardView.includes('auditChartCounsellorTl')"
            @click="removeWidget('auditChartCounsellorTl')"
            class="col-12 col-md-6"
          >
            <audit-chart-counsellor-tl></audit-chart-counsellor-tl>
          </div>
        </div>
      </div>
    </div>

    <!-- Remaining dashboard widgets  -->
    <div
      class="user-view q-pb-lg q-pt-lg"
      style="border-bottom: 1px solid grey;"
    >
      <q-item>Remaining components:</q-item>
      <div class=" row items-center justify-center q-col-gutter-lg">
        <div
          v-if="!dashboardView.includes('clock')"
          @click="addWidget('clock')"
          :clockInTime="0"
          class="col-12 col-sm-4"
        >
          <time-clock></time-clock>
        </div>
        <div
          v-if="!dashboardView.includes('auditDone')"
          @click="addWidget('auditDone')"
          class="col-12 col-sm-4"
        >
          <audit-count :cardData="todaysCount"></audit-count>
        </div>
        <div
          v-if="!dashboardView.includes('targetAudits')"
          @click="addWidget('targetAudits')"
          class="col-12 col-sm-4"
        >
          <audit-count :cardData="todaysRemaining"></audit-count>
        </div>
      </div>

      <div class="q-pt-lg row items-start justify-between q-col-gutter-lg">
        <div
          v-if="!dashboardView.includes('recentAuditsPass')"
          @click="addWidget('recentAuditsPass')"
          class="col-12 col-sm-5"
        >
          <recent-audits :title="'Recent Audits'"></recent-audits>
        </div>

        <div
          v-if="!dashboardView.includes('recentAuditsFail')"
          @click="addWidget('recentAuditsFail')"
          class="col-12 col-sm-5"
        >
          <recent-audits :title="'Recent Fail Audits'"></recent-audits>
        </div>
        <div
          v-if="!dashboardView.includes('pieChart')"
          @click="addWidget('pieChart')"
          class="col-auto"
        >
          <audit-chart-pie></audit-chart-pie>
        </div>

        <div class="q-pt-lg row items-start justify-between q-col-gutter-lg">
          <div
            v-if="!dashboardView.includes('auditChart')"
            @click="addWidget('auditChart')"
            class="col-auto"
          >
            <audit-chart></audit-chart>
          </div>
          <div
            v-if="!dashboardView.includes('auditChartCounsellor')"
            @click="addWidget('auditChartCounsellor')"
            class="col-12 col-md-6"
          >
            <audit-chart-counsellor></audit-chart-counsellor>
          </div>

          <div
            v-if="!dashboardView.includes('auditChartCounsellorTl')"
            @click="addWidget('auditChartCounsellorTl')"
            class="col-12 col-md-6"
          >
            <audit-chart-counsellor-tl></audit-chart-counsellor-tl>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import Chart from 'chart.js';
import firebase from 'firebase';
import jwt_decode from 'jwt-decode';
export default {
  data() {
    return {
      todaysCount: {
        text: 'Audit done Today',
        count: 3,
        color: 'green-6',
      },
      todaysRemaining: {
        text: "Today's target remaining",
        count: 8,
        color: 'orange',
      },
      dashboardView: [],
      clockInTime: '',
      id: null,
      user: null,
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
    addWidget(name) {
      this.setDashboard(name, 'add');
    },
    removeWidget(name) {
      this.setDashboard(name, 'delete');
    },

    setDashboard(name, operation) {
      this.$axios({
        url: `${process.env.API_URL}/setDashboard`,
        method: 'PUT',
        data: {
          user: {
            id: this.id,
            dashboardItem: name,
            operation: operation,
          },
        },

        headers: {
          authorization: `Bearer${localStorage.getItem('access-token')}`,
        },
      })
        .then(res => {
          console.log('response ', res);
          const data = res.data.user;
          this.user = data.name;
          this.dashboardView = data.dashboardView;

          console.log(
            'dashboard components visible to the user',
            this.dashboardView
          );
        })
        .catch(err => {
          console.log('error ', err);
        });
    },
  },
  mounted() {
    this.id = this.$route.params.id;

    const user = localStorage.getItem('access-token');
    if (user) {
      const userDetails = jwt_decode(user);
      this.permissions = userDetails.permissions;

      if (this.permissions.includes('admin')) {
        this.$axios({
          url: `${process.env.API_URL}/getUser/${this.id}`,
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
      }
    }
  },
};
</script>

<style></style>
