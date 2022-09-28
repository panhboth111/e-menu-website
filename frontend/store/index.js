export const state = () => ({
  items: [],
});
export const mutations = {
  ADD_ITEM(state, item) {
    state.items = [...state.items, item];
    localStorage.setItem("items", JSON.stringify([...state.items]));
  },
  REMOVE_ITEM(state, item) {
    state.items = state.items.filter((i) => i !== item);
    localStorage.setItem("items", JSON.stringify([...state.items]));
  },
  CLEAR_ITEMS(state,item){
    state.items = []
  }
};
export const actions = {
  ADD_ITEM({ commit, state }, item) {
    commit("ADD_ITEM", item);
  },
  REMOVE_ITEM({ commit }, item) {
    commit("REMOVE_ITEM", item);
  },
  CLEAR_ITEMS({commit}){
    commit("CLEAR_ITEMS");
  },
  async nuxtServerInit({ commit }, { req }) {
    // console.log(localStorage.getItem("items"));
    if (process.client) {
      console.log("here");
    }
  },
};
