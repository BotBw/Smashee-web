
export default {
  state: {
    status: "queuing",
    socket: null,
    opponent: {
      usrname: "",
      avatar: ""
    },
    greedySnake: null,
    gameInfo: null
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
    setGreedySnake(state, greedySnake) {
      state.greedySnake = greedySnake;
    },
    setGameInfo(state, gameInfo) {
      state.gameInfo = gameInfo;
    }
  },
  actions: {

  },
  modules: {

  }
}