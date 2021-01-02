<template>
  <q-page class="flex flex-center ">
    <q-form
      v-if="page == 1"
      class="custom-width"
      @submit="saveReport"
      ref="myForm"
    >
      <div class="flex row q-pa-sm q-pa-sm-xl q-mt-lg">
        <q-card flat class="col-12 q-mb-md my-card">
          <q-card-section class="text-h6">
            QA Test Form
          </q-card-section>
        </q-card>

        <q-card class="col-12 q-mb-md my-card q-mr-md q-pt-md">
          <!-- <q-card-section>
            Counsellor
          </q-card-section> -->
          <q-card-section>
            <q-select
              outlined
              v-model="selectedCounsellor"
              :options="counsellors"
              label="Counselor"
              :rules="[val => !!val || 'Field is required']"
            />
          </q-card-section>

          <q-card-section>
            <q-select
              outlined
              v-model="selectedTL"
              :options="tls"
              label="Team Lead"
              :rules="[val => !!val || 'Field is required']"
            />
          </q-card-section>

          <!-- <div bordered class="row bordered"> -->
          <q-card-section>
            <q-select
              outlined
              v-model="selectedSM"
              :options="seniorManagers"
              label="Senior Manager"
              :rules="[val => !!val || 'Field is required']"
            />
          </q-card-section>

          <q-card-section>
            <q-select
              outlined
              v-model="selectedAuditor"
              :options="auditors"
              label="Auditor"
              :rules="[val => !!val || 'Field is required']"
            />
          </q-card-section>
          <!-- </div> -->

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

          <q-card-section>
            Lead Phone Number
          </q-card-section>
          <q-card-section>
            <q-input
              type="number"
              v-model="leadPhoneNumber"
              label="Type here"
              :rules="[val => !!val || 'Field is required']"
            />
          </q-card-section>

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
              type="date"
              :rules="[val => !!val || 'Field is required']"
            >
              <!-- <template v-slot:append>
                <q-icon name="event" color="" />
              </template> -->
            </q-input>
          </q-card-section>
          <!-- <q-date v-if="showDatePicker" v-model="callDate" minimal /> -->

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

        <q-space></q-space>
        <q-btn type="submit" color="primary" label="Next"></q-btn>

        <!-- <q-btn type="submit" color="primary" label="Submit"></q-btn> -->
      </div>
    </q-form>

    <!-- Questions form  -->
    <q-form
      v-if="page == 2"
      class="custom-width"
      @submit="saveQuestions"
      ref="myForm"
    >
      <div class="flex row q-pa-sm q-pa-sm-xl q-mt-lg">
        <q-card class="col-12 q-mb-md my-card">
          <q-card-section ref="ques1" class="row justify-between">
            <div class="col-10 col-md-11">
              Greeted the customer properly
            </div>
            <div>Score: <q-badge color="primary">5</q-badge></div>
            <div style="display: none" class="small" ref="cat1"></div>
          </q-card-section>
          <q-card-section>
            <q-option-group
              :options="optionsWithoutNA"
              label="Notifications"
              type="radio"
              v-model="ans.ans1"
              value=""
              :rules="[val => !!val || 'Field is required']"
            />
          </q-card-section>
        </q-card>

        <q-card class="col-12 q-mb-md my-card">
          <q-card-section ref="ques2" class="row justify-between">
            <div class="col-10 col-md-11">
              Introduced himself/herself, data trained and Was able to explain
              the reason of the call
            </div>
            <div>Score: <q-badge color="primary">5</q-badge></div>
            <div style="display: none" class="small" ref="cat2"></div>
          </q-card-section>
          <q-card-section>
            <q-option-group
              :options="options"
              label="Notifications"
              type="radio"
              v-model="ans.ans2"
              :rules="[val => !!val || 'Field is required']"
            />
          </q-card-section>
        </q-card>

        <q-card class="col-12 q-mb-md my-card">
          <q-card-section ref="ques3" class="row justify-between">
            <div class="col-10 col-md-11">
              Was able to probe the requirement of customer/ Create Need of the
              product
            </div>
            <div>Score: <q-badge color="primary">5</q-badge></div>
            <div style="display: none" class="small" ref="cat3">CS, P</div>
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
          <q-card-section ref="ques4" class="row justify-between">
            <div class="col-10 col-md-11">
              Asked for the qualification background & Work Experience
            </div>
            <div>Score: <q-badge color="primary">10</q-badge></div>
            <div style="display: none" class="small" ref="cat4">CS, P</div>
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
          <q-card-section ref="ques5" class="row justify-between">
            <div class="col-10 col-md-11">
              Was able to explain Data Science with Example
            </div>
            <div>Score: <q-badge color="primary">10</q-badge></div>
            <div style="display: none" class="small" ref="cat5">CS, P,PK</div>
          </q-card-section>
          <q-card-section>
            <q-item>
              <q-item-section side>
                <!-- <q-icon name="volume_down" />
                 -->
                0
              </q-item-section>
              <q-item-section>
                <q-slider :min="0" :max="10" label markers v-model="ans.ans5" />
              </q-item-section>
              <q-item-section side>
                <!-- <q-icon name="volume_up" /> -->
                10
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>

        <q-card class="col-12 q-mb-md my-card">
          <q-card-section ref="ques6" class="row justify-between">
            <div class="col-10 col-md-11">
              Was the agent able to tell the pricing plans/payment options?
            </div>
            <div>Score: <q-badge color="primary">10</q-badge></div>
            <div style="display: none" class="small" ref="cat6">PK,CS,PR</div>
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

        <q-card class="col-12 q-mb-md my-card">
          <q-card-section ref="ques7" class="row justify-between">
            <div class="col-10 col-md-11">
              Was the agent able to understand customer's concern
            </div>
            <div>Score: <q-badge color="primary">5</q-badge></div>
            <div style="display: none" class="small" ref="cat7">CS</div>
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

        <q-card class="col-12 q-mb-md my-card">
          <q-card-section ref="ques8" class="row justify-between">
            <div class="col-10 col-md-11">
              Did the associate informed about placement and other benefits of
              course
            </div>
            <div>Score: <q-badge color="primary">10</q-badge></div>
            <div style="display: none" class="small" ref="cat8">CS, PR</div>
          </q-card-section>
          <q-card-section>
            <q-item>
              <q-item-section side>
                <!-- <q-icon name="volume_down" /> -->
                0
              </q-item-section>
              <q-item-section>
                <q-slider :min="0" :max="10" label markers v-model="ans.ans8" />
              </q-item-section>
              <q-item-section side>
                <!-- <q-icon name="volume_up" /> -->
                10
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>

        <q-card class="col-12 q-mb-md my-card">
          <q-card-section ref="ques9" class="row justify-between">
            <div class="col-10 col-md-11">
              Thanked for the customer's time and patience and closed the call
              well/ Followup created
            </div>
            <div>Score: <q-badge color="primary">10</q-badge></div>
            <div style="display: none" class="small" ref="cat9">CS</div>
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
          <q-card-section ref="ques10" class="row justify-between">
            <div class="col-10 col-md-11">
              Did the associate switch the language according to customer’s
              request?
            </div>
            <div>Score: <q-badge color="primary">5</q-badge></div>
            <div style="display: none" class="small" ref="cat10">P</div>
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
          <q-card-section ref="ques11" class="row justify-between">
            <div class="col-10 col-md-11">
              Did the associate allow the user to speak without being
              interrupted?/Active listening
            </div>
            <div>Score: <q-badge color="primary">5</q-badge></div>
            <div style="display: none" class="small" ref="cat11">P</div>
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

        <!-- <q-card class="col-12 q-mb-md my-card">
          <q-card-section ref="ques12" class="row">
            <div class="col-11">
              Active Listening
            </div>
            <div>Score: <q-badge color="primary">5</q-badge></div>
            <div style="display: none" class="small" ref="cat12"></div>
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
        </q-card> -->

        <q-card class="col-12 q-mb-md my-card">
          <q-card-section ref="ques12" class="row justify-between">
            <div class="col-10 col-md-11">
              Did the agent update notes properly?
            </div>
            <div>Score: <q-badge color="primary">10</q-badge></div>
            <div style="display: none" class="small" ref="cat12">CS, PK</div>
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
          <q-card-section ref="ques13" class="row justify-between">
            <div class="col-10 col-md-11">
              Did agent select the correct stage/ disposition?
            </div>
            <div>Score: <q-badge color="primary">10</q-badge></div>
            <div style="display: none" class="small" ref="cat13">CS</div>
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

        <q-btn @click="page--" color="primary" label="Back"></q-btn>
        <q-space></q-space>
        <q-btn type="submit" color="primary" label="Next"></q-btn>
      </div>
    </q-form>

    <q-form
      v-if="page == 3"
      class="custom-width"
      @submit="saveFatalParams"
      ref="myForm"
    >
      <!-- Fatal Parameters  -->
      <div class="row q-pa-sm q-pa-sm-xl q-mt-lg">
        <q-card class="col-12 q-mb-md my-card" ref="ft1">
          <q-card-section>
            Any kinds of miscommitment with user
          </q-card-section>
          <q-card-section>
            <q-list>
              <q-item v-ripple>
                <q-item-section avatar>
                  <q-radio color="red" v-model="ft.ans1" val="11"></q-radio>
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
                  <q-radio color="green" v-model="ft.ans1" val="0"></q-radio>
                </q-item-section>
                <q-item-section>
                  <q-item-label>NO </q-item-label>
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

        <q-card class="col-12 q-mb-md my-card" ref="ft2">
          <q-card-section>
            Wrong selling/Wrong product information
          </q-card-section>
          <q-card-section>
            <q-list>
              <q-item v-ripple>
                <q-item-section avatar>
                  <q-radio color="red" v-model="ft.ans2" val="11"></q-radio>
                </q-item-section>
                <q-item-section>
                  <q-item-label>YES</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <q-list>
              <q-item v-ripple>
                <q-item-section avatar>
                  <q-radio color="green" v-model="ft.ans2" val="0"></q-radio>
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
                  <q-radio color="red" v-model="ft.ans3" val="11"></q-radio>
                </q-item-section>
                <q-item-section>
                  <q-item-label>YES</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <q-list>
              <q-item v-ripple>
                <q-item-section avatar>
                  <q-radio color="green" v-model="ft.ans3" val="0"></q-radio>
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
        <q-btn type="submit" color="primary" label="Next"></q-btn>
      </div>
    </q-form>

    <q-form
      v-if="page == 4"
      class="custom-width"
      @submit="submitForm"
      ref="myForm"
    >
      <!-- feedback  -->
      <div class="row q-pa-sm q-pa-sm-xl q-mt-lg">
        <q-card class="col-12 q-mb-md my-card" ref="ft1">
          <q-card-section>
            Detailed feedback
          </q-card-section>
          <q-card-section>
            <q-input v-model="feedback" filled type="textarea" />
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
import jwt_decode from 'jwt-decode';

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
      leadPhoneNumber: null,
      callDate: null,
      leadStage: null,
      showDatePicker: false,
      date: '',
      feedback: '',

      options: [
        { label: 'YES', value: '11', color: 'green' },
        { label: 'NO', value: '0', color: 'red' },
        { label: 'NA', value: '100', color: 'primary' },
      ],
      optionsWithoutNA: [
        { label: 'YES', value: '11', color: 'green' },
        { label: 'NO', value: '0', color: 'red' },
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
        // ans14: null,
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

    submitForm() {
      console.log('submit form');
      this.$refs.myForm.validate().then(success => {
        if (success) {
          if (
            this.ans.ans1 &&
            this.ans.ans2 &&
            this.ans.ans3 &&
            this.ans.ans4 &&
            this.ans.ans5 &&
            this.ans.ans6 &&
            this.ans.ans7 &&
            this.ans.ans8 &&
            this.ans.ans9 &&
            this.ans.ans10 &&
            this.ans.ans11 &&
            this.ans.ans12 &&
            this.ans.ans13 &&
            // this.ans.ans14 &&
            this.ft.ans1 &&
            this.ft.ans2 &&
            this.ft.ans3 &&
            this.feedback
          ) {
            this.addFeedback(this.feedback);
            this.submitReport({ id: this.id })
              .then(() => {
                this.$q.notify({
                  color: 'green-4',
                  textColor: 'white',
                  icon: 'cloud_done',
                  message: 'Submitted',
                });
                this.$router.push('/reports');
              })
              .catch(err => {
                this.$q.notify({
                  color: 'red-5',
                  textColor: 'white',
                  icon: 'warning',
                  message: err.message,
                });
              });
            // if (status == 'success') {
            //   this.$q.notify({
            //     color: 'green-4',
            //     textColor: 'white',
            //     icon: 'cloud_done',
            //     message: 'Submitted',
            //   });
            //   this.$router.push('/reports');
            // } else {
            //   console.log('error ', status);
            //   this.$q.notify({
            //     color: 'red-5',
            //     textColor: 'white',
            //     icon: 'warning',
            //     message: status.message,
            //   });
            // }
          } else {
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: 'Please fill the form correctly',
            });
          }
        } else {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Please fill the form correctly',
          });
        }
      });

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
      const user = localStorage.getItem('access-token');
      const userDetails = jwt_decode(user);

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
          } else if (data.role == 'team lead') {
            this.tls.push(data.name);
          } else if (data.role == 'senior manager') {
            this.seniorManagers.push(data.name);
          } else if (data.role == 'auditor') {
            this.auditors.push(data.name);
          }
        });
        this.counsellors.sort().reverse();
        this.counsellors.push('NA');
        this.counsellors.reverse();

        this.tls.sort();

        this.seniorManagers.sort();

        this.auditors.sort();

        this.selectedAuditor = userDetails.name;
      });
    },
    saveQuestions() {
      console.log('save form');
      //   console.log('ref', this.$refs['ques14'].$el.children[0]);
      console.log(
        'ref span',
        this.$refs['ques3'].$el.children[1].lastChild.innerText
      );

      console.log('ref', this.$refs.cat3.innerText);

      let ques = [];
      for (let i = 1; i <= 13; i++) {
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
      window.scroll(top);
    },

    saveReport() {
      console.log('save report');
      const reportDetails = {
        counselor: this.selectedCounsellor,
        teamLead: this.selectedTL,
        seniorManager: this.selectedSM,
        auditor: this.selectedAuditor,
        leadId: this.leadId,
        leadPhoneNumber: this.leadPhoneNumber,
        callType: this.selectedCall,
        callDate: this.callDate,
        leadStage: this.leadStage,
        fatalParams: [],
        feedback: '',
      };
      this.addReport(reportDetails);
      this.page++;

      window.scroll(top);
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
      window.scroll(top);
    },
  },
  mounted() {
    this.pupulateData();
    if (this.id) {
      console.log('edit route');
      this.$axios({
        url: `${process.env.API_URL}/report/getReport/${this.id}`,
        method: 'GET',

        headers: {
          authorization: `Bearer${localStorage.getItem('access-token')}`,
        },
      }).then(res => {
        let data = res.data.report;

        this.selectedCounsellor = data.counsellor ? data.counselor : 'NA';
        this.selectedTL = data.teamLead;
        this.selectedSM = data.seniorManager;
        this.selectedAuditor = data.auditor;
        this.selectedCall = data.callType;
        this.leadId = data.leadId;
        this.leadPhoneNumber = data.leadPhoneNumber;
        this.callDate = data.callDate;
        this.leadStage = data.leadStage;
        this.feedback = data.feedback;

        console.log(data.fatalParams);

        let index = 1;
        data.fatalParams.forEach(ft => {
          let ans = `ans${index}`;
          let remark = `remark${index}`;

          this.ft[ans] =
            parseInt(ft.ans) < 11 && ft.ans != 0 ? '11' : ft.ans + '';
          this[remark] = ft.remarks;
          index++;
        });

        console.log('this.ft', this.ft);

        data.questions.sort((a, b) => a.id - b.id);

        let i = 1;
        data.questions.forEach(doc => {
          let data = doc;
          let ans = `ans${i}`;

          if (data.id != 5 && data.id != 8) {
            this.ans[ans] =
              parseInt(data.ans) < 11 && data.ans != 0 ? '11' : data.ans + '';
          } else {
            this.ans[ans] = data.ans;
          }
          i++;
        });

        console.log('questions', this.ans);
      });

      // this.$firestore
      //   .collection('reports')
      //   .doc(this.id)
      //   .collection('questions')
      //   .orderBy('id')
      //   .onSnapshot(querySnapshot => {
      //     let i = 1;
      //     querySnapshot.forEach(doc => {
      //       let data = doc.data();
      //       let ans = `ans${i}`;

      //       if (data.id != 5 && data.id != 8) {
      //         this.ans[ans] =
      //           parseInt(data.ans) < 11 && data.ans != 0 ? '11' : data.ans;
      //       } else {
      //         this.ans[ans] = data.ans;
      //       }
      //       i++;
      //     });
      //   });
    }
  },
  created() {
    this.id = this.$route.params.id;
  },
};
</script>

<style lang="scss" scoped>
.custom-width {
  width: 50%;
}

@media (max-width: 992px) {
  .custom-width {
    width: 80%;
  }
}
@media (max-width: 576px) {
  .custom-width {
    width: 90%;
  }
}
@media (max-width: 430px) {
  .custom-width {
    width: 100%;
  }
}
</style>
