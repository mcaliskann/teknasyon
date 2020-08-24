<template>
  <section class="container">
    <v-row>
      <v-col cols="12" md="4">
        <h3>
          <i class="v-icon notranslate mdi mdi-calendar theme--light"></i>
          Check-in: {{checkinDate}}
        </h3>
      </v-col>
      <v-col cols="12" md="4">
        <h3>
          <i class="v-icon notranslate mdi mdi-calendar theme--light"></i>
          Checkout: {{checkoutDate}}
        </h3>
      </v-col>
      <v-col cols="12" md="4">
        <h3>Oda Tipi: {{roomType}} / {{roomView}}</h3>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="12" md="6">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              :maxlength="30"
              v-model="cardName"
              label="Kart Üzerindeki İsim ve Soyisim"
              @focus="focusInput('cardName')"
              @blur="blurInput('cardName')"
              :class="{
                'has-error': (buttonStatus && !this.$v.cardName.required) || (buttonStatus &&  !this.$v.cardName.minLength),
                'has-success': !this.$v.cardName.$invalid,
                }"
            ></v-text-field>
            <label
              v-if="buttonStatus && !this.$v.cardName.required"
              for
              class="error"
            >Lütfen isim ve soyisim giriniz</label>
            <label
              v-if="buttonStatus &&  !this.$v.cardName.minLength"
              for
              class="error"
            >Lütfen minimum 3 karakter giriniz</label>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              type="tel"
              v-model="cardNumber"
              v-mask="'#### #### #### ####'"
              label="Kart Numarası"
              @focus="focusInput('cardNumber')"
              @blur="blurInput('cardNumber')"
              :class="{
                'has-error': (buttonStatus && !this.$v.cardNumber.required) || (buttonStatus &&  !this.$v.cardNumber.minLength),
                'has-success': !this.$v.cardNumber.$invalid,
                }"
            ></v-text-field>
            <label
              v-if="buttonStatus && !this.$v.cardNumber.required"
              for
              class="error"
            >Lütfen kart numaranızı giriniz</label>
            <label
              v-if="buttonStatus &&  !this.$v.cardNumber.minLength"
              for
              class="error"
            >Lütfen kart numaranızın tamamını giriniz</label>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              type="tel"
              v-mask="'##/##'"
              v-model="cardDate"
              label="Son Kullanma Tarihi"
              @focus="focusInput('cardDate')"
              @blur="blurInput('cardDate')"
              :class="{
                'has-error': (buttonStatus && !this.$v.cardDate.required) || (buttonStatus &&  !this.$v.cardDate.minLength),
                'has-success': !this.$v.cardDate.$invalid,
                }"
            ></v-text-field>
            <label
              v-if="buttonStatus && !this.$v.cardDate.required"
              for
              class="error"
            >Lütfen kartınızın son kullanma tarihini giriniz</label>
            <label
              v-if="buttonStatus &&  !this.$v.cardDate.minLength"
              for
              class="error"
            >Lütfen kartınızın son kullanma tarihinin tamamını giriniz</label>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              type="tel"
              v-mask="'###'"
              v-model="cardCVC"
              label="Güvenlik Numarası (CVC)"
              @focus="focusInput('cardCVC')"
              @blur="blurInput('cardCVC')"
              :class="{
                'has-error': (buttonStatus && !this.$v.cardCVC.required) || (buttonStatus &&  !this.$v.cardCVC.minLength),
                'has-success': !this.$v.cardCVC.$invalid,
                }"
            ></v-text-field>
            <label
              v-if="buttonStatus && !this.$v.cardCVC.required"
              for
              class="error"
            >Lütfen kartınızın güvenlik numarasını giriniz</label>
            <label
              v-if="buttonStatus &&  !this.$v.cardCVC.minLength"
              for
              class="error"
            >Lütfen kartınızın güvenlik numarasının tamamını giriniz</label>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="6">
        <div :class="`mx-auto card ${back}`">
          <span class="card__number">{{!cardNumber ? placeNumber : cardNumber }}</span>
          <span class="card__name">{{!cardName ? placeName : cardName }}</span>
          <span class="card__date">{{!cardDate ? placeDate : cardDate }}</span>
          <span class="card__cvc">{{!cardCVC ? placeCVC : cardCVC }}</span>

          <span class="card__logo"></span>
          <span class="card__bg"></span>
        </div>
      </v-col>
    </v-row>
    <app-button class="float-left" @click.native="prevStep" :index="stepIndex-1">Geri</app-button>
    <app-button @click.native="nextStep" :index="stepIndex">Ödeme Yap</app-button>
  </section>
</template>
<script>
import button from "./buttons/button";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  components: {
    appButton: button,
  },
  data() {
    return {
      back: false,
      cardNumber: null,
      cardName: null,
      cardDate: null,
      cardCVC: null,
      placeNumber: "0000 0000 0000 0000",
      placeName: "Teknasyon",
      placeDate: "00/00",
      placeCVC: "000",
      stepIndex: null,
      buttonStatus: false,
    };
  },
  validations: {
    cardNumber: {
      required,
      minLength: minLength(19),
    },
    cardName: {
      required,
      minLength: minLength(6),
    },
    cardDate: {
      required,
      minLength: minLength(5),
    },
    cardCVC: {
      required,
      minLength: minLength(3),
    },
  },
  watch: {
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
    roomType() {
      return this.$store.getters.getRoomType;
    },
    roomView() {
      return this.$store.getters.getRoomView;
    },
  },
  methods: {
    prevStep() {
      this.$store.commit("setActiveStep", 2);
    },
    nextStep() {
      this.buttonStatus = true;
      if (this.stepIndex === null && !this.$v.$invalid) {
        this.$store.commit("setCompletedStep", 4);
      }
      !this.$v.$invalid ? (this.stepIndex = 4) : "";

      const cardDetail = {
        name: this.cardName,
        number: this.cardNumber,
        date: this.cardDate,
        cvc: this.cardCVC,
      };
      this.$store.commit("setCard", cardDetail);
    },
    focusInput(type) {
      if (type === "cardCVC") {
        this.back = true;
      }
    },
    blurInput(type) {
      if (type === "cardCVC") {
        this.back = false;
      }
    },
  },
  created() {
    const storage = JSON.parse(localStorage.getItem("reservationData"));
    if (storage != null) {
      this.cardName = storage.card.name;
      this.cardNumber = storage.card.number;
      this.cardDate = storage.card.date;
      this.cardCVC = storage.card.cvc;
    }
  },
};
</script>
<style lang="less">
.card {
  width: 400px;
  height: 230px;
  border-radius: 8px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  transition: 0.5s;

  @media screen and (max-width: 767px) {
    width: 100%;
    height: 280px;
  }
  @media screen and (max-width: 450px) {
    width: 100%;
    height: 200px;
  }

  &__cvc {
    opacity: 0;
    z-index: 3;
    width: 100%;
    text-align: left;
    background: #000;
    color: #fff;
    padding: 10px;
    margin: 0 0 20px 0;
    position: absolute;
    font-size: 25px;
    transform: rotateY(180deg);
    text-align: right;
  }
  &__number {
    z-index: 3;
    width: 100%;
    text-align: center;
    font-size: 38px;
    color: #909090;
    margin: 40px 0 0 0;
    background-color: #ffffff;
    border: solid 1px #e0e0e0;

    @media screen and (max-width: 450px) {
      font-size: 20px;
    }
  }

  &__name,
  &__date {
    z-index: 3;
    padding: 0 20px 20px 20px;
    color: white;
    font-size: 20px;
    @media screen and (max-width: 450px) {
      font-size: 12px;
    }
  }

  &__bg,
  &__logo {
    position: absolute;
  }

  &__logo {
    background-image: url(/img/logo.82383bed.png);
    background-repeat: no-repeat;
    background-position: left top;
    z-index: 2;
    background-size: 100%;
    width: 100px;
    height: 63px;
    top: 5px;
    background-color: white;
    left: 6px;
    border-radius: 9px;
  }

  &__bg {
    background: #000000;
    background: -webkit-linear-gradient(to right, #333333, #000000);
    background: linear-gradient(to right, #333333, #000000);
    width: 100%;
    border-radius: 8px;
    height: 100%;
  }

  > * {
    transition: 0.5s;
  }
  &.true {
    transform: rotateY(180deg);
    .card__number,
    .card__name,
    .card__date {
      opacity: 0;
    }
    .card__logo {
      transform: rotateY(180deg);
    }
    .card__cvc {
      opacity: 1;
      display: inline-block;
      position: static;
    }
  }
}
</style>