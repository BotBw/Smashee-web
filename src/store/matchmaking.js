
export default {
  state: {
    status: "queuing",
    socket: null,
    opponent: {
      usrname: "",
      avatar: ""
    },
    map: null
  },
  getters: {

  },
  mutations: {
    setStatus(state, status) {
      state.status = status;
    },
    setSocket(state, socket) {
      state.socket = socket;
    },
    setOpponent(state, opponent) {
      state.opponent = opponent;
    },
    setMap(state, map) {
      state.map = map;
    }
  },
  actions: {

  },
  modules: {

  }
}