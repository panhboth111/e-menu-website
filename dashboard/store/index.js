export const state = () => ({
  confirmDialog: false,
  successDialog: false,
  failDialog: false,
});

export const mutations = {
  toggleConfirmDialog(state, status) {
    state.confirmDialog = status;
  },
  toggleSuccessDialog(state, status) {
    state.successDialog = status;
  },
  toggleFailDialog(state, status) {
    state.failDialog = status;
  },
};

export const actions = {
  toggleConfirmDialog({ commit }, status) {
    commit("toggleConfirmDialog", status);
  },
  toggleSuccessDialog({ commit }, status) {
    try {
      commit("toggleSuccessDialog", status);
    } catch (error) {
      console.log(error.message);
    }
  },
  toggleFailDialog({ commit }, status) {
    commit("toggleFailDialog", status);
  },
};
