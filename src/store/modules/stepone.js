const state = {
  date: new Date(),
  checkinDate: null,
  checkoutDate: null
}
const getters = {
  getCheckinDate(state) {
    return state.checkinDate
  },
  getCheckoutDate(state) {
    return state.checkoutDate
  },
  minDate(state) {
    let _date = state.date
    let day = '' + _date.getDate()
    let month = '' + (_date.getMonth() + 1)
    let year = _date.getFullYear()

    _date.setDate(_date.getDate() + 1)
    month.length < 2 && (month = '0' + month)
    day.length < 2 && (day = '0' + day)
    return [year, month, day].join('-')
  }
}
const mutations = {
  setCheckinDate(state, payload) {
    state.checkinDate = payload
  },
  setCheckoutDate(state, payload) {
    state.checkoutDate = payload
  }
}
const actions = {
}

export default {
  state,
  getters,
  mutations,
  actions
}