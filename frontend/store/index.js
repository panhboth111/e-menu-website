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
};
export const actions = {
  ADD_ITEM({ commit, state }, item) {
    commit("ADD_ITEM", item);
  },
  REMOVE_ITEM({ commit }, item) {
    commit("REMOVE_ITEM", item);
  },
};