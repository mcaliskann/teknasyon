<template>
  <section class="max-500 container">
    <v-row>
      <v-col cols="12">
        <v-menu
          transition="scale-transition"
          offset-y
          :close-on-content-click="false"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="checkinDate"
              label="Giriş Tarihini Seçiniz"
              prepend-icon="mdi-calendar"
              persistent-hint
              v-bind="attrs"
              v-on="on"
              readonly
            ></v-text-field>
          </template>

          <v-date-picker
            v-model="checkinDate"
            :min="minDate"
            locale="tr"
            @change="changeCheckin"
            no-title
          ></v-date-picker>
        </v-menu>
        <label
          v-if="buttonStatus && this.$v.checkinDate.$invalid"
          for
          class="error"
        >Lütfen Giriş Tarihini Seçiniz</label>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-menu
          transition="scale-transition"
          offset-y
          :close-on-content-click="false"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="checkoutDate"
              label="Çıkış Tarihini Seçiniz"
              prepend-icon="mdi-calendar"
              persistent-hint
              v-bind="attrs"
              v-on="on"
              readonly
              :disabled="!checkinDate"
            ></v-text-field>
          </template>

          <v-date-picker v-model="checkoutDate" :min="checkinDate" no-title locale="tr"></v-date-picker>
        </v-menu>
        <label
          v-if="buttonStatus && this.$v.checkoutDate.$invalid"
          for
          class="error"
        >Lütfen Çıkış Tarihini Seçiniz</label>
      </v-col>
    </v-row>
    <app-button @click.native="nextStep" :index="stepIndex"></app-button>
  </section>
</template>
<script>
import button from "./buttons/button";
import { required } from "vuelidate/lib/validators";
export default {
  components: {
    appButton: button,
  },
  validations: {
    checkinDate: {
      required,
    },
    checkoutDate: {
      required,
    },
  },
  data() {
    return {
      checkinDate: null,
      checkoutDate: null,
      stepIndex: null,
      buttonStatus: false,
      count: 0,
    };
  },
  methods: {
    nextStep() {
      this.buttonStatus = true;
      if (this.stepIndex === null && !this.$v.$invalid) {
        this.$store.commit("setCompletedStep", 2);
      }
      !this.$v.$invalid ? (this.stepIndex = 2) : "";
    },
    changeCheckin() {
      this.checkoutDate = this.checkinDate;
    },
  },
  watch: {
    checkinDate() {
      this.$store.commit("setCheckinDate", this.checkinDate);
    },
    checkoutDate() {
      this.$store.commit("setCheckoutDate", this.checkoutDate);
    },
    stepIndex() {
      this.$store.commit("setActiveStep", this.stepIndex);
    },
  },
  computed: {
    minDate() {
      return this.$store.getters.minDate;
    },
  },
  created() {
    const storage = JSON.parse(localStorage.getItem("reservationData"));
    if (storage != null) {
      this.checkinDate = storage.date.checkin;
      this.checkoutDate = storage.date.checkout;
    }
  },
};
</script>
<style lang="less">
.v-stepper__wrapper {
  .max-500.container {
    max-width: 500px;
    .error {
      left: 32px;
    }
  }
}
</style>