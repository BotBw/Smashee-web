import $ from "jquery"

export default {
  state: {
    id: "",
    usrname: "",
    avatar: "",
    JWT: "",
    is_login: false
  },
  getters: {
  },
  mutations: {
    updateUser(state, user) {
      state.id = user.id;
      state.usrname = user.usrname;
      state.avatar = user.avatar;
      state.is_login = user.is_login;
    },
    updateToken(state, JWT) {
      state.JWT = JWT
    },
    logout(state) {
      state.id = ""
      state.usrname = ""
      state.avatar = ""
      state.JWT = ""
      state.is_login = false
    }
  },
  actions: {
    login(context, data) {
      $.ajax({
        url: "http://localhost:12345/user/account/getToken",
        type: "POST",
        data: {
          usrname: data.usrname,
          pwd: data.pwd
        },
        success(resp) {
          if (resp.MSG === "succeed") {
            context.commit("updateToken", resp.JWT)
            data.success(resp)
          } else {
            data.error(resp);
          }

        },
        error(resp) {
          data.error(resp)
        }
      })
    },
    logout(context) {
      context.commit("logout")
    },
    getinfo(context, data) {
      $.ajax({
        url: "http://localhost:12345/user/account/getProfile",
        type: "GET",
        headers: {
          Authorization: "Bearer " + context.state.JWT
        },
        success(resp) {
          if(resp.MSG === "succeed") {
            context.commit("updateUser", {
              ...resp,
              is_login: true
            })
            data.success(resp)
          } else {
            data.error(resp)
          }
        },
        error(resp) {
          data.error(resp)
        }
      })
    }
  },
  modules: {
  }
}