import { getUserInfo } from "~/utils/edit";

export const state = () => ({
  user: {
    loggedIn: false,
    isBusy: false
  },
  isEdit: false,
  edits: {}
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
  },
  EDIT_ADD_CHANGE(state, data) {
    state.edits = {
      ...state.edits,
      [data.pageId]: {
        ...state.edits[data.pageId],
        [data.claimId]: {
          value: data.value,
          source: data.source
        }
      }
    };
  },
  EDIT_ADD_NEW(state, data) {}
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
  },
  addEdit({ state, commit }, data) {
    const { pageId, claimId, property, value, source } = data;
    if (!pageId || !value) return;

    commit(claimId ? "EDIT_ADD_CHANGE" : "EDIT_ADD_NEW", data);
  }
};

/* 
save: 

action: wbcreateclaim
entity: Q24944689
format: json
property: P2013
snaktype: value
summary: #monumental
use_auth: true
value: "starymlyn.zarki"
*/
