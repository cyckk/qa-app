<template>
  <q-page class="flex row q-pa-lg q-pa-md-xl justify-center">
    <q-drawer
      overlay
      elevated
      v-model="filterDialog"
      :show-if-above="false"
      side="right"
      style=""
      :width="400"
    >
      <q-card square flat style="">
        <q-bar class="bg-grey-4">
          <q-space />

          <!-- <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn> -->
          <q-btn
            dense
            flat
            icon="close"
            v-close-popup
            @click="filterDialog = false"
          >
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <!-- <q-linear-progress :value="0.6" color="pink" /> -->

        <q-card-section class="">
          <div>
            <div class="text-weight-bold q-pb-sm">Filter By:</div>
            <!-- <div class="text-grey">Fitz & The Tantrums</div> -->
          </div>
          <div class="row justify-between items-center q-mb-sm ">
            <div class="col-5 q-pl-sm">
              <q-select
                filled
                v-model="filterTermOne"
                :options="filterOptions"
                label="Filter By"
                style=""
              />
            </div>

            <div class="col-5 q-pl-sm">
              <q-select
                filled
                v-model="searchTermC"
                use-chips
                use-input
                multiple
                :options="
                  filterTermOne == 'Counselor'
                    ? counselors
                    : filterTermOne == 'Team Lead'
                    ? teamLeads
                    : filterTermOne == 'Senior Manager'
                    ? seniorManagers
                    : filterTermOne == 'Auditor'
                    ? auditors
                    : result
                "
                @add="val => addToSearchTerm(val, filterTermOne)"
                @remove="val => removeFromSearchTerm(val, filterTermOne)"
                @filter="(val, update) => filterFn(val, update, filterTermOne)"
                :label="filterTermOne"
                style=""
              />
              <!-- <q-option>
                <q-range
                  v-model="rangeSnap"
                  :min="0"
                  :max="100"
                  :step="10"
                  drag-range
                  label
                  markers
                  snap
                  color="lime"
              /></q-option> -->
              <!-- </q-select> -->
            </div>
            <div class="col-2 q-pl-sm">
              <q-btn
                round
                dense
                icon="add"
                color="green"
                @click="filterTwo = true"
              />
            </div>
          </div>

          <div
            v-if="filterTwo"
            class="row justify-between items-center q-mb-sm"
          >
            <div class="col-5 q-pl-sm">
              <q-select
                filled
                v-model="filterTermTwo"
                :options="filterOptions"
                label="Filter By"
                style=""
              />
            </div>

            <div class="col-5 q-pl-sm">
              <q-select
                filled
                v-model="searchTermTl"
                use-chips
                use-input
                multiple
                :options="
                  filterTermTwo == 'Counselor'
                    ? counselors
                    : filterTermTwo == 'Team Lead'
                    ? teamLeads
                    : filterTermTwo == 'Senior Manager'
                    ? seniorManagers
                    : filterTermTwo == 'Auditor'
                    ? auditors
                    : result
                "
                @add="val => addToSearchTerm(val, filterTermTwo)"
                @remove="val => removeFromSearchTerm(val, filterTermTwo)"
                @filter="(val, update) => filterFn(val, update, filterTermTwo)"
                :label="filterTermTwo"
                style=""
              />
            </div>
            <div class="col-2 q-pl-sm">
              <q-btn
                round
                dense
                icon="add"
                color="green"
                @click="filterThree = true"
              />
            </div>
          </div>

          <div
            v-if="filterThree"
            class="row justify-between items-center q-mb-sm"
          >
            <div class="col-5 q-pl-sm">
              <q-select
                filled
                v-model="filterTermThree"
                :options="filterOptions"
                label="Filter By"
                style=""
              />
            </div>

            <div class="col-5 q-pl-sm">
              <q-select
                filled
                v-model="searchTermSm"
                use-chips
                use-input
                multiple
                :options="
                  filterTermThree == 'Counselor'
                    ? counselors
                    : filterTermThree == 'Team Lead'
                    ? teamLeads
                    : filterTermThree == 'Senior Manager'
                    ? seniorManagers
                    : filterTermThree == 'Auditor'
                    ? auditors
                    : result
                "
                @add="val => addToSearchTerm(val, filterTermThree)"
                @remove="val => removeFromSearchTerm(val, filterTermThree)"
                @filter="
                  (val, update) => filterFn(val, update, filterTermThree)
                "
                :label="filterTermThree"
                style=""
              />
            </div>
            <div class="col-2 q-pl-sm">
              <q-btn
                round
                dense
                icon="add"
                color="green"
                @click="filterFour = true"
              />
            </div>
          </div>

          <div
            v-if="filterFour"
            class="row justify-between items-center q-mb-sm"
          >
            <div class="col-5 q-pl-sm">
              <q-select
                filled
                v-model="filterTermFour"
                :options="filterOptions"
                label="Filter By"
                style=""
              />
            </div>

            <div class="col-5 q-pl-sm">
              <q-select
                filled
                v-model="searchTermA"
                use-chips
                use-input
                multiple
                :options="
                  filterTermFour == 'Counselor'
                    ? counselors
                    : filterTermFour == 'Team Lead'
                    ? teamLeads
                    : filterTermFour == 'Senior Manager'
                    ? seniorManagers
                    : filterTermFour == 'Auditor'
                    ? auditors
                    : result
                "
                @add="val => addToSearchTerm(val, filterTermFour)"
                @remove="val => removeFromSearchTerm(val, filterTermFour)"
                @filter="(val, update) => filterFn(val, update, filterTermFour)"
                :label="filterTermFour"
                style=""
              />
            </div>
            <div class="col-2 q-pl-sm">
              <q-btn
                round
                dense
                icon="add"
                color="green"
                @click="filterFive = true"
              />
            </div>
          </div>

          <div
            v-if="filterFive"
            class="row justify-between items-center q-mb-sm"
          >
            <div class="col-5 q-pl-sm">
              <q-select
                filled
                v-model="filterTermFive"
                :options="filterOptions"
                label="Filter By"
                style=""
              />
            </div>

            <div class="col-5 q-pl-sm">
              <q-select
                filled
                v-model="searchTermR"
                use-chips
                multiple
                :options="
                  filterTermFive == 'Counselor'
                    ? counselors
                    : filterTermFive == 'Team Lead'
                    ? teamLeads
                    : filterTermFive == 'Senior Manager'
                    ? seniorManagers
                    : filterTermFive == 'Auditor'
                    ? auditors
                    : result
                "
                @add="val => addToSearchTerm(val, filterTermFive)"
                @remove="val => removeFromSearchTerm(val, filterTermFive)"
                :label="filterTermFive"
                style=""
              />
            </div>
            <!-- <div class="col-2 q-pl-sm">
              <q-btn
                round
                dense
                icon="add"
                color="green"
                @click="filterFour = true"
              />
            </div> -->
          </div>

          <!-- </div> -->

          <!-- <q-space />

          <q-btn flat round icon="fast_rewind" />
          <q-btn flat round icon="pause" />
          <q-btn flat round icon="fast_forward" /> -->
        </q-card-section>

        <q-card-section class="q-pa-lg">
          <!-- <q-space></q-space> -->
          <div class="row justify-between">
            <!-- <q-sapce></q-sapce> -->
            <q-btn
              side
              label="Reset"
              icon="refresh"
              color="red"
              @click="resetFilter"
            />
            <q-btn
              side
              label="Apply"
              icon="filter_alt"
              color="green"
              @click="applyFilter"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-drawer>
    <div class="audit-report col-12 col-lg-8">
      <q-card class="my-card q-mt-md" flat bordered>
        <div
          class="row q-pa-sm q-pl-lg q-pr-lg justify-between items-center q-mt-md q-mb-sm"
        >
          <div class="text-h6">
            Audit Reports List
          </div>
          <div>
            <q-btn
              v-if="permissions.includes('add')"
              class="q-ml-xs"
              padding="xs md"
              color="red-5"
              icon="note_add"
              label="New Audit"
              @click="pushRoute('/form')"
            ></q-btn>
          </div>
        </div>
        <!-- <q-input
          class="q-ma-xs q-mb-md"
          v-model="searchTerm"
          debounce="500"
          outlined
          dense
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
            <!-- <q-btn icon="search" @click="search" flat></q-btn> -->
        <!-- </template>
        </q-input> -->

        <div class="row  q-mb-md q-mt-sm">
          <q-space></q-space>
          <q-select
            class="col-3 q-mr-sm"
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
            <!-- <template v-slot:append>
          <q-icon name="event" color="orange" />
        </template> -->
          </q-select>
          <q-btn
            class="q-mr-md"
            label="Filter"
            icon="filter_alt"
            color="primary"
            @click="filterDialog = !filterDialog"
          />
        </div>

        <!-- <div class="row">
          <div class="col-auto q-pl-sm" style="width: 20%">
            <q-select
              filled
              v-model="searchTermC"
              use-chips
              multiple
              :options="counselors"
              @add="val => addToSearchTerm(val, 'counsellor')"
              @remove="val => removeFromSearchTerm(val, 'counsellor')"
              label="Counsellor"
              style=""
            />
          </div>
          <div class="col-auto q-pl-sm" style="width: 20%">
            <q-select
              filled
              v-model="searchTermTl"
              multiple
              use-chips
              :options="teamLeads"
              @add="val => addToSearchTerm(val, 'teamLead')"
              @remove="val => removeFromSearchTerm(val, 'teamLead')"
              label="Team Lead"
              style=""
            />
          </div>
          <div class="col-auto q-pl-sm" style="width: 20%">
            <q-select
              filled
              v-model="searchTermSm"
              multiple
              use-chips
              :options="seniorManagers"
              @add="val => addToSearchTerm(val, 'seniorManager')"
              @remove="val => removeFromSearchTerm(val, 'seniorManager')"
              label="Senior Manager"
              style=""
            />
          </div>
          <div class="col-auto q-pl-sm" style="width: 20%">
            <q-select
              filled
              v-model="searchTermA"
              multiple
              use-chips
              :options="auditors"
              @add="val => addToSearchTerm(val, 'auditor')"
              @remove="val => removeFromSearchTerm(val, 'auditor')"
              label="Auditor"
              style=""
            />
          </div>
          <div class="col-auto q-pl-sm q-pr-sm" style="width: 20%">
            <q-select
              filled
              v-model="searchTermR"
              multiple
              use-chips
              :options="result"
              label="Result"
            />
          </div>
        </div> -->

        <table class="table table-bordered table-striped table-hover">
          <thead>
            <tr class="text-subtitle6 text-left">
              <th class="q-pl-md">#</th>
              <th>Counselor</th>
              <th>Team Lead</th>
              <th>Senior Manager</th>
              <th>Auditor</th>
              <th>Result</th>
              <!-- <th>Permissions</th> -->
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(report, index) in reports" :key="index">
              <th scope="row" class="col-1">{{ index + 1 }}</th>
              <td style="">
                {{
                  report.counselor == 'NA'
                    ? `${report.teamLead}`
                    : `${report.counselor} `
                }}
              </td>
              <td style="">
                {{ `${report.teamLead}` }}
              </td>
              <td style="">
                {{ `${report.seniorManager}` }}
              </td>
              <td style="">
                {{ report.auditor }}
              </td>
              <td>
                <q-badge
                  :color="report.result == 'F' ? 'deep-orange-5' : 'green-4'"
                >
                  {{
                    report.result != 'F' ? `${report.result}%` : report.result
                  }}
                </q-badge>
              </td>
              <td class="text-center">
                <q-btn color="" icon="settings" flat>
                  <q-menu :offset="[-50, 10]">
                    <q-list style="min-width: 100px">
                      <q-item
                        clickable
                        v-close-popup
                        :to="{ name: 'Report', params: { id: report._id } }"
                      >
                        <q-item-section>View</q-item-section>
                      </q-item>
                      <q-item
                        :disable="!permissions.includes('edit')"
                        clickable
                        v-close-popup
                        :to="{ name: 'Form', params: { id: report._id } }"
                      >
                        <q-item-section>Edit</q-item-section>
                      </q-item>
                      <q-item
                        clickable
                        v-close-popup
                        @click="generateReport(report._id)"
                      >
                        <q-item-section>
                          <!-- <q-icon
                            name="save_alt"
                            aria-label="Download"
                          ></q-icon> -->
                          Download</q-item-section
                        >
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>

                <!-- <q-btn
                  size="sm"
                  padding="xs md"
                  color="primary"
                  icon="visibility"
                  label="View"
                  :to="{ name: 'Report', params: { id: report.id } }"
                ></q-btn> -->

                <!-- <q-btn
                  :disable="!permissions.includes('edit')"
                  size="sm"
                  padding="xs md"
                  class="q-ml-xs"
                  color="orange"
                  icon="edit"
                  label="Edit"
                  :to="{ name: 'Form', params: { id: report.id } }"
                ></q-btn> -->

                <!-- <form action="http://localhost:3000/api" method="GET">
                  <input type="hidden" name="url" :value="report.id" /> -->
                <!-- <q-btn
                  :loading="downloadLoading"
                  size="sm"
                  padding="xs md"
                  class="q-ml-xs"
                  color="secondary"
                  icon="save_alt"
                  label="Download"
                  type="submit"
                  @click="getReport(report.id)"
                ></q-btn> -->
                <!-- </form> -->
              </td>
            </tr>
          </tbody>
        </table>
      </q-card>
    </div>
  </q-page>
</template>

<script>
// import puppeteer from 'puppeteer';
import { QSpinnerHourglass, QSpinnerPie } from 'quasar';
import _ from 'lodash';
import jwt_decode from 'jwt-decode';

export default {
  data() {
    return {
      reports: [],
      allReports: [],
      searchTerm: null,
      role: [],
      name: '',
      permissions: [],
      downloadLoading: false,
      allCounselors: ['Sonia', 'Yash', 'Nisha', 'Vaishali', 'Namita', 'Farhad'],
      allTeamLeads: ['Vandanesh', 'Nisha', 'Vaishali', 'Namita', 'Farhad'],
      allSeniorManagers: ['Shabd', 'Akhand'],
      allAuditors: [
        'Akanksha',
        'Sonia',
        'Nisha',
        'Vaishali',
        'Namita',
        'Farhad',
      ],
      result: ['Fail', 'Not Fail', '< 90', '< 75', '< 50', '< 25'],
      filterOptions: [
        'Counselor',
        'Team Lead',
        'Senior Manager',
        'Auditor',
        'Result',
      ],

      counselors: [],
      teamLeads: [],
      seniorManagers: [],
      auditors: [],

      searchTermC: null,
      searchTermTl: null,
      searchTermSm: null,
      searchTermA: null,
      searchTermR: null,

      searchArray: [],
      searchedByCounselor: [],
      searchedByTeamLead: [],
      searchedBySeniorManager: [],
      searchedByAuditor: [],
      searchedByResult: [],

      filterDialog: false,

      filterTwo: false,
      filterThree: false,
      filterFour: false,
      filterFive: false,

      filterTermOne: null,
      filterTermTwo: null,
      filterTermThree: null,
      filterTermFour: null,
      filterTermFive: null,

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
    //this method is responsible for making the request to the
    //backend api with the selected report id and donwloading
    //the report sent by server
    generateReport(id) {
      //   this.downloadLoading = true;
      console.log('app url ', process.env.APP_URL);
      this.$q.loading.show({
        delay: 400, // ms
        spinner: QSpinnerPie,
        spinnerColor: 'orange',
        spinnerSize: 140,
        backgroundColor: 'cyan-1',
        message: 'Generating report. Hang on...',
        messageColor: 'black',
      });
      this.$axios({
        url: `${process.env.API_URL}/pdf`,
        method: 'POST',
        responseType: 'blob',
        // params: { url: id },
        data: {
          url: `${process.env.APP_URL}reportView/${id}`,
        },
      }).then(res => {
        if (res.status == 200) {
          console.log('response ', res);
          let blob = new Blob([res.data]);
          console.log('blob object size ', blob.size);

          if (blob.size > 1000) {
            let fileURL = window.URL.createObjectURL(blob);
            console.log('file url ', fileURL);
            let fileLink = document.createElement('a');
            fileLink.href = fileURL;
            fileLink.download = 'report.pdf';
            fileLink.click();
            this.$q.loading.hide();
            //   this.downloadLoading = false;
          } else {
            this.$q.loading.hide();
            this.$q.notify({
              color: 'red-4',
              textColor: 'white',
              icon: 'warning',
              message: 'Something went wrong!! Try again',
            });
          }
        }
      });
    },

    pushRoute(route) {
      console.log('pushing to ', { name: route });
      this.$router
        .replace(route)
        .then(res => console.log('route pushed ', res));
    },

    filterFn(val, update, filterOn) {
      if (val === '') {
        update(() => {
          if (filterOn == 'Counselor') {
            this.counselors = this.allCounselors;
          }
          if (filterOn == 'Team Lead') {
            this.teamLeads = this.allTeamLeads;
          }
          if (filterOn == 'Senior Manager') {
            this.seniorManagers = this.allSeniorManagers;
          }
          if (filterOn == 'Auditors') {
            this.auditors = this.allAuditors;
          }

          // with Quasar v1.7.4+
          // here you have access to "ref" which
          // is the Vue reference of the QSelect
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();

        if (filterOn == 'Counselor') {
          this.counselors = this.allCounselors.filter(
            v => v.toLowerCase().indexOf(needle) > -1
          );
        }
        if (filterOn == 'Team Lead') {
          this.teamLeads = this.allTeamLeads.filter(
            v => v.toLowerCase().indexOf(needle) > -1
          );
        }
        if (filterOn == 'Senior Manager') {
          this.seniorManagers = this.allSeniorManagers.filter(
            v => v.toLowerCase().indexOf(needle) > -1
          );
        }
        if (filterOn == 'Auditors') {
          this.auditors = this.auditors.filter(
            v => v.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    },

    filterByCounsellor(searchTermArray) {
      console.log(
        'searchTermArray after adding to counsellor ',
        searchTermArray
      );
      let report = [];
      searchTermArray.forEach(searchTerm => {
        if (searchTerm.counselor) {
          console.log('search Term ', searchTerm);
          //   console.log('this.reports ', this.reports);
          report = _.filter(this.reports, searchTerm);
          console.log('report in counsellor loop ', report);
          this.searchedByCounselor = _.union(this.searchedByCounselor, report);
        }
      });

      this.reports = this.searchedByCounselor;

      console.log('this.report after filter ', this.reports);
    },

    filterByTeamLead(searchTermArray) {
      console.log(
        'searchTermArray after adding to counsellor ',
        searchTermArray
      );
      let report = [];
      searchTermArray.forEach(searchTerm => {
        if (searchTerm.teamLead) {
          console.log('search Term ', searchTerm);
          //   console.log('this.reports ', this.reports);
          report = _.filter(this.reports, searchTerm);
          this.searchedByTeamLead = _.union(this.searchedByTeamLead, report);
        }
      });

      this.reports = this.searchedByTeamLead;

      console.log('this.report after filter', this.reports);
    },

    filterBySeniorManager(searchTermArray) {
      console.log(
        'searchTermArray after adding to counsellor ',
        this.searchTermArray
      );
      let report = [];
      searchTermArray.forEach(searchTerm => {
        if (searchTerm.seniorManager) {
          console.log('search Term ', searchTerm);
          //   console.log('this.reports ', this.reports);
          report = _.filter(this.reports, searchTerm);
          this.searchedBySeniorManager = _.union(
            this.searchedBySeniorManager,
            report
          );
        }
      });

      this.reports = this.searchedBySeniorManager;

      console.log('this.report after filter', this.reports);
    },

    filterByAuditor(searchTermArray) {
      console.log(
        'searchTermArray after adding to counsellor ',
        this.searchTermArray
      );
      let report = [];
      searchTermArray.forEach(searchTerm => {
        if (searchTerm.auditor) {
          console.log('search Term ', searchTerm);
          //   console.log('this.reports ', this.reports);
          report = _.filter(this.reports, searchTerm);
          this.searchedByAuditor = _.union(this.searchedByAuditor, report);
        }
      });

      this.reports = this.searchedByAuditor;

      console.log('this.report after filter', this.reports);
    },

    filterByResult(searchTermArray) {
      console.log(
        'searchTermArray after adding to counsellor ',
        searchTermArray
      );
      let report = [];
      searchTermArray.forEach(searchTerm => {
        if (searchTerm.result) {
          console.log('search Term ', searchTerm);

          if (searchTerm.result == 'Fail') {
            //   searchTerm.result = 'F';
            report = this.reports.filter(report => {
              console.log('report ', report);
              return report.result == 'F';
            });
          } else if (searchTerm.result == 'Not Fail') {
            //   searchTerm.result = 'F';
            report = this.reports.filter(report => {
              return report.result != 'F';
            });
          } else {
            report = this.reports.filter(report => {
              if (report.result != 'F') {
                console.log('report.result ', _.split(searchTerm.result, ' '));
                console.log(
                  parseInt(report.result) <
                    parseInt(_.split(searchTerm.result, ' ')[1])
                );
                return (
                  parseInt(report.result) <
                  parseInt(_.split(searchTerm.result, ' ')[1])
                );
              }
            });
          }
          //   report = _.filter(this.reports, searchTerm);
          this.searchedByResult = _.union(this.searchedByResult, report);
        }
      });

      this.reports = this.searchedByResult;

      console.log('this.report after filter', this.reports);
    },

    addToSearchTerm(details, c) {
      c = _.camelCase(c);
      this.searchArray = _.union(this.searchArray, [{ [c]: details.value }]);
      console.log(
        'searchTermArray after adding to it ',
        this.searchArray,
        details,
        c
      );
      if (c == 'counselor') {
        // this.reports = [];
        console.log('searchTermC ', this.searchTermC);

        // if (this.searchTermC && this.searchTermC.length > 0) {
        //   console.log('searchTerm length greater than zero');
        //   this.reports = this.allReports;
        //   //   this.searchTermArray = this.searchTermC;
        //   this.searchTermTl = null;
        //   this.searchTermSm = null;
        //   this.searchTermA = null;
        // }

        // this.filterByCounsellor();
      }
      if (c == 'teamLead') {
        // if (!this.searchedByCounselor.length) {
        //   console.log(
        //     'searchedByCounselor length is zero',
        //     this.searchedByCounselor
        //   );
        //   this.reports = this.allReports;
        // }
        //  this.reports = [];
        // this.searchTermArray = _.union(this.searchTermArray, [
        //   { [c]: details.value },
        // ]);
        // this.filterByTeamLead();
      }

      if (c == 'seniorManager') {
        // if (
        //   !this.searchedByCounselor.length &&
        //   !this.searchedByTeamLead.length
        // ) {
        //   this.reports = this.allReports;
        // } else if (!this.searchedByCounselor.length) {
        //   this.reports = this.allReports;
        // } else if (!this.searchedByTeamLead.length) {
        //   this.reports = this.searchedByCounselor;
        // }
        //  this.reports = [];
        // this.searchTermArray = _.union(this.searchTermArray, [
        //   { [c]: details.value },
        // ]);
        // this.filterBySeniorManager();
      }

      if (c == 'auditor') {
        // if (
        //   !this.searchedByCounselor.length &&
        //   !this.searchedByTeamLead.length &&
        //   !this.searchedBySeniorManager.length
        // ) {
        //   this.reports = this.allReports;
        // } else if (!this.searchedByCounselor.length) {
        //   this.reports = this.allReports;
        // } else if (!this.searchedByTeamLead.length) {
        //   this.reports = this.searchedByCounselor;
        // } else if (!this.searchedBySeniorManager.length) {
        //   this.reports = this.searchedByTeamLead;
        // }
        //  this.reports = [];
        // this.searchTermArray = _.union(this.searchTermArray, [
        //   { [c]: details.value },
        // ]);
        // this.filterByAuditor();
      }
    },

    removeFromSearchTerm(details, c) {
      c = _.camelCase(c);
      _.remove(this.searchArray, element => {
        return element[c] == details.value;
      });
      //   this.reports = this.allReports;
      //   this.searchTermArray.forEach(searchTerm => {
      //     let key = Object.keys(searchTerm);
      //     if (key[0] == 'counsellor') {
      //       this.filterByCounsellor(searchTerm);
      //     }
      //     if (key[0] == 'teamLead') {
      //       this.filterByTeamLead();
      //     }
      //     if (key[0] == 'seniorManager') {
      //       this.filterBySeniorManager();
      //     }
      //     if (key[0] == 'auditor') {
      //       this.filterByAuditor();
      //     }
      //     // if(key[0] == 'counsellor'){
      //     //     this.filterByCounsellor();
      //     // }
      //   });
      console.log(
        'searchTermArray after removing from counsellor ',
        this.searchArray
      );
    },

    resetFilter() {
      this.reports = this.allReports;
      this.searchArray = [];
      this.searchedByCounselor = [];
      this.searchedByTeamLead = [];
      this.searchedBySeniorManager = [];
      this.searchedByAuditor = [];
      this.searchedByResult = [];

      this.searchTermC = null;
      this.searchTermA = null;
      this.searchTermR = null;
      this.searchTermTl = null;
      this.searchTermSm = null;

      this.filterOne = false;
      this.filterTwo = false;
      this.filterThree = false;
      this.filterFour = false;
      this.filterFive = false;
    },

    applyFilter() {
      console.log('searchTermArray before applying filter ', this.searchArray);

      this.searchedByCounselor = [];
      this.searchedByTeamLead = [];
      this.searchedBySeniorManager = [];
      this.searchedByAuditor = [];
      this.searchedByResult = [];
      const counselorsearchArray = [...this.searchArray];
      const teamLeadSearchArray = [...this.searchArray];
      const seniorManagerSearchArray = [...this.searchArray];
      const auditorSearchArray = [...this.searchArray];
      const resultSearchArray = [...this.searchArray];

      _.remove(counselorsearchArray, element => {
        return Object.keys(element)[0] != 'counselor';
      });
      _.remove(teamLeadSearchArray, element => {
        return Object.keys(element)[0] != 'teamLead';
      });
      _.remove(seniorManagerSearchArray, element => {
        return Object.keys(element)[0] != 'seniorManager';
      });
      _.remove(auditorSearchArray, element => {
        return Object.keys(element)[0] != 'auditor';
      });
      _.remove(resultSearchArray, element => {
        return Object.keys(element)[0] != 'result';
      });

      console.log('counselor search array ', counselorsearchArray);

      let filterOrder = [];
      this.reports = this.allReports;
      this.searchArray.forEach(searchTerm => {
        let key = Object.keys(searchTerm);
        if (key[0] == 'counselor') {
          filterOrder = _.union(filterOrder, ['counselor']);
        }
        if (key[0] == 'teamLead') {
          filterOrder = _.union(filterOrder, ['teamLead']);
        }
        if (key[0] == 'seniorManager') {
          filterOrder = _.union(filterOrder, ['seniorManager']);
          //   this.filterBySeniorManager();
        }
        if (key[0] == 'auditor') {
          filterOrder = _.union(filterOrder, ['auditor']);
          //   this.filterByAuditor();
        }
        if (key[0] == 'result') {
          filterOrder = _.union(filterOrder, ['result']);
          //   this.filterByAuditor();
        }
        // if(key[0] == 'counsellor'){
        //     this.filterByCounsellor();
        // }
      });

      filterOrder.forEach(filter => {
        if (filter == 'counselor') {
          this.filterByCounsellor(counselorsearchArray);
        }
        if (filter == 'teamLead') {
          this.filterByTeamLead(teamLeadSearchArray);
        }
        if (filter == 'seniorManager') {
          this.filterBySeniorManager(seniorManagerSearchArray);
        }
        if (filter == 'auditor') {
          this.filterByAuditor(auditorSearchArray);
        }
        if (filter == 'result') {
          this.filterByResult(resultSearchArray);
        }
      });
      console.log(
        'searchTermArray after removing from counsellor ',
        this.searchArray
      );
    },

    populateFilterData() {
      let user = localStorage.getItem('access-token');
      if (user) {
        // const currentUser = this.$auth.currentUser;

        this.$axios({
          url: `${process.env.API_URL}/allUsersRole`,
          method: 'GET',

          headers: {
            authorization: `Bearer${user}`,
          },
        })
          .then(res => {
            this.allCounselors = [];
            this.allTeamLeads = [];
            this.allSeniorManagers = [];
            this.allAuditors = [];
            console.log('response ', res.data);
            res.data.users.forEach(user => {
              // console.log('user ', user);
              if (user.role == 'counselor') {
                this.allCounselors.push(user.name);
              }
              if (user.role == 'team lead') {
                this.allTeamLeads.push(user.name);
              }
              if (user.role == 'senior manager') {
                this.allSeniorManagers.push(user.name);
              }
              if (user.role == 'auditor') {
                this.allAuditors.push(user.name);
              }
            });
            this.counselors = this.allCounselors;
            this.teamLeads = this.allTeamLeads;
            this.seniorManagers = this.allSeniorManagers;
            this.auditors = this.allAuditors;
          })
          .catch(err => {
            console.log('Error while fetching users data ', err);
          });
      }
    },

    getReports(month) {
      console.log('month ', month);
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
        // console.log('report counselor', this.reports[0].teamLead);
      });
    },

    // getReports(month) {
    //   //   month = month + 1;
    //   this.reports = [];
    //   this.allReports = [];
    //   const yesterMonth = new Date();
    //   yesterMonth.setMonth(month - 1);
    //   yesterMonth.setDate(1);
    //   const nextMonth = new Date();
    //   nextMonth.setMonth(month + 1);
    //   nextMonth.setDate(1);

    //   if (month !== new Date().getMonth()) {
    //   }

    //   if (
    //     this.permissions.includes('viewAll') ||
    //     this.permissions.includes('admin')
    //   ) {
    //     this.$axios.this.$firestore
    //       .collection('reports')
    //       //   .where(this.role, '==', this.name)
    //       .orderBy('createdAt', 'desc')
    //       .where('createdAt', '>', yesterMonth)
    //       .where('createdAt', '<', nextMonth)
    //       //   .where('createdAt', '>', yesterMonth)
    //       // .limit(10)
    //       .onSnapshot(querySnapshot => {
    //         this.allReports = [];
    //         this.reports = [];
    //         querySnapshot.forEach(doc => {
    //           this.allReports = _.union(this.allReports, [
    //             { ...doc.data(), id: doc.id },
    //           ]);
    //           // console.log('data ', doc.data());
    //         });
    //         this.reports = _.union(this.reports, this.allReports);
    //       });
    //   } else {
    //     if (this.permissions.includes('viewMy')) {
    //       //   console.log('doc data in viewAll else ', doc.data());
    //       //   console.log('this.role ', this.role);
    //       //   console.log('this.name ', this.name);
    //       //   const role = this.role
    //       //     .toLowerCase()
    //       //     .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => {
    //       //       return chr.toUpperCase();
    //       //     }); //convert role seperated wiht space into a camel cased string

    //       //   console.log('role ', role);

    //       //   if (doc.data().counsellor == this.name) {
    //       //     this.allReports.push({ ...doc.data(), id: doc.id });
    //       // console.log('data ', doc.data());

    //       this.$firestore
    //         .collection('reports')
    //         //   .where(this.role, '==', this.name)
    //         .orderBy('createdAt', 'desc')
    //         .where(this.role, '==', this.name)
    //         .where('createdAt', '>', yesterMonth)
    //         .where('createdAt', '<', nextMonth)
    //         //   .where('teamLead', '==', this.name)
    //         //   .limit(10)
    //         .onSnapshot(querySnapshot => {
    //           this.allReports = [];
    //           this.reports = [];
    //           querySnapshot.forEach(doc => {
    //             // const report = { ...doc.data(), id: doc.id };
    //             // this.allReports.indexOf(report === -1) &&
    //             //   this.allReports.push(report);

    //             this.allReports = _.union(this.allReports, [
    //               { ...doc.data(), id: doc.id },
    //             ]);

    //             // this.reports = this.allReports;
    //           });
    //           this.reports = _.union(this.reports, this.allReports);
    //         });
    //     }

    //     if (this.permissions.includes('viewTl')) {
    //       //   if (doc.data().teamLead == this.name) {
    //       //     this.allReports.push({ ...doc.data(), id: doc.id });
    //       //     console.log('data ', doc.data());

    //       this.$firestore
    //         .collection('reports')
    //         //   .where(this.role, '==', this.name)
    //         .orderBy('createdAt', 'desc')
    //         .where('teamLead', '==', this.name)
    //         .where('createdAt', '>', yesterMonth)
    //         .where('createdAt', '<', nextMonth)
    //         //   .limit(10)
    //         .onSnapshot(querySnapshot => {
    //           this.allReports = [];

    //           querySnapshot.forEach(doc => {
    //             // const report = { ...doc.data(), id: doc.id };
    //             // this.allReports.indexOf(report === -1) &&
    //             //   this.allReports.push(report);

    //             this.allReports = _.union(this.allReports, [
    //               { ...doc.data(), id: doc.id },
    //             ]);

    //             // this.reports = this.allReports;
    //           });
    //           this.reports = _.union(this.reports, this.allReports);
    //         });
    //     }

    //     if (this.permissions.includes('viewSm')) {
    //       //   if (doc.data().seniorManager == this.name) {
    //       //     this.allReports.push({ ...doc.data(), id: doc.id });
    //       //     console.log('data ', doc.data());
    //       this.$firestore
    //         .collection('reports')
    //         //   .where(this.role, '==', this.name)
    //         .orderBy('createdAt', 'desc')
    //         .where('seniorManager', '==', this.name)
    //         .where('createdAt', '>', yesterMonth)
    //         .where('createdAt', '<', nextMonth)
    //         //   .limit(10)
    //         .onSnapshot(querySnapshot => {
    //           this.allReports = [];

    //           querySnapshot.forEach(doc => {
    //             // const report = { ...doc.data(), id: doc.id };
    //             // this.allReports.indexOf(report === -1) &&
    //             //   this.allReports.push(report);

    //             this.allReports = _.union(this.allReports, [
    //               { ...doc.data(), id: doc.id },
    //             ]);
    //           });
    //           //   this.reports = this.allReports;
    //           this.reports = _.union(this.reports, this.allReports);
    //         });
    //     }
    //   }
    // },
  },

  watch: {
    searchTerm() {
      this.reports = this.allReports.filter(report => {
        console.log('selected counselors ', this.searchTermC);

        return report.counsellor
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());
      });
    },

    // searchTermC() {
    //   this.searchTermArray.push();
    //   console.log('watcher for searchTermC ', this.searchTermC);
    //   if (!this.searchTermC.length) {
    //     console.log('watcher for searchTermC inside ', this.searchTermC);

    //     this.reports = this.allReports;
    //   } else {
    //     this.reports = this.allReports.filter(report => {
    //       return this.searchTermC.includes(report.counsellor);
    //     });
    //   }
    // },

    // searchTermTl() {
    //   let searchedTl = [];
    //   console.log('reports array in searchTermTl ,', this.reports);
    //   console.log('watcher for searchTermTl ', this.searchTermTl);
    //   if (this.searchTermTl.length) {
    //     searchedTl = this.reports.filter(report => {
    //       return this.searchTermTl.includes(report.teamLead);
    //     });
    //   }
    //   this.reports = _.union(this.reports, searchedTl);
    // },
  },

  mounted() {
    this.allReports = [];

    this.populateFilterData();

    const user = localStorage.getItem('access-token');
    if (user) {
      const userDetails = jwt_decode(user);
      this.permissions = userDetails.permissions;

      console.log('authstate change ran inside reports');
      // this.currentUser = currentUser;

      this.getReports(new Date().getMonth());
    }
  },
};
</script>

<style>
tr {
  padding: 5px;
  border-bottom: 1px solid rgba(216, 214, 214, 0.836);
}

th {
  padding: 5px;
  /* padding-left: 10px; */
}
td {
  padding: 5px;
}

.no-border {
  border-bottom: none;
}

table {
  /* border: 1px solid rgb(214, 214, 214);
   border-radius: 10px; */
  border-collapse: collapse;
  width: 100%;
  padding: 5px;
}

tr:nth-child(even) {
  background-color: #fafafa;
}
</style>
