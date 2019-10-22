import { getUserInfo } from "~/utils/edit";

export const state = () => ({
  user: {
    loggedIn: false,
    isBusy: false
  },
  isEdit: false,
  edits: []
});

export const mutations = {
  SET_USER(state, user) {
    state.user = {
      ...state.user,
      user
    };
  },
  EDIT_ON(state) {
    state.isEdit = true;
  },
  EDIT_OFF(state) {
    state.isEdit = false;
  }
};

export const actions = {
  async checkLogin({ commit, dispatch }) {
    commit("SET_USER", { isBusy: true });

    const response = await getUserInfo();
    console.log(response.data);

    /*     commit("ADD_ENTITIES", {
      [entity.id]: {
        ...entity,
        deep: false
      }
    }); */
  },
  toggleEdit({ state, commit, dispatch }) {
    commit(state.isEdit ? "EDIT_OFF" : "EDIT_ON");
  }
};
