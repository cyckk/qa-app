import { firestore } from 'boot/firebase';

const state = {
  counsellors: [],
  tls: [],
  seniorManagers: [],
  auditors: [],
};

const mutations = {
  fetchData: async (state, payload) => {
    state.counsellors = ['hello'];
    const counsellors = [];
    console.log('populate data mutaion');

    const res = await firestore.collection('users').get();
    //   .then(querySnapshot => {

    //   });

    res.docs.forEach(doc => {
      let data = doc.data();

      if (data.role == 'counsellor') {
        counsellors.push(data.name);
      }

      //   console.log(this.counsellors);
      //   } else if (data.role == 'team lead') {
      //     state.tls.push(data.name);
      //   } else if (data.role == 'senior manager') {
      //     state.seniorManagers.push(data.name);
      //   } else if (data.role == 'auditor') {
      //     state.auditors.push(data.name);
      //   }
    });
    // state.counsellors.sort().reverse();
    // state.counsellors.push('NA');
    // state.counsellors.reverse();

    counsellors.sort();
    state.counsellors = counsellors;

    // state.counsellors.sort();

    // state.tls.sort();

    // state.seniorManagers.sort();

    // state.auditors.sort();

    console.log('counsellor array inside mutation ', state.counsellors);
  },
};

const actions = {
  fetchData: ({ commit }, payload) => {
    console.log('populate data action');
    commit('fetchData', payload);
  },
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
