/*eslint-disable no-unused-vars, no-empty*/
const UserInfo = {
  user_id : '',
  user_name : '',
  dept_code : '',
  office_tel : '',
  user_phone : '',    
  position1 : '',
  position2 : '',
  admin_yn : '',
  user_token : ''
}

const mutations = {
  Set_UserInfo(state, payload){
      UserInfo.user_id = payload.user_id == undefined ? '' : payload.user_id
      UserInfo.user_name = payload.user_name == undefined ? '' : payload.user_name
      UserInfo.dpet_code = payload.dpet_code == undefined ? '' : payload.dpet_code
      UserInfo.office_tel = payload.office_tel == undefined ? '' : payload.office_tel
      UserInfo.user_phone = payload.user_phone == undefined ? '' : payload.user_phone
      UserInfo.position1 = payload.position1 == undefined ? '' : payload.position1
      UserInfo.position2 = payload.position2 == undefined ? '' : payload.position2
      UserInfo.admin_yn = payload.admin_yn == undefined ? '' : payload.admin_yn
      UserInfo.user_token = payload.user_token == undefined ? '' : payload.user_token
  }
};

const actions = {
  Set_UserInfo({commit, state}, payload){
      commit('Set_UserInfo', payload)
  }
};

const getters = {
  'Get_UserInfo' : state => state.UserInfo,
};

export default {
  strict:process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
      UserInfo
  },
  mutations, 
  actions, 
  getters
}