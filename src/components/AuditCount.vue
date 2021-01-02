<template>
  <q-card class="my-card row text-white" :class="`bg-${cardData.color}`">
    <q-card-section class="col-6 q-pa-lg">
      <q-icon class="q-pa-sm" name="edit" size="xl"></q-icon>
      <div class="text-subtitle2">{{ cardData.text }}</div>
    </q-card-section>

    <q-card-section class="col-6 text-right">
      <div class="text-h3">{{ cardData.count }}</div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: ['cardData'],
};
</script>

<style></style>
