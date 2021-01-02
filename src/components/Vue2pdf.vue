<template>
  <div>
    <vue-html2pdf
      :show-layout="false"
      :float-layout="true"
      :enable-download="true"
      :preview-modal="true"
      :paginate-elements-by-height="1400"
      filename="hee hee"
      :pdf-quality="2"
      :manual-pagination="false"
      pdf-format="a4"
      pdf-orientation="landscape"
      pdf-content-width="800px"
      @progress="onProgress($event)"
      @hasStartedGeneration="hasStartedGeneration()"
      @hasGenerated="hasGenerated($event)"
      ref="html2Pdf"
    >
      <section slot="pdf-content">
        <!-- PDF Content Here -->
        <audit-report :paramId="id"></audit-report>
        <h1>Hello world</h1>
      </section>
    </vue-html2pdf>
  </div>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf';

export default {
  data() {
    return {
      id: null,
    };
  },
  methods: {
    /*
            Generate Report using refs and calling the
            refs function generatePdf()
        */
    generateReport() {
      this.$refs.html2Pdf.generatePdf();
    },

    hasStartedGeneration() {},
  },

  components: {
    VueHtml2pdf,
    auditReport: () => import('pages/Report.vue'),
  },

  created() {
    this.id = this.$route.params.id;
  },
  updated() {
    this.generateReport();
  },
};
</script>

<style></style>
