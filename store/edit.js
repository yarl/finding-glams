export const state = () => ({
  isEdit: false,
  edits: []
});

export const mutations = {
  EDIT_ON(state) {
    state.isEdit = true;
  },
  EDIT_OFF(state) {
    state.isEdit = false;
  }
};

export const actions = {
  toggleEdit({ state, commit, dispatch }) {
    commit(state.isEdit ? "EDIT_OFF" : "EDIT_ON");
  }
};
