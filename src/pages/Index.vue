<template>
  <q-page class="flex flex-center flex-column">
    <q-form @submit="submitForm">
      <div v-if="page == 1" class="row q-pa-xl q-mt-lg">
        <q-card class="col-12 q-mb-md my-card">
          <q-card-section>
            QA Test Form
          </q-card-section>
        </q-card>

        <q-card class="col-12 col-sm-6 q-mb-md my-card">
          <q-card-section>
            Counsellor
          </q-card-section>
          <q-card-section>
            <q-select
              outlined
              v-model="selectedCounsellor"
              :options="counsellors"
              label="Rounded filled"
              :rules="[val => !!val || 'Field is required']"
            />
          </q-card-section>
        </q-card>

        <q-card class="col-12 col-sm-6 q-mb-md my-card">
          <q-card-section>
            Team Lead
          </q-card-section>
          <q-card-section>
            <q-select
              outlined
              v-model="selectedTL"
              :options="tls"
              label="Rounded filled"
              :rules="[val => !!val || 'Field is required']"
            />
          </q-card-section>
        </q-card>

        <q-card class="col-12 q-mb-md my-card">
          <q-card-section>
            Senior Manager
          </q-card-section>
          <q-card-section>
            <q-option-group
              :options="seniorManagers"
              label="Notifications"
              type="radio"
              v-model="selectedSM"
              :rules="[val => !!val || 'Field is required']"
            />
          </q-card-section>
        </q-card>

        <q-card class="col-12 q-mb-md my-card">
          <q-card-section>
            Auditor
          </q-card-section>
          <q-card-section>
            <q-option-group
              :options="auditors"
              label="Notifications"
              type="radio"
              v-model="selectedAuditor"
              :rules="[val => !!val || 'Field is required']"
            />
          </q-card-section>
        </q-card>

        <q-card class="col-12 q-mb-md my-card">
          <q-card-section>
            Type of Call
          </q-card-section>
          <q-card-section>
            <q-option-group
              :options="callTypes"
              label="Notifications"
              type="radio"
              v-model="selectedCall"
              :rules="[val => !!val || 'Field is required']"
            />
          </q-card-section>
        </q-card>

        <q-card class="col-12 q-mb-md my-card">
          <q-card-section>
            Lead ID
          </q-card-section>
          <q-card-section>
            <q-input
              v-model="leadId"
              label="Type here"
              :rules="[val => !!val || 'Field is required']"
            />
          </q-card-section>
        </q-card>

        <q-card class="col-12 q-mb-md my-card">
          <q-card-section>
            Date of Call
          </q-card-section>
          <q-card-section>
            <!-- <q-input v-model="callDate" label="Date" /> -->
            <q-input
              color="grey-3"
              label-color=""
              outlined
              v-model="callDate"
              label="Pick date"
              @click="showDatePicker = !showDatePicker"
              :rules="[val => !!val || 'Field is required']"
            >
              <template v-slot:append>
                <q-icon
                  @click="showDatePicker = !showDatePicker"
                  name="event"
                  color=""
                />
              </template>
            </q-input>
          </q-card-section>
          <q-date v-if="showDatePicker" v-model="callDate" minimal />
        </q-card>

        <q-card class="col-12 q-mb-md my-card">
          <q-card-section>
            Lead Stage
          </q-card-section>
          <q-card-section>
            <q-input
              v-model="leadStage"
              label="Type here"
              :rules="[val => !!val || 'Field is required']"
            />
          </q-card-section>
        </q-card>
        <q-btn @click="saveReport" color="primary" label="Next"></q-btn>
        <!-- <q-btn type="submit" color="primary" label="Submit"></q-btn> -->
      </div>

      <!-- Questions form  -->
      <div v-if="page == 2" class="row q-pa-xl q-mt-lg">
        <q-card class="col-12 q-mb-md my-card">
          <q-card-section ref="ques1" class="row">
            <div class="col-11">
              Greeted the customer properly
            </div>
            <div>Score: <q-badge color="primary">5</q-badge></div>
            <div class="small" ref="cat1"></div>
          </q-card-section>
          <q-card-section>
            <q-option-group
              :options="optionsWithoutNA"
              label="Notifications"
              type="radio"
              v-model="ans.ans1"
              value=""
            />
          </q-card-section>
        </q-card>

        <q-card class="col-12 q-mb-md my-card">
          <q-card-section ref="ques2" class="row">
            <div class="col-11">
              Introduced himself/herself, data trained and Was able to explain
              the reason of the call
            </div>
            <div>Score: <q-badge color="primary">5</q-badge></div>
            <div class="small" ref="cat2"></div>
          </q-card-section>
          <q-card-section>
            <q-option-group
              :options="options"
              label="Notifications"
              type="radio"
              v-model="ans.ans2"
            />
          </q-card-section>
        </q-card>

        <q-card class="col-12 q-mb-md my-card">
          <q-card-section ref="ques3" class="row">
            <div class="col-11">
              Was able to probe the requirement of customer/ Create Need of the
              product
            </div>
            <div>Score: <q-badge color="primary">5</q-badge></div>
            <div class="small" ref="cat3">CS, P</div>
          </q-card-section>
          <q-card-section>
            <q-option-group
              :options="options"
              label="Notifications"
              type="radio"
              v-model="ans.ans3"
            />
          </q-card-section>
        </q-card>

        <q-card class="col-12 q-mb-md my-card">
          <q-card-section ref="ques4" class="row">
            <div class="col-11">
              Asked for the qualification background & Work Experience
            </div>
            <div>Score: <q-badge color="primary">10</q-badge></div>
            <div class="small" ref="cat4">CS, P</div>
          </q-card-section>

          <q-card-section>
            <q-option-group
              :options="options"
              label="Notifications"
              type="radio"
              v-model="ans.ans4"
            />
          </q-card-section>
        </q-card>

        <q-card class="col-12 q-mb-md my-card">
          <q-card-section ref="ques5" class="row">
            <div class="col-11">
              Was able to explain Data Science with Example
            </div>
            <div>Score: <q-badge color="primary">10</q-badge></div>
            <div class="small" ref="cat5">CS, P,PK</div>
          </q-card-section>
          <q-card-section>
            <q-item>
              <q-item-section side>
                <q-icon name="volume_down" />
              </q-item-section>
              <q-item-section>
                <q-slider :min="0" :max="10" label markers v-model="ans.ans5" />
              </q-item-section>
              <q-item-section side>
                <q-icon name="volume_up" />
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>

        <q-card class="col-12 q-mb-md my-card">
          <q-card-section ref="ques6" class="row">
            <div class="col-11">
              Was the agent able to tell the pricing plans/payment options?
            </div>
            <div>Score: <q-badge color="primary">10</q-badge></div>
            <div class="small" ref="cat6">PK,CS,PR</div>
          </q-card-section>
          <q-card-section>
            <q-option-group
              :options="options"
              label="Notifications"
              type="radio"
              v-model="ans.ans6"
            />
          </q-card-section>
        </q-card>

        <q-card class="col-12 q-mb-md my-card" ref="ques7">
          <q-card-section ref="ques7" class="row">
            <div class="col-11">
              Was the agent able to understand customer's concern
            </div>
            <div>Score: <q-badge color="primary">5</q-badge></div>
            <div class="small" ref="cat7">CS</div>
          </q-card-section>
          <q-card-section>
            <q-option-group
              :options="options"
              label="Notifications"
              type="radio"
              v-model="ans.ans7"
            />
          </q-card-section>
        </q-card>

        <q-card class="col-12 q-mb-md my-card" ref="ques8">
          <q-card-section ref="ques8" class="row">
            <div class="col-11">
              Did the associate informed about placement and other benefits of
              course
            </div>
            <div>Score: <q-badge color="primary">10</q-badge></div>
            <div class="small" ref="cat8">CS, PR</div>
          </q-card-section>
          <q-card-section>
            <q-item>
              <q-item-section side>
                <q-icon name="volume_down" />
              </q-item-section>
              <q-item-section>
                <q-slider :min="0" :max="10" label markers v-model="ans.ans8" />
              </q-item-section>
              <q-item-section side>
                <q-icon name="volume_up" />
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>

        <q-card class="col-12 q-mb-md my-card">
          <q-card-section ref="ques9" class="row">
            <div class="col-11">
              Thanked for the customer's time and patience and closed the call
              well/ Followup created
            </div>
            <div>Score: <q-badge color="primary">10</q-badge></div>
            <div class="small" ref="cat9">CS</div>
          </q-card-section>
          <q-card-section>
            <q-option-group
              :options="options"
              label="Notifications"
              type="radio"
              v-model="ans.ans9"
            />
          </q-card-section>
        </q-card>

        <q-card class="col-12 q-mb-md my-card">
          <q-card-section ref="ques10" class="row">
            <div class="col-11">
              Did the associate switch the language according to customer’s
              request?
            </div>
            <div>Score: <q-badge color="primary">5</q-badge></div>
            <div class="small" ref="cat10">P</div>
          </q-card-section>
          <q-card-section>
            <q-option-group
              :options="optionsWithoutNA"
              label="Notifications"
              type="radio"
              v-model="ans.ans10"
            />
          </q-card-section>
        </q-card>

        <q-card class="col-12 q-mb-md my-card">
          <q-card-section ref="ques11" class="row">
            <div class="col-11">
              Did the associate allow the user to speak without being
              interrupted?/Active listening
            </div>
            <div>Score: <q-badge color="primary">5</q-badge></div>
            <div class="small" ref="cat11">P</div>
          </q-card-section>
          <q-card-section>
            <q-option-group
              :options="optionsWithoutNA"
              label="Notifications"
              type="radio"
              v-model="ans.ans11"
            />
          </q-card-section>
        </q-card>

        <q-card class="col-12 q-mb-md my-card">
          <q-card-section ref="ques12" class="row">
            <div class="col-11">
              Active Listening
            </div>
            <div>Score: <q-badge color="primary">5</q-badge></div>
            <div class="small" ref="cat12"></div>
            <div>
              This refers to whether after customer telling an information and
              the counsellor asks for it again
            </div>
          </q-card-section>
          <q-card-section>
            <q-option-group
              :options="optionsWithoutNA"
              label="Notifications"
              type="radio"
              v-model="ans.ans12"
            />
          </q-card-section>
        </q-card>

        <q-card class="col-12 q-mb-md my-card">
          <q-card-section ref="ques13" class="row">
            <div class="col-11">
              Did the agent update notes properly?
            </div>
            <div>Score: <q-badge color="primary">10</q-badge></div>
            <div class="small" ref="cat13">CS, PK</div>
          </q-card-section>
          <q-card-section>
            <q-option-group
              :options="optionsWithoutNA"
              label="Notifications"
              type="radio"
              v-model="ans.ans13"
            />
          </q-card-section>
        </q-card>

        <q-card class="col-12 q-mb-md my-card">
          <q-card-section ref="ques14" class="row">
            <div class="col-11">
              Did agent select the correct stage/ disposition?
            </div>
            <div>Score: <q-badge color="primary">10</q-badge></div>
            <div class="small" ref="cat14">CS</div>
          </q-card-section>
          <q-card-section>
            <q-option-group
              :options="optionsWithoutNA"
              label="Notifications"
              type="radio"
              v-model="ans.ans14"
            />
          </q-card-section>
        </q-card>

        <q-btn @click="page--" color="primary" label="Back"></q-btn>
        <q-space></q-space>
        <q-btn @click="saveQuestions" color="primary" label="Next"></q-btn>
      </div>

      <!-- Fatal Parameters  -->
      <div v-if="page == 3" class="row q-pa-xl q-mt-lg">
        <q-card class="col-12 q-mb-md my-card" ref="ft1">
          <q-card-section>
            Any kinds of miscommitment with user
          </q-card-section>
          <q-card-section>
            <q-list>
              <q-item v-ripple>
                <q-item-section avatar>
                  <q-radio v-model="ft.ans1" val="11"></q-radio>
                  <button
                    @click="prompt1 = true"
                    style="display: none"
                  ></button>
                </q-item-section>
                <q-item-section>
                  <q-item-label>YES</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <q-list>
              <q-item v-ripple>
                <q-item-section avatar>
                  <q-radio v-model="ft.ans1" val="0"></q-radio>
                </q-item-section>
                <q-item-section>
                  <q-item-label>NO</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>

          <q-card-section v-if="ft.ans1 == 11">
            <q-input
              v-model="remark1"
              label="Remarks *"
              :rules="[val => !!val || 'Field is required']"
            ></q-input>
          </q-card-section>
        </q-card>

        <q-dialog v-model="ft.ans1" persistent>
          <q-card style="min-width: 350px">
            <q-card-section>
              <div class="text-h6">Your address</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-input
                dense
                v-model="remark1"
                autofocus
                @keyup.enter="prompt1 = false"
              />
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Cancel" v-close-popup />
              <q-btn flat label="Add address" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-card class="col-12 q-mb-md my-card" ref="ft2">
          <q-card-section>
            Wrong selling/Wrong product information
          </q-card-section>
          <q-card-section>
            <q-list>
              <q-item v-ripple>
                <q-item-section avatar>
                  <q-radio v-model="ft.ans2" val="11"></q-radio>
                </q-item-section>
                <q-item-section>
                  <q-item-label>YES</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <q-list>
              <q-item v-ripple>
                <q-item-section avatar>
                  <q-radio v-model="ft.ans2" val="0"></q-radio>
                </q-item-section>
                <q-item-section>
                  <q-item-label>NO</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-section v-if="ft.ans2 == 11">
            <q-input
              v-model="remark2"
              label="Remarks *"
              :rules="[val => !!val || 'Field is required']"
            ></q-input>
          </q-card-section>
        </q-card>

        <q-card class="col-12 q-mb-md my-card" ref="ft3">
          <q-card-section>
            Abusive/ Rude
          </q-card-section>
          <q-card-section>
            <q-list>
              <q-item v-ripple>
                <q-item-section avatar>
                  <q-radio v-model="ft.ans3" val="11"></q-radio>
                </q-item-section>
                <q-item-section>
                  <q-item-label>YES</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <q-list>
              <q-item v-ripple>
                <q-item-section avatar>
                  <q-radio v-model="ft.ans3" val="0"></q-radio>
                </q-item-section>
                <q-item-section>
                  <q-item-label>NO</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-section v-if="ft.ans3 == 11">
            <q-input
              v-model="remark3"
              label="Remarks *"
              :rules="[val => !!val || 'Field is required']"
            ></q-input>
          </q-card-section>
        </q-card>

        <q-btn @click="page--" color="primary" label="Back"></q-btn>
        <q-space></q-space>
        <q-btn
          @click.prevent="saveFatalParams"
          color="primary"
          label="Next"
        ></q-btn>
      </div>

      <!-- feedback  -->
      <div v-if="page == 4" class="row q-pa-xl q-mt-lg">
        <q-card class="col-12 q-mb-md my-card" ref="ft1">
          <q-card-section>
            Detailed feedback
          </q-card-section>
          <q-card-section>
            <q-input v-model="text" filled type="textarea" />
          </q-card-section>
        </q-card>
        <q-btn @click="page--" color="primary" label="Back"></q-btn>
        <q-space></q-space>
        <q-btn type="submit" color="primary" label="Submit"></q-btn>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { firestore } from '../boot/firebase';
import { mapActions } from 'vuex';
export default {
  name: 'PageIndex',
  data() {
    return {
      page: 1,
      selectedCounsellor: null,
      counsellors: [],
      selectedTL: null,
      tls: [],
      selectedSM: null,
      seniorManagers: [],
      selectedAuditor: null,
      auditors: [],
      selectedCall: null,
      callTypes: [
        { label: 'Short Call', value: 'Short Call' },
        { label: 'Long Call', value: 'Long Call' },
        { label: 'Sales Call', value: 'Sales Call' },
      ],
      leadId: null,
      callDate: null,
      leadStage: null,
      showDatePicker: false,
      date: '',
      text: '',

      options: [
        { label: 'YES', value: '11' },
        { label: 'NO', value: '0', color: 'green' },
        { label: 'NA', value: '100', color: 'red' },
      ],
      optionsWithoutNA: [
        { label: 'YES', value: '11' },
        { label: 'NO', value: '0', color: 'green' },
      ],
      volume: '',
      ans: {
        ans1: null,
        ans2: null,
        ans3: null,
        ans4: null,
        ans5: null,
        ans6: null,
        ans7: null,
        ans8: null,
        ans9: null,
        ans10: null,
        ans11: null,
        ans12: null,
        ans13: null,
        ans14: null,
      },
      ft: {
        ans1: null,
        ans2: null,
        ans3: null,
      },
      prompt1: false,
      remark1: '',
      remark2: '',
      remark3: '',
    };
  },

  methods: {
    ...mapActions('report', [
      'addQuestions',
      'addReport',
      'addFatalParams',
      'addFeedback',
      'submitReport',
    ]),
    prompt1() {
      console.log('prompt');
    },
    submitForm() {
      console.log('submit form');
      this.addFeedback(this.text);
      this.submitReport(this.text);
      //   const reportDetails = {
      //     counsellor: this.selectedCounsellor,
      //     teamLead: this.selectedTL,
      //     seniorManager: this.selectedSM,
      //     auditor: this.selectedAuditor,
      //     callType: this.selectedCall,
      //     leadId: this.leadId,
      //     callDate: this.callDate,
      //     leadStage: this.leadStage,
      //   };
      //   console.log(reportDetails);

      //   firestore
      //     .collection('reportDetails')
      //     .add(reportDetails)
      //     .then(res => console.log('res from firestore ', res));
    },
    pupulateData() {
      this.$firestore
        .collection('keyPersons')
        .get()
        .then(querySnapshot => {
          querySnapshot.docs.forEach(doc => {
            let data = doc.data();
            // console.log('doc ', data);
            if (data.role == 'counsellor') {
              this.counsellors = data.persons;
              this.counsellors.sort().reverse();
              this.counsellors.push('NA');
              this.counsellors.reverse();
              //   console.log(this.counsellors);
            } else if (data.role == 'team lead') {
              this.tls = data.persons;
              this.tls.sort();
            } else if (data.role == 'senior manager') {
              this.seniorManagers = data.persons;
              this.seniorManagers.sort();
              this.seniorManagers = this.seniorManagers.map(ele => {
                return {
                  label: ele,
                  value: ele,
                };
              });
            } else if (data.role == 'auditor') {
              this.auditors = data.persons;
              this.auditors.sort();
              this.auditors = this.auditors.map(ele => {
                return {
                  label: ele,
                  value: ele,
                };
              });
            }
          });
        });
    },
    saveQuestions() {
      console.log('save form');
      console.log('ref', this.$refs['ques14'].$el.children[0]);
      console.log(
        'ref span',
        this.$refs['ques3'].$el.children[1].lastChild.innerText
      );

      console.log('ref', this.$refs.cat3.innerText);

      let ques = [];
      for (let i = 1; i <= 14; i++) {
        const que = `ques${i}`;
        const ans = `ans${i}`;
        const cat = `cat${i}`;
        // const selAns =
        ques.push({
          id: i,
          ques: this.$refs[que].$el.children[0].innerText,
          category: this.$refs[cat].innerText,
          ans:
            this.ans[ans] == 11
              ? this.$refs[que].$el.children[1].lastChild.innerText
              : this.ans[ans],
          marks: this.$refs[que].$el.children[1].lastChild.innerText,
        });
      }

      console.log('ques ', ques);
      this.addQuestions(ques);
      this.page++;
    },

    saveReport() {
      console.log('save report');
      const reportDetails = {
        counsellor: this.selectedCounsellor,
        teamLead: this.selectedTL,
        seniorManager: this.selectedSM,
        auditor: this.selectedAuditor,
        leadId: this.leadId,
        callType: this.selectedCall,
        callDate: this.callDate,
        leadStage: this.leadStage,
        fatalParms: [],
        feedback: '',
      };
      this.addReport(reportDetails);
      this.page++;
    },

    saveFatalParams() {
      console.log('save fatal params');

      let fatalParams = [];
      for (let i = 1; i <= 3; i++) {
        const ft = `ft${i}`;
        const ans = `ans${i}`;
        const remark = `remark${i}`;
        fatalParams.push({
          id: i,
          ques: this.$refs[ft].$children[0].$el.innerText,
          ans: this.ft[ans],
          remarks: this[remark],
        });
      }

      this.addFatalParams(fatalParams);
      this.page++;
    },
  },
  mounted() {
    this.pupulateData();
  },
};
</script>
