<template>
  <section class="container">
    <v-row>
      <v-col cols="12" md="6">
        <h3><i class="v-icon notranslate mdi mdi-calendar theme--light"></i>Check-in: {{checkinDate}}</h3>
      </v-col>
      <v-col cols="12" md="6">
        <h3><i class="v-icon notranslate mdi mdi-calendar theme--light"></i>Checkout: {{checkoutDate}}</h3>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <h4>Oda Tipi:</h4>
    <v-row  :class="{'has-error': buttonStatus && !this.$v.roomView.required}">  
      <v-col cols="12" sm="12" md="7">
        <v-radio-group
          :row="true"
          v-model="roomType"         
        >
          <v-radio value="Standart" label="Standart"></v-radio>
          <v-radio value="Deluxe" label="Deluxe"></v-radio>
          <v-radio value="Suit" label="Suit"></v-radio>
        </v-radio-group>
        <label
          v-if="buttonStatus && !this.$v.roomType.required"
          for
          class="error"
        >Lütfen Oda Tipini Seçiniz</label>
      </v-col>
    </v-row>
    <h4>Manzara Seçimi:</h4>
    <v-row  :class="{'has-error': buttonStatus && !this.$v.roomView.required}">
      <v-col cols="12" sm="12" md="7">
        <v-radio-group
          :row="true"
          v-model="roomView"        
        >
          <v-radio value="Deniz" label="Deniz"></v-radio>
          <v-radio value="Kara" label="Kara"></v-radio>
        </v-radio-group>
        <label
          v-if="buttonStatus && !this.$v.roomView.required"
          for
          class="error"
        >Lütfen Manzara Tipini Seçiniz</label>
      </v-col>
    </v-row>
    <app-button class="float-left" @click.native="prevStep" :index="stepIndex-1">Geri</app-button>
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
  data() {
    return {
      roomType: null,
      roomView: null,
      stepIndex: null,
      buttonStatus: false,
    };
  },
  validations: {
    roomType: {
      required,
    },
    roomView: {
      required,
    },
  },
  methods: {
    prevStep() {
      this.$store.commit("setActiveStep", 1);
    },
    nextStep() {
      this.buttonStatus = true;
      if (this.stepIndex === null && !this.$v.$invalid) {
        this.$store.commit("setCompletedStep", 3);
      }
      !this.$v.$invalid ? (this.stepIndex = 3) : "";
    },
  },
  watch: {
    roomType() {
      this.$store.commit("setRoomType", this.roomType);
    },
    roomView() {
      this.$store.commit("setRoomView", this.roomView);
    },
    stepIndex() {
      this.$store.commit("setActiveStep", this.stepIndex);
    },
  },
  computed: {
    checkinDate() {
      return this.$store.getters.getCheckinDate;
    },
    checkoutDate() {
      return this.$store.getters.getCheckoutDate;
    },
  },
  created() {
    const storage = JSON.parse(localStorage.getItem("reservationData"));
    if (storage != null) {
      this.roomType = storage.room.type;
      this.roomView = storage.room.view;
    }
  },
};
</script>
<style lang="less">
.has-error {
  .theme--light.v-icon {
    color: Red;
  }
}

.v-stepper__wrapper .error{
  left:0;
}

.v-input--radio-group.v-input--radio-group--row .v-radio {
  @media screen and (max-width: 450px) {
    width: 100%;
    margin: 5px 0;
  }
}
.v-input--selection-controls {
  @media screen and (max-width: 1024px) {
    margin: 0 !important;
    padding: 0 !important;
  }
}
.v-icon{
  margin-right: 10px;
}
</style>