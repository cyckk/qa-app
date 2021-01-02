<template>
  <!-- <div class="q-pa-md row items-center q-gutter-md"> -->
  <q-card class="bg-grey-2 my-card">
    <q-card-section class="bg-purple-8">
      <div class="row items-center no-wrap ">
        <div class="col">
          <div class="text-h6 text-white">{{ title }}</div>
          <!-- <div class="text-subtitle2">by John Doe</div> -->
        </div>

        <div v-if="!title.includes('Fail')" class="col-auto">
          <q-btn
            @click="showAllAudits"
            color="grey-3"
            round
            flat
            icon="visibility"
          >
          </q-btn>
        </div>
      </div>
    </q-card-section>

    <q-separator dark inset />

    <q-card-section class="report-view text-grey-10 q-pa-none">
      <q-list padding class="rounded-borders" style="width: 100%">
        <!-- <q-item-label header>Recent Audits</q-item-label> -->

        <q-item
          v-for="(report, index) in reports"
          :key="index"
          clickable
          v-ripple
          :to="{ name: 'Report', params: { id: report._id } }"
        >
          <q-item-section avatar top>
            <q-avatar
              rounded
              size="md"
              icon="grading"
              color="orange-5"
              text-color="white"
            />
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">{{
              report.counselor == 'NA' ? report.teamLead : report.counselor
            }}</q-item-label>
            <q-item-label caption>{{
              new Date(report.createdAt).toLocaleString()
            }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-badge
              :color="report.result == 'F' ? 'deep-orange-5' : 'green-5'"
            >
              {{ report.result != 'F' ? `${report.result}%` : report.result }}
            </q-badge>
          </q-item-section>
        </q-item>

        <!-- <q-separator></q-separator> -->

        <!-- <q-separator spaced /> -->
      </q-list>
    </q-card-section>
  </q-card>
  <!-- </div> -->
</template>

<script>
import moment from 'moment';
export default {
  props: ['reports', 'title'],
  data() {
    return {
      //   reports: [],
    };
  },
  methods: {
    getRecentReports() {
      //   this.reports = [];
      this.$auth.onAuthStateChanged(user => {
        if (user) {
          let currentUser = this.$auth.currentUser;

          //   console.log(currentUser);

          //   this.$firestore
          //     .collection('users')
          //     .doc(currentUser.uid)
          //     .onSnapshot(doc => {
          //       this.role = doc.data().role;
          //       this.name = doc.data().name;
          //       this.permissions = doc.data().permissions;
          //       console.log('pers ', this.permissions);

          //       this.$firestore
          //         .collection('reports')
          //         //   .where(this.role, '==', this.name)
          //         .orderBy('createdAt')

          //         .onSnapshot(querySnapshot => {
          //           this.reports = [];
          //           let full = false;

          //           querySnapshot.forEach(doc => {
          //             if (full) return false;
          //             //   if(this.role == 'auditor') {

          //             //   }
          //             if (
          //               this.permissions.includes('viewAll') ||
          //               this.permissions.includes('admin')
          //             ) {
          //               this.reports.push({ ...doc.data(), id: doc.id });
          //               if (this.reports.length == 10) {
          //                 full = true;
          //               }
          //               //   console.log('data ', doc.data());
          //             } else {
          //               if (this.permissions.includes('viewMy')) {
          //                 console.log('doc data in viewAll else ', doc.data());
          //                 console.log('this.role ', this.role);
          //                 console.log('this.name ', this.name);
          //                 const role = this.role
          //                   .toLowerCase()
          //                   .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => {
          //                     return chr.toUpperCase();
          //                   }); //convert role seperated wiht space into a camel cased string

          //                 console.log('role ', role);

          //                 if (doc.data().counsellor == this.name) {
          //                   this.reports.push({ ...doc.data(), id: doc.id });
          //                   if (this.reports.length == 10) {
          //                     full = true;
          //                   }
          //                   //
          //                   console.log('data ', doc.data());
          //                 }
          //               }

          //               if (this.permissions.includes('viewTl')) {
          //                 if (doc.data().teamLead == this.name) {
          //                   this.reports.push({ ...doc.data(), id: doc.id });
          //                   if (this.reports.length == 10) {
          //                     full = true;
          //                   }
          //                   //
          //                   console.log('data ', doc.data());
          //                 }
          //               }

          //               if (this.permissions.includes('viewSm')) {
          //                 if (doc.data().seniorManager == this.name) {
          //                   this.reports.push({ ...doc.data(), id: doc.id });
          //                   if (this.reports.length == 10) {
          //                     full = true;
          //                   }
          //                   //
          //                   console.log('data ', doc.data());
          //                 }
          //               }
          //             }
          //           });
          //         });
          //     });

          //   this.$firestore
          //     .collection('users')
          //     .doc(currentUser.uid)
          //     .onSnapshot(doc => {
          //       this.role = doc.data().role;
          //       this.name = doc.data().name;
          //       this.permissions = doc.data().permissions;
          //       console.log('pers ', this.permissions);

          //       if (
          //         this.permissions.includes('viewAll') ||
          //         this.permissions.includes('admin')
          //       ) {
          //         this.$firestore
          //           .collection('reports')
          //           //   .where(this.role, '==', this.name)
          //           .orderBy('createdAt')
          //           .limit(10)
          //           .onSnapshot(querySnapshot => {
          //             this.allReports = [];
          //             querySnapshot.forEach(doc => {
          //               this.allReports.push({ ...doc.data(), id: doc.id });
          //               // console.log('data ', doc.data());
          //               this.reports = this.allReports;
          //             });
          //           });
          //       } else {
          //         if (this.permissions.includes('viewMy')) {
          //           //   console.log('doc data in viewAll else ', doc.data());
          //           //   console.log('this.role ', this.role);
          //           //   console.log('this.name ', this.name);
          //           //   const role = this.role
          //           //     .toLowerCase()
          //           //     .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => {
          //           //       return chr.toUpperCase();
          //           //     }); //convert role seperated wiht space into a camel cased string

          //           //   console.log('role ', role);

          //           //   if (doc.data().counsellor == this.name) {
          //           //     this.allReports.push({ ...doc.data(), id: doc.id });
          //           // console.log('data ', doc.data());

          //           this.$firestore
          //             .collection('reports')
          //             //   .where(this.role, '==', this.name)
          //             .orderBy('createdAt')
          //             .where(this.role, '==', this.name)
          //             .limit(10)
          //             .onSnapshot(querySnapshot => {
          //               this.allReports = [];
          //               querySnapshot.forEach(doc => {
          //                 this.allReports.push({ ...doc.data(), id: doc.id });

          //                 this.reports = this.allReports;
          //               });
          //             });
          //         }

          //         if (this.permissions.includes('viewTl')) {
          //           //   if (doc.data().teamLead == this.name) {
          //           //     this.allReports.push({ ...doc.data(), id: doc.id });
          //           //     console.log('data ', doc.data());

          //           this.$firestore
          //             .collection('reports')
          //             //   .where(this.role, '==', this.name)
          //             .orderBy('createdAt')
          //             .where('teamLead', '==', this.name)
          //             .limit(10)
          //             .onSnapshot(querySnapshot => {
          //               this.allReports = [];
          //               querySnapshot.forEach(doc => {
          //                 this.allReports.push({ ...doc.data(), id: doc.id });

          //                 this.reports = this.allReports;
          //               });
          //             });
          //         }

          //         if (this.permissions.includes('viewSm')) {
          //           //   if (doc.data().seniorManager == this.name) {
          //           //     this.allReports.push({ ...doc.data(), id: doc.id });
          //           //     console.log('data ', doc.data());
          //           this.$firestore
          //             .collection('reports')
          //             //   .where(this.role, '==', this.name)
          //             .orderBy('createdAt')
          //             .where('seniorManager', '==', this.name)
          //             .limit(10)
          //             .onSnapshot(querySnapshot => {
          //               this.allReports = [];
          //               querySnapshot.forEach(doc => {
          //                 this.allReports.push({ ...doc.data(), id: doc.id });
          //               });
          //               this.reports = this.allReports;
          //             });
          //         }
          //       }
          //     });
        }
      });
    },

    showAllAudits() {
      this.$router.push('/reports');
    },
  },

  mounted() {
    this.getRecentReports();
    // console.log('reports ', this.reports);
  },
};
</script>

<style scoped>
.report-view {
  height: 300px;
  overflow: auto;
}
</style>
