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
    const pageEdits = state.edits[data.pageId] || [];

    state.edits = {
      ...state.edits,
      [data.pageId]: [
        ...pageEdits.filter(edit => edit.claimId !== data.claimId),
        data
      ]
    };
  },
  EDIT_REMOVE_CHANGE(state, data) {
    const pageEdits = state.edits[data.pageId] || [];

    state.edits = {
      ...state.edits,
      [data.pageId]: pageEdits.filter(edit => edit.claimId !== data.claimId)
    };
  },
  EDIT_REMOVE_CLAIM(state, data) {
    state.edits = {
      ...state.edits,
      [data.pageId]: [
        ...pageEdits.filter(edit => edit.claimId !== data.claimId),
        data
      ]
    };
  },
  EDIT_ADD_NEW(state, data) {
    const pageEdits = state.edits[data.pageId] || [];
    state.edits = {
      ...state.edits,
      [data.pageId]: [...pageEdits, data]
    };
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
  },
  saveEdit() {},
  addEdit({ state, commit }, data) {
    const { pageId, claimId, property, value, source } = data;
    if (!pageId || !value) return;

    console.log("DATA", data);
    commit(claimId ? "EDIT_ADD_CHANGE" : "EDIT_ADD_NEW", data);
  },
  removeEdit({ state, commit }, data) {
    const { pageId, claimId } = data;
    if (!pageId || !claimId) return;

    const pageEdits = state.edits[data.pageId] || [];
    const editIndex = pageEdits.indexOf(
      pageEdits.find(edit => edit.claimId === data.claimId)
    );
    // if it's edit, remove it
    if (editIndex > -1) {
      commit("EDIT_REMOVE_CHANGE", {
        action: "",
        ...data
      });
    } else {
      commit("EDIT_REMOVE_CLAIM", {
        action: "REMOVE",
        ...data
      });
    }
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
