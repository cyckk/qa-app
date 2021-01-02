<template>
  <q-page class="q-pa-md fixed-width">
    <div class="header">
      <q-card class="my-card" flat bordered>
        <q-card-section horizontal>
          <q-card-section class="q-pt-lg q-pl-md q-pl-sm-xl col-8">
            <div class="text-overline">Audited By: {{ report.auditor }}</div>
            <div class="text-h4 q-mt-sm q-mb-xs">
              {{
                report.counselor == 'NA' ? report.teamLead : report.counselor
              }}
            </div>
            <div class="text-h6 q-mt-sm q-mb-xs">
              {{
                report.counsellor == 'NA'
                  ? `${report.seniorManager}`
                  : `${report.teamLead} | ${report.seniorManager}`
              }}
            </div>

            <div class="text-caption text-grey">
              Date of Audit Call - {{ report.callDate }}
            </div>

            <div class="text-subtitle2 q-mt-sm q-mb-xs">
              {{ `Lead ID: ${report.leadId}` }}
            </div>
            <div class="text-subtitle2 q-mt-sm q-mb-xs">
              {{ `Contact No: ${report.leadPhoneNumber}` }}
            </div>
            <div class="text-subtitle2 q-mt-sm q-mb-xs">
              {{ `Lead Stage: ${report.leadStage}` }}
            </div>
          </q-card-section>
          <q-space></q-space>
          <q-card-section class=" q-pr-lg-none q-mt-lg col-4">
            <!-- <q-img
              class="rounded-borders"
              src="https://cdn.quasar.dev/img/parallax2.jpg"
            /> -->
            <div
              class="text-center text-h4 text-white result"
              :class="
                report.result == 'F' ||
                (grades.score / grades.totalMarks) * 100 < 50
                  ? 'bg-deep-orange'
                  : 'bg-green'
              "
              style=" "
            >
              {{ report.result != 'F' ? `${report.result}%` : report.result }}
            </div>
            <div class="q-pt-md">
              <!-- <span>Max Score: {{ grades.totalMarks }}</span> -->
            </div>
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>

    <div class="audit-report">
      <q-card class="my-card q-mt-md" flat bordered>
        <div class="text-h6 text-center border q-mt-md">
          Audit Report
        </div>
        <table class="table table-bordered table-striped table-hover">
          <!-- <thead>
          <tr class="text-h6 text-center">
            Audit Report
          </tr>
        </thead> -->
          <tbody>
            <tr v-for="(question, index) in data" :key="index">
              <th scope="row" class="col-1">{{ index + 1 }}</th>
              <td>{{ question.name }}</td>
              <td class="text-center">
                <q-badge
                  :color="
                    question.answer != 'YES' ? 'deep-orange-6' : 'green-5'
                  "
                  text-color="grey-3"
                >
                  {{ question.answer }}</q-badge
                >
              </td>
              <td class="text-center">
                <q-badge color="yellow-6" text-color="grey-9">
                  {{ question.marks }}
                </q-badge>
              </td>
            </tr>
            <tr>
              <th class="text-left" colspan="3">Total Score</th>
              <td class="text-center">
                <q-badge
                  v-if="report.result != 'F'"
                  class=" q-pl-sm q-pr-sm text-subtitle2"
                  color="yellow-9"
                  text-color="grey-9"
                >
                  {{ grades.score }}
                </q-badge>
                <q-badge v-else color="deep-orange" label="NA"></q-badge>
              </td>
            </tr>
          </tbody>
        </table>
      </q-card>
    </div>

    <div class="fatal-report">
      <q-card class="my-card q-mt-md" flat bordered>
        <div class="text-h6 text-center border q-mt-md">
          Fatal Parameters
        </div>
        <table
          v-if="report.fatalParams"
          class="table table-bordered table-striped table-hover"
        >
          <tbody>
            <!-- <tr class="" v-for="(ft, index) in report.fatalParams" :key="index">
            <th scope="row" class="col-1">{{ index + 1 }}</th>
            <td>{{ ft.ques }}</td>
            <td>{{ ft.ans == 11 ? 'YES' : 'NO' }}</td>
          </tr>
          <tr v-if="1" class="col-12">
            {{
              report.fatalParams[0].remarks
            }}
          </tr> -->
            <tr
              :class="
                report.fatalParams[0].remarks
                  ? 'bg-deep-orange-3 no-border'
                  : ''
              "
            >
              <th scope="" colspan="1" class="serialNumber">1</th>
              <td>{{ report.fatalParams[0].ques }}</td>
              <td class="text-center">
                <q-badge
                  :color="
                    report.fatalParams[0].ans == 11
                      ? 'deep-orange-6'
                      : 'green-5'
                  "
                  text-color="grey-3"
                  >{{ report.fatalParams[0].ans == 11 ? 'YES' : 'NO' }}</q-badge
                >
              </td>
            </tr>
            <tr class="bg-deep-orange-3" v-if="report.fatalParams[0].remarks">
              <td class="text-left padded" colspan="12" rowspan="">
                <span class="text-subtitle2">Remarks:</span>
                {{ report.fatalParams[0].remarks }}
              </td>
            </tr>
            <tr
              :class="
                report.fatalParams[1].remarks
                  ? 'bg-deep-orange-3 no-border'
                  : ''
              "
            >
              <th scope="row" class="serialNumber">2</th>
              <td>{{ report.fatalParams[1].ques }}</td>
              <td class="text-center">
                <q-badge
                  :color="
                    report.fatalParams[1].ans == 11
                      ? 'deep-orange-6'
                      : 'green-5'
                  "
                  text-color="grey-3"
                  >{{ report.fatalParams[1].ans == 11 ? 'YES' : 'NO' }}</q-badge
                >
              </td>
            </tr>
            <tr class="bg-deep-orange-3" v-if="report.fatalParams[1].remarks">
              <td class="text-left padded" colspan="12">
                <span class="text-subtitle2">Remarks:</span>
                {{ report.fatalParams[1].remarks }}
              </td>
            </tr>
            <tr
              :class="
                report.fatalParams[2].remarks
                  ? 'bg-deep-orange-3 no-border'
                  : ''
              "
            >
              <th scope="row" class="serialNumber">3</th>
              <td>{{ report.fatalParams[2].ques }}</td>
              <td class="text-center">
                <q-badge
                  :color="
                    report.fatalParams[2].ans == 11
                      ? 'deep-orange-6'
                      : 'green-5'
                  "
                  text-color="grey-3"
                  >{{ report.fatalParams[2].ans == 11 ? 'YES' : 'NO' }}</q-badge
                >
              </td>
            </tr>
            <tr class="bg-deep-orange-3" v-if="report.fatalParams[2].remarks">
              <td class="text-left padded" colspan="12">
                <span class="text-subtitle2">Remarks:</span>
                {{ report.fatalParams[2].remarks }}
              </td>
            </tr>
          </tbody>
        </table>
      </q-card>
    </div>

    <div class="">
      <q-card class="my-card q-mt-md" flat bordered>
        <div class="text-h6 text-center border q-mt-md">
          Audit Performance Summary
        </div>
        <table class="table table-bordered table-striped table-hover">
          <tbody>
            <tr>
              <th scope="row" class="serialNumber">1</th>
              <td class="width-audit-per">Call Structure</td>
              <td class="text-center">
                <q-badge
                  :color="gradePercentageCS > 50 ? 'green-5' : 'deep-orange-6'"
                  text-color="grey-3"
                  >{{ gradePercentageCS }}%</q-badge
                >
              </td>
            </tr>

            <tr>
              <th scope="row" class="serialNumber">2</th>
              <td class="width-audit-per">Product Knowledge</td>
              <td class="text-center">
                <q-badge
                  :color="gradePercentageP > 50 ? 'green-5' : 'deep-orange-6'"
                  text-color="grey-3"
                  >{{ gradePercentageP }}%</q-badge
                >
              </td>
            </tr>

            <tr>
              <th scope="row" class="serialNumber">3</th>
              <td class="width-audit-per">Pitch</td>
              <td class="text-center">
                <q-badge
                  :color="gradePercentagePK > 50 ? 'green-5' : 'deep-orange-6'"
                  text-color="grey-3"
                  >{{ gradePercentagePK }}%</q-badge
                >
              </td>
            </tr>

            <tr>
              <th scope="row" class="serialNumber">3</th>
              <td class="">Product Rebuttal</td>
              <td class="text-center">
                <q-badge
                  :color="gradePercentagePK > 50 ? 'green-5' : 'deep-orange-6'"
                  text-color="grey-3"
                  >{{ gradePercentagePR }}%</q-badge
                >
              </td>
            </tr>
          </tbody>
        </table>
      </q-card>
    </div>

    <q-card class="my-card">
      <div class="text-h6 text-center border q-mt-md">
        Auditor's feedback
      </div>
      <table class="table table-bordered table-striped table-hover">
        <tbody>
          <tr>
            <td class="text-left padded">{{ report.feedback }}</td>
          </tr>
        </tbody>
      </table>
    </q-card>
  </q-page>
</template>

<script>
export default {
  props: ['propId'],
  data() {
    return {
      columns: [
        {
          name: 'desc',
          required: true,
          label: 'Dessert (100g serving)',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true,
        },
        {
          name: 'answer',
          align: 'center',
          label: 'answer',
          field: 'answer',
          sortable: true,
        },
      ],
      data: [],

      report: {},
      questions: [],
      grades: {},
      gradePercentageCS: null,
      gradePercentageP: null,
      gradePercentagePK: null,
      gradePercentagePR: null,
    };
  },

  methods: {
    getReport() {
      // this.$firestore
      //   .collection('reports')
      //   .doc(this.id)
      //   .onSnapshot(doc => {
      //     console.log(doc.data());
      //     this.report = doc.data();
      //     console.log('repor ', this.report);
      //   });

      this.$axios({
        url: `${process.env.API_URL}/report/getReport/${this.id}`,
        method: 'GET',

        headers: {
          authorization: `Bearer${localStorage.getItem('access-token')}`,
        },
      }).then(res => {
        this.report = res.data.report;
        console.log('response ', this.report.fatalParams);
        const questions = res.data.report.questions;

        questions.forEach(doc => {
          let data = doc;
          // console.log('questions ', doc.data());
          this.questions.push({
            id: data._id,
            ques: data.ques,
            ans: data.ans,
            category: data.category,
          });

          if (data.ans != 100) {
            this.data.push({
              name: data.ques,
              answer: data.ans <= 10 ? (data.ans == 0 ? 'NO' : 'YES') : 'NA',
              marks: data.ans,
            });
          }
        });

        console.log('grades ', res.data.grades);
        this.grades = res.data.grades;
        this.gradePercentageCS = Math.round(
          (this.grades.scoreCS / this.grades.totalMarksCS) * 100
        );
        this.gradePercentageP = Math.round(
          (this.grades.scoreP / this.grades.totalMarksP) * 100
        );
        this.gradePercentagePK = Math.round(
          (this.grades.scorePK / this.grades.totalMarksPK) * 100
        );
        this.gradePercentagePR = Math.round(
          (this.grades.scorePR / this.grades.totalMarksPR) * 100
        );
      });
    },
  },

  mounted() {
    this.getReport();
  },

  created() {
    if (this.$route.params.id) {
      this.id = this.$route.params.id;
    } else if (this.propId) {
      this.id = this.propId;
    }
  },
};
</script>

<style scoped lang="scss">
tr {
  padding: 5px;
  border-bottom: 1px solid rgba(216, 214, 214, 0.836);
}

th,
td {
  padding: 5px;
}

.padded {
  padding: 15px 30px;
}

.no-border {
  border-bottom: none;
}

table {
  //   border: 1px solid rgb(214, 214, 214);
  //   border-radius: 10px;
  border-collapse: collapse;
  width: 100%;
  padding: 5px;
}

tr:nth-child(even) {
  background-color: #fafafa;
}

.remarks {
  min-height: 200px;
}

.serialNumber {
  width: 30px;
}

.fixed-width {
  width: 50%;
  margin: 0 auto;
}

.width-audit-per {
  width: 85%;
}

.result {
  height: 200px;
  width: 200px;
  border-radius: 50%;
  line-height: 200px;
}
@media (max-width: 1600px) {
  .fixed-width {
    width: 60%;
  }
}

@media (max-width: 1280px) {
  .fixed-width {
    width: 80%;
  }
}
@media (max-width: 992px) {
  .fixed-width {
    width: 100%;
  }
}

@media (max-width: 720px) {
  .result {
    height: 150px;
    width: 150px;
    line-height: 150px;
  }
}
</style>
