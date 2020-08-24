<template>
  <div class="home">
    <v-stepper
    @change="changeStep"
    v-model="stepIndex"
    >
      <v-stepper-header>
        <v-stepper-step
        :editable="completedStep > 0"
        :complete="activeStep > 1"
        step="1"
        >
        Tarih Seçimi
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
        :editable="completedStep > 1"
        :complete="activeStep > 2"
        step="2"
        >
        Oda Seçimi
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
        :editable="completedStep > 2"
        :complete="activeStep > 3"
        step="3"
        >
        Ödeme
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
        :editable="completedStep > 4"
        :complete="activeStep > 4"
        step="4"
        >
        Sonuç
        </v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <step-one></step-one>
        </v-stepper-content>
        <v-stepper-content step="2">
          <step-two></step-two>
        </v-stepper-content>
        <v-stepper-content step="3">
          <step-three></step-three>
        </v-stepper-content>
        <v-stepper-content step="4">
          <step-success></step-success>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div> 
</template>

<script> 
import stepOne from "../components/step-one"
import stepTwo from "../components/step-two"
import stepThree from "../components/step-three"
import stepSuccess from "../components/step-success"
export default {
    components: {
      stepOne,
      stepTwo,
      stepThree,
      stepSuccess
    },
    data () {
      return {
        stepIndex: 1,
      }
    },
    computed: {
      activeStep () {
        return this.$store.getters.getActiveStep
      },
      completedStep () {
        return this.$store.getters.getCompletedStep
      }
    },
    watch: {
      activeStep () {
        this.stepIndex = this.activeStep
      },
      stepIndex () {
        this.$store.commit("setActiveStep", Number(this.stepIndex))
      }
    },
    methods: {
     changeStep ()  {
       this.$store.commit("setActiveStep", this.activeStep)
     }
    }
  }
</script>
<style lang="less">
.container{
  max-width: 1170px;
}
 .error {
    color: white;
    padding: 5px 10px;
    font-size: 12px;
    top: -12px;
    position: relative;
    left: 0;
 }


 .v-stepper__step__step .v-icon.v-icon{
    font-size:12px !important;
    font-weight: normal;
    margin: 2px;
 }
 
 hr{
   margin: 20px 0;
 }

</style>