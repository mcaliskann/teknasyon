// import * as types from '../mutations' burada bu şekilde type lar import edilebilir

const state = {
  activeStep: 0,
  completedStep: 0
}

// servis olmadığı için getters kullandım.
const getters = {
  getActiveStep (state) {
    return state.activeStep
  },
  getCompletedStep (state) {
    return state.completedStep
  }
}
const mutations = {
  //[types.USERS_AUTH_REQUEST] () {},
  // [types.USERS_AUTH_SUCCESS] (state, payload) {
  //   state.user = payload =>> yukarıda import edilen types burada bu şekilde kullanılabilir proje büyük olmadığı için bu şekilde kullanmadım. 
  // },
  setActiveStep (state, payload) {
    state.activeStep = payload
  },
  setCompletedStep (state, payload) {
    state.completedStep = payload
  }
}


const actions = {

  //actiona örnek olsun diye oluşturdum.

  // authenticate ({commit}, params) {
  //   commit(types.USERS_AUTH_REQUEST)
  //   return API.users.login(params).then((response) => {
  //     return response.json().then((json) => {
  //       commit(types.USERS_AUTH_SUCCESS, json)
  //       return json
  //     })
  //   })
  // }
}

export default {
  state,
  getters,
  mutations,
  actions
}