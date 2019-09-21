import { fullSearch } from "~/utils/search";

export const state = () => ({
  isPristine: true,
  isBusy: false,
  isError: false,
  searchText: "",
  results: []
});

export const mutations = {
  SET_BUSY(state, isBusy = true) {
    state.isPristine = false;
    state.isBusy = isBusy;
  },
  SET_SEARCH_TEXT(state, text = "") {
    state.searchText = text;
  },
  SET_SEARCH_RESULTS(state, results = []) {
    state.results = results;
  }
};

export const actions = {
  searchText({ commit, dispatch }, { text, lang }) {
    commit("SET_SEARCH_TEXT", text);

    if (text) {
      commit("SET_BUSY", true);
      fullSearch(text, lang).then(response => {
        commit("SET_SEARCH_RESULTS", response.data.query.search);
        commit("SET_BUSY", false);

        const ids = response.data.query.search.map(result => result.title);
        dispatch("data/addEntitiesById", ids, { root: true });
      });
    } else {
      commit("SET_SEARCH_RESULTS");
    }
  }
};
