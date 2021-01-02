<template>
  <q-card
    class="my-card text-white"
    :class="clockInTime ? 'bg-light-green-7' : 'bg-orange-7'"
  >
    <q-card-section class="">
      <div class="text-h6">
        {{
          clockInTime ? 'Clock started at:' : 'You are currently Clocked Out'
        }}
      </div>
      <div class="text-subtitle2">{{ clockInTime }}</div>
    </q-card-section>

    <q-card-actions>
      <!-- <q-btn flat>Action 1</q-btn> -->
      <q-icon
        class="text-center q-pl-md q-pr-md"
        size="xl"
        style="size: 40px"
        name="schedule"
      ></q-icon>

      <q-space></q-space>
      <q-btn v-if="!clockInTime" @click="clockIn" color="dark">Clock In</q-btn>
      <q-btn v-else @click="clockOut" color="dark">Clock Out</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import firebase from 'firebase';
export default {
  props: ['clockInTime'],
  data() {
    return {
      //   clockInTime: '',
      clockOutTime: '',
      clockToggle: false,
    };
  },

  methods: {
    clockIn() {
      const date = new Date();
      const todaysTimestamp = Math.round(
        date.getTime() / (1000 * 60 * 60 * 24)
      );

      const now = firebase.firestore.FieldValue.serverTimestamp();
      this.clockInTime = new Date(now).toLocaleTimeString();

      console.log('todaysTimestamp ', todaysTimestamp);

      this.$auth.onAuthStateChanged(user => {
        if (user) {
          const currentUser = this.$auth.currentUser;

          console.log('current user ', currentUser.uid);

          const customId = `${currentUser.uid}-${todaysTimestamp}`;

          this.$firestore
            .collection('timeCards')
            .doc(customId)
            .set({
              clockIn: now,
              uid: currentUser.uid,
            })
            .then(() => {
              console.log('clocked in ');
              this.$firestore
                .collection('users')
                .doc(currentUser.uid)
                .set(
                  {
                    clockInTime: now,
                  },
                  { merge: true }
                )
                .then(() => {
                  console.log('clock in time saved in users collection');
                });
              this.clockToggle = true;
            });
        }
      });
    },

    clockOut() {
      const date = new Date();
      const todaysTimestamp = Math.round(
        date.getTime() / (1000 * 60 * 60 * 24)
      );

      const now = firebase.firestore.FieldValue.serverTimestamp();

      console.log('todaysTimestamp ', todaysTimestamp);

      this.$auth.onAuthStateChanged(user => {
        if (user) {
          const currentUser = this.$auth.currentUser;

          console.log('current user ', currentUser.uid);

          const customId = `${currentUser.uid}-${todaysTimestamp}`;

          this.$firestore
            .collection('timeCards')
            .doc(customId)
            .set(
              {
                clockOut: now,
              },
              { merge: true }
            )
            .then(async () => {
              console.log('clocked out ');
              //   this.clockToggle = false;
              await this.$firestore
                .collection('users')
                .doc(currentUser.uid)
                .set(
                  {
                    clockInTime: '',
                  },
                  { merge: true }
                );
              this.clockInTime = '';
            });
        }
      });
    },
  },
  mounted() {
    // this.$auth.onAuthStateChanged(user => {
    //   if (user) {
    //     const currentUser = this.$auth.currentUser;
    //     console.log('current user ', currentUser.uid);
    //     this.$firestore
    //       .collection('users')
    //       .doc(currentUser.uid)
    //       .onSnapshot(doc => {
    //         this.clockInTime = doc
    //           .data()
    //           .clockInTime.toDate()
    //           .toLocaleTimeString();
    //         console.log('clock in time', this.clockInTime);
    //       });
    //   }
    // });
  },
};
</script>

<style></style>
