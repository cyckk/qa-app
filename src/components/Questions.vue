<template>
  <div>
    <div>
      <q-card class="col-12 q-mb-md my-card">
        <q-card-section>
          Greeted the customer properly
        </q-card-section>
        <q-card-section>
          <q-option-group
            :options="optionsWithoutNA"
            label="Notifications"
            type="radio"
            v-model="group"
          />
        </q-card-section>
      </q-card>

      <q-card class="col-12 q-mb-md my-card">
        <q-card-section>
          Introduced himself/herself, data trained and Was able to explain the
          reason of the call
        </q-card-section>
        <q-card-section>
          <q-option-group
            :options="options"
            label="Notifications"
            type="radio"
            v-model="group"
          />
        </q-card-section>
      </q-card>

      <q-card class="col-12 q-mb-md my-card">
        <q-card-section>
          Was able to probe the requirement of customer/ Create Need of the
          product
        </q-card-section>
        <q-card-section>
          <q-option-group
            :options="options"
            label="Notifications"
            type="radio"
            v-model="group"
          />
        </q-card-section>
      </q-card>

      <q-card class="col-12 q-mb-md my-card">
        <q-card-section>
          Asked for the qualification background & Work Experience
        </q-card-section>
        <q-card-section>
          <q-option-group
            :options="options"
            label="Notifications"
            type="radio"
            v-model="group"
          />
        </q-card-section>
      </q-card>

      <q-card class="col-12 q-mb-md my-card">
        <q-card-section>
          Was able to explain Data Science with Example
        </q-card-section>
        <q-card-section>
          <q-item>
            <q-item-section side>
              <q-icon name="volume_down" />
            </q-item-section>
            <q-item-section>
              <q-slider v-model="volume" :min="0" :max="10" label markers />
            </q-item-section>
            <q-item-section side>
              <q-icon name="volume_up" />
            </q-item-section>
          </q-item>
        </q-card-section>
      </q-card>

      <q-card class="col-12 q-mb-md my-card">
        <q-card-section>
          Was the agent able to tell the pricing plans/payment options?
        </q-card-section>
        <q-card-section>
          <q-option-group
            :options="options"
            label="Notifications"
            type="radio"
            v-model="group"
          />
        </q-card-section>
      </q-card>

      <q-card class="col-12 q-mb-md my-card">
        <q-card-section>
          Was the agent able to understand customer's concern
        </q-card-section>
        <q-card-section>
          <q-option-group
            :options="options"
            label="Notifications"
            type="radio"
            v-model="group"
          />
        </q-card-section>
      </q-card>

      <q-card class="col-12 q-mb-md my-card">
        <q-card-section>
          Did the associate informed about placement and other benefits of
          course
        </q-card-section>
        <q-card-section>
          <q-item>
            <q-item-section side>
              <q-icon name="volume_down" />
            </q-item-section>
            <q-item-section>
              <q-slider v-model="volume" :min="0" :max="10" label markers />
            </q-item-section>
            <q-item-section side>
              <q-icon name="volume_up" />
            </q-item-section>
          </q-item>
        </q-card-section>
      </q-card>

      <q-card class="col-12 q-mb-md my-card">
        <q-card-section>
          Thanked for the customer's time and patience and closed the call well/
          Followup created
        </q-card-section>
        <q-card-section>
          <q-option-group
            :options="options"
            label="Notifications"
            type="radio"
            v-model="group"
          />
        </q-card-section>
      </q-card>

      <q-card class="col-12 q-mb-md my-card">
        <q-card-section>
          Did the associate switch the language according to customer’s request?
        </q-card-section>
        <q-card-section>
          <q-option-group
            :options="optionsWithoutNA"
            label="Notifications"
            type="radio"
            v-model="group"
          />
        </q-card-section>
      </q-card>

      <q-card class="col-12 q-mb-md my-card">
        <q-card-section>
          Did the associate allow the user to speak without being
          interrupted?/Active listening
        </q-card-section>
        <q-card-section>
          <q-option-group
            :options="optionsWithoutNA"
            label="Notifications"
            type="radio"
            v-model="group"
          />
        </q-card-section>
      </q-card>

      <q-card class="col-12 q-mb-md my-card">
        <q-card-section>
          Active Listening
        </q-card-section>
        <q-card-section>
          <q-option-group
            :options="optionsWithoutNA"
            label="Notifications"
            type="radio"
            v-model="group"
          />
        </q-card-section>
      </q-card>

      <q-card class="col-12 q-mb-md my-card">
        <q-card-section>
          Did the agent update notes properly?
        </q-card-section>
        <q-card-section>
          <q-option-group
            :options="optionsWithoutNA"
            label="Notifications"
            type="radio"
            v-model="group"
          />
        </q-card-section>
      </q-card>

      <q-card class="col-12 q-mb-md my-card">
        <q-card-section>
          Did agent select the correct stage/ disposition?
        </q-card-section>
        <q-card-section>
          <q-option-group
            :options="optionsWithoutNA"
            label="Notifications"
            type="radio"
            v-model="group"
          />
        </q-card-section>
      </q-card>

      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      group: null,
      options: [
        { label: 'YES', value: '1' },
        { label: 'NO', value: '0', color: 'green' },
        { label: 'NA', value: '10', color: 'red' },
      ],
      optionsWithoutNA: [
        { label: 'YES', value: '1' },
        { label: 'NO', value: '0', color: 'green' },
      ],
    };
  },
};
</script>

<style></style>
