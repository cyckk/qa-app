// import { format } from 'core-js/fn/date';
import firebase from 'firebase';
import { firestore } from '../boot/firebase';
import axios from 'axios';

const state = {
  reportDetails: {
    counsellor: '',
    teamLead: '',
    seniorManager: '',
    auditor: '',
    leadId: '',
    leadPhoneNumber: '',
    callType: '',
    callDate: '',
    leadStage: '',
    fatalParams: [],
    feedback: '',
    questions: [
      {
        id: 1,
        question: '',
        answer: '',
      },
      {
        id: 2,
        question: '',
        answer: '',
      },
    ],
  },

  questions: [
    {
      id: 1,
      question: '',
      answer: '',
    },
    {
      id: 2,
      question: '',
      answer: '',
    },
  ],
};

const mutations = {
  addQuestions: (state, payload) => {
    console.log('addQuestions mutation ', payload);
    state.reportDetails.questions = payload;
    console.log(state.questions);
  },
  addReport: (state, payload) => {
    console.log('addReport mutation ', payload);

    state.reportDetails = payload;
    console.log(state.reportDetails);
  },

  addFatalParams: (state, payload) => {
    state.reportDetails.fatalParams = payload;
    console.log(state.reportDetails);
  },

  addFeedback: (state, payload) => {
    console.log('addFeedback mutation');
    state.reportDetails.feedback = payload;
    console.log(state.reportDetails);
  },
};

const actions = {
  addQuestions: ({ commit }, payload) => {
    console.log('addQuestions action');

    // let totalMarks = 0;
    // let totalMarksCS = 0;
    // let totalMarksP = 0;
    // let totalMarksPK = 0;
    // let totalMarksPR = 0;

    // let scoreCS = 0;
    // let scoreP = 0;
    // let scorePK = 0;
    // let scorePR = 0;
    // let score = 0;
    // state.questions.forEach(question => {
    //   if (question.category.includes('CS')) {
    //     scoreCS += question.ans == 100 ? 0 : question.ans;
    //     totalMarksCS += question.ans == 100 ? 0 : question.marks;
    //   } else if (question.category.includes('P')) {
    //     scoreP += question.ans == 100 ? 0 : question.ans;
    //     totalMarksP += question.ans == 100 ? 0 : question.marks;
    //   } else if (question.category.includes('PK')) {
    //     scorePK += question.ans == 100 ? 0 : question.ans;
    //     totalMarksPK += question.ans == 100 ? 0 : question.marks;
    //   } else if (question.category.includes('PR')) {
    //     scorePR += question.ans == 100 ? 0 : question.ans;
    //     totalMarksPR += question.ans == 100 ? 0 : question.marks;
    //   } else {
    //     score += question.ans == 100 ? 0 : question.ans;
    //     totalMarks += question.ans == 100 ? 0 : question.marks;
    //   }
    // });

    // let totalScore = scoreCS + scoreP + scorePK + scorePR + score;
    // let totalMarksAll =
    //   totalMarks + totalMarksCS + totalMarksP + totalMarksPK + totalMarksPR;

    // console.log('totalScore ', totalScore);
    // console.log('totalMarks ', totalMarksAll);

    commit('addQuestions', payload);
  },

  addReport: ({ commit }, payload) => {
    console.log('addReport action');

    commit('addReport', payload);
  },

  addFatalParams: ({ commit }, payload) => {
    commit('addFatalParams', payload);
  },

  addFeedback: ({ commit }, payload) => {
    console.log('addFeedback action', payload);
    commit('addFeedback', payload);
  },

  submitReport: ({ state }, payload) => {
    console.log('reportDetail ', JSON.stringify(state.reportDetails));
    console.log('payload ', payload);
    if (!payload.id) {
      axios({
        url: `${process.env.API_URL}/report/addReport`,
        method: 'POST',
        data: {
          reportDetails: {
            ...state.reportDetails,
            createdAt: Date.now(),
            updatedAt: Date.now(),
          },
        },
        headers: {
          authorization: `Bearer${localStorage.getItem('access-token')}`,
        },
      })
        .then(res => {
          console.log('response ', res);
        })
        .catch(err => {
          console.log('error ', err);
        });
    } else {
      axios({
        url: `${process.env.API_URL}/report/editReport/${payload.id}`,
        method: 'POST',
        data: {
          reportDetails: { ...state.reportDetails, updatedAt: Date.now() },
        },
        headers: {
          authorization: `Bearer${localStorage.getItem('access-token')}`,
        },
      })
        .then(res => {
          console.log('response ', res);
        })
        .catch(err => {
          console.log('error ', err);
        });
    }
  },

  // submitReport: ({ state }, payload) => {
  //   const error = null;
  //   console.log('submit form ');
  //   console.log('state data', state.reportDetails);

  //   // const reportDetails = {
  //   //   counsellor: this.selectedCounsellor,
  //   //   teamLead: this.selectedTL,
  //   //   seniorManager: this.selectedSM,
  //   //   auditor: this.selectedAuditor,
  //   //   callType: this.selectedCall,
  //   //   leadId: this.leadId,
  //   //   callDate: this.callDate,
  //   //   leadStage: this.leadStage,
  //   // };
  //   // console.log(reportDetails);
  //   let dbRef = firestore.collection('reports').doc();
  //   if (payload.id) {
  //     dbRef = firestore.collection('reports').doc(payload.id);

  //     dbRef
  //       .collection('questions')
  //       .get()
  //       .then(querySnapshot => {
  //         querySnapshot.forEach(doc => {
  //           dbRef
  //             .collection('questions')
  //             .doc(doc.id)
  //             .delete()
  //             .then(res => console.log('deleted ', res))
  //             .catch(err => console.log('error removing data ', err));
  //         });
  //       })
  //       .catch(err => {
  //         error = err;
  //       });
  //   }
  //   console.log('dbref ', dbRef.id);

  //   dbRef
  //     .set(state.reportDetails, { merge: true })
  //     .then(res => {
  //       console.log('res from firestore ');
  //       let batch = firestore.batch();

  //       state.questions.forEach(question => {
  //         console.log();
  //         let quesRef = dbRef.collection('questions').doc();
  //         batch.set(quesRef, question);
  //       });
  //       batch.commit().then(res => console.log('batch added'));

  //       let totalMarks = 0;
  //       let totalMarksCS = 0;
  //       let totalMarksP = 0;
  //       let totalMarksPK = 0;
  //       let totalMarksPR = 0;

  //       let scoreCS = 0;
  //       let scoreP = 0;
  //       let scorePK = 0;
  //       let scorePR = 0;
  //       let score = 0;
  //       state.questions.forEach(question => {
  //         //   if (question.category.includes('CS')) {
  //         //     scoreCS += question.ans == 100 ? 0 : parseInt(question.ans);
  //         //     totalMarksCS += question.ans == 100 ? 0 : parseInt(question.marks);
  //         //   } else if (question.category.includes('P')) {
  //         //     scoreP += question.ans == 100 ? 0 : parseInt(question.ans);
  //         //     totalMarksP += question.ans == 100 ? 0 : parseInt(question.marks);
  //         //   } else if (question.category.includes('PK')) {
  //         //     scorePK += question.ans == 100 ? 0 : parseInt(question.ans);
  //         //     totalMarksPK += question.ans == 100 ? 0 : parseInt(question.marks);
  //         //   } else if (question.category.includes('PR')) {
  //         //     scorePR += question.ans == 100 ? 0 : parseInt(question.ans);
  //         //     totalMarksPR += question.ans == 100 ? 0 : parseInt(question.marks);
  //         //   } else {
  //         //     score += question.ans == 100 ? 0 : parseInt(question.ans);
  //         //     totalMarks += question.ans == 100 ? 0 : parseInt(question.marks);
  //         //   }

  //         scoreCS +=
  //           question.category.includes('CS') && question.ans != 100
  //             ? parseInt(question.ans)
  //             : 0;
  //         totalMarksCS +=
  //           question.category.includes('CS') && question.ans != 100
  //             ? parseInt(question.marks)
  //             : 0;

  //         scoreP +=
  //           question.category.includes('P') && question.ans != 100
  //             ? parseInt(question.ans)
  //             : 0;
  //         totalMarksP +=
  //           question.category.includes('P') && question.ans != 100
  //             ? parseInt(question.marks)
  //             : 0;

  //         scorePK +=
  //           question.category.includes('PK') && question.ans != 100
  //             ? parseInt(question.ans)
  //             : 0;
  //         totalMarksPK +=
  //           question.category.includes('PK') && question.ans != 100
  //             ? parseInt(question.marks)
  //             : 0;

  //         scorePR +=
  //           question.category.includes('PR') && question.ans != 100
  //             ? parseInt(question.ans)
  //             : 0;
  //         totalMarksPR +=
  //           question.category.includes('PR') && question.ans != 100
  //             ? parseInt(question.marks)
  //             : 0;

  //         score += question.ans != 100 ? parseInt(question.ans) : 0;
  //         console.log('score ', score);
  //         totalMarks += question.ans != 100 ? parseInt(question.marks) : 0;
  //         console.log('totalMarks ', totalMarks);
  //       });

  //       // let totalScore = scoreCS + scoreP + scorePK + scorePR + score;
  //       // let totalMarksAll =
  //       //   totalMarks + totalMarksCS + totalMarksP + totalMarksPK + totalMarksPR;

  //       console.log('totalScore ', score);
  //       console.log('totalMarks ', totalMarks);

  //       firestore
  //         .collection('grades')
  //         .doc(dbRef.id)
  //         .set({
  //           score: score,
  //           totalMarks: totalMarks,
  //           scoreCS,
  //           totalMarksCS,
  //           scoreP,
  //           totalMarksP,
  //           scorePK,
  //           totalMarksPK,
  //           scorePR,
  //           totalMarksPR,
  //         })
  //         .then(() => {
  //           console.log('grades saved!');
  //           console.log('report details ');
  //           let reportResult = Math.round((score / totalMarks) * 100);
  //           state.reportDetails.fatalParams.forEach(ft => {
  //             if (ft.ans == 11) {
  //               reportResult = 'F';
  //             }
  //           });

  //           dbRef.set({ result: reportResult }, { merge: true }).then(res => {
  //             console.log('status saved! ', res);

  //             //   this.$router.push('/reports');
  //           });
  //         });

  //       if (payload.id) {
  //         dbRef.set(
  //           {
  //             modifiedAt: firebase.firestore.FieldValue.serverTimestamp(),
  //           },
  //           { merge: true }
  //         );
  //       } else {
  //         dbRef.set(
  //           {
  //             createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  //           },
  //           { merge: true }
  //         );
  //       }

  //       // firestore
  //       //   .collection('reports')
  //       //   .doc(res.id)
  //       //   .collection('questions')
  //       //   .add(state.questions[0])
  //       //   .then((res = console.log(res)));
  //     })
  //     .catch(err => {
  //       error = err;
  //     });

  //   // if (!error) {
  //   //   console.log('no error');
  //   //   return 'success';
  //   // } else {
  //   //   console.log('error in submitForm ', error);
  //   //   return error;
  //   // }
  // },
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
