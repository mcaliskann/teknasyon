<template>
  <section class="container">
   
    <v-card
      class="mx-auto"
      max-width="100%"
      tile
    >

     <v-alert
      color="success"
      dark
      icon="mdi-check"
      border="top"
    >
      Sayın {{cardDetail.name}}, rezervasyon başarıyla oluşturuldu. {{checkinDate}} tarihinde sizi otelimize bekliyoruz. Detaylar aşağıda yer almaktadır.
    </v-alert>
    
      <v-row>
        <v-col cols="12" md="6">
          <v-card-title>Check-in</v-card-title>
          <v-card-text><i class="v-icon notranslate mdi mdi-calendar theme--light"></i> {{checkinDate}}</v-card-text>
        </v-col>
        <v-col cols="12" md="6">
          <v-card-title>Checkout</v-card-title>
           <v-card-text><i class="v-icon notranslate mdi mdi-calendar theme--light"></i> {{checkoutDate}}</v-card-text>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12" md="6">
          <v-card-title>Oda Tipi:</v-card-title>
           <v-card-text>{{roomType}}</v-card-text>
        </v-col>
        <v-col cols="12" md="6">
          <v-card-title>Manzara Tipi: </v-card-title>
          <v-card-text>{{roomView}}</v-card-text>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12" md="6">
          <v-card-title>Kart Üzerindeki İsim</v-card-title>
          <v-card-text>{{cardDetail.name}}</v-card-text>
        </v-col>
        <v-col cols="12" md="6">
          <v-card-title>Kart Numarası</v-card-title>
          <v-card-text>{{ cardDetail.number}}</v-card-text>
        </v-col>
      </v-row> 
    </v-card>
  </section>
</template>
<script>
export default {
  computed: {
    checkinDate () {
      return this.$store.getters.getCheckinDate
    },
    checkoutDate () {
      return this.$store.getters.getCheckoutDate
    },
    roomType () {
      return this.$store.getters.getRoomType
    },
    roomView () {
      return this.$store.getters.getRoomView
    },
    cardDetail () {
      return this.$store.getters.getCard
    },
    activeStep () {
      return this.$store.getters.getActiveStep
    }
  },
  watch: {
    activeStep () {
      if(this.activeStep === 4){
        const obj = {
          date: {
            checkin: this.checkinDate,
            checkout: this.checkoutDate,
          },
          room: {
            type: this.roomType,
            view: this.roomView
          },
          card: this.cardDetail
        }
        localStorage.setItem("reservationData", JSON.stringify(obj));
      }
    }
  },
}
</script>
<style lang="less">

</style>